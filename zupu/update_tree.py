import json
import re
import os

def parse_text_to_json(file_path):
    root_nodes = []
    # 栈结构：存储 (indent_level, node_list)
    # node_list 是该层级应该添加到的列表
    stack = [(-1, root_nodes)] 

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line in lines:
        if not line.strip():
            continue

        # 计算缩进层级 (假设使用 4 个空格或 1 个 Tab)
        # 这里的逻辑是计算行首空格数，然后除以4，或者制表符直接算
        # 为了兼容性，我们计算前导空白字符的数量
        raw_line = line.rstrip()
        stripped_line = raw_line.lstrip()
        indent_char_count = len(raw_line) - len(stripped_line)
        
        # 简单的层级判定：每 4 个空格算一级，或 1 个 tab 算一级
        # 如果用户混用，这里尝试智能判断：假设上一级和这一级的差值就是一级缩进
        # 为简单起见，我们假设用户会用 Tab 或者 2-4 个空格。
        # 这里使用一种相对层级算法。
        
        # 我们用 stack 来管理父节点
        # stack[-1] 是当前最新的父节点环境
        
        node = {"name": stripped_line, "children": []}
        
        # 找到这个节点的父级
        # 如果当前缩进 > 上一个节点的缩进，说明是上一个节点的子节点
        # 如果当前缩进 == 上一个，说明是兄弟
        # 如果当前缩进 < 上一个，说明要回退
        
        while len(stack) > 1 and indent_char_count <= stack[-1][0]:
            stack.pop()
            
        parent_list = stack[-1][1]
        parent_list.append(node)
        
        # 把自己作为潜在的父节点压入栈，供下一行使用
        stack.append((indent_char_count, node["children"]))

    # 清理空的 children 字段 (为了减小体积)
    def clean_empty_children(nodes):
        for node in nodes:
            if not node["children"]:
                del node["children"]
            else:
                clean_empty_children(node["children"])
    
    clean_empty_children(root_nodes)
    return root_nodes

def update_html(json_data):
    html_path = 'd3.html'
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 将 JSON 对象转换为字符串，并缩进以便查看
        json_str = json.dumps(json_data, ensure_ascii=False, indent=2)
        
        # 使用正则表达式替换 rawData 的内容
        # 匹配 const rawData = [...];
        new_content = re.sub(
            r'const rawData = \[.*?\];', 
            f'const rawData = {json_str};', 
            content, 
            flags=re.DOTALL
        )
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"成功！已将 family.txt 的内容更新到 {html_path}")
        print("请在浏览器中刷新网页查看效果。")
        
    except Exception as e:
        print(f"更新 HTML 失败: {e}")

if __name__ == "__main__":
    if not os.path.exists('family.txt'):
        print("错误：找不到 family.txt 文件。")
    else:
        print("正在读取 family.txt ...")
        try:
            tree_data = parse_text_to_json('family.txt')
            update_html(tree_data)
        except Exception as e:
            print(f"解析文本出错: {e}")
            print("请检查 family.txt 的格式，确保缩进整齐。")
