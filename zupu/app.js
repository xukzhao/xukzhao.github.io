// 数据存储管理
const DataManager = {
    STORAGE_KEY: 'familyTreeData',
    
    load() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {
            nodes: [],
            edges: []
        };
    },

    save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
};

// 可视化控制器
const Visualizer = {
    network: null,

    init(container) {
        const data = DataManager.load();
        const options = {
            nodes: {
                shape: 'box',
                font: { size: 14 },
                margin: 10,
                widthConstraint: { maximum: 150 }
            },
            edges: {
                arrows: 'to',
                smooth: true
            },
            layout: {
                hierarchical: {
                    direction: 'UD',
                    sortMethod: 'directed'
                }
            }
        };
        
        this.network = new vis.Network(
            container, 
            { nodes: data.nodes, edges: data.edges },
            options
        );
    },

    update() {
        const data = DataManager.load();
        this.network.setData(data);
    }
};

// 表单处理
class MemberForm {
    static show() {
        this.populateSelect('#father-select');
        this.populateSelect('#mother-select');
        document.getElementById('member-form').reset();
    }

    static populateSelect(selector) {
        const select = document.querySelector(selector);
        const data = DataManager.load();
        select.innerHTML = '<option value="">无</option>';
        data.nodes.forEach(node => {
            select.innerHTML += `<option value="${node.id}">${node.label}</option>`;
        });
    }

    static handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newNode = {
            id: Date.now(),
            label: formData.get('name'),
            gender: formData.get('gender'),
            birthYear: formData.get('birthYear')
        };

        const data = DataManager.load();
        data.nodes.push(newNode);

        // 添加关系
        if(formData.get('father')) {
            data.edges.push({ from: formData.get('father'), to: newNode.id, label: '父亲' });
        }
        if(formData.get('mother')) {
            data.edges.push({ from: formData.get('mother'), to: newNode.id, label: '母亲' });
        }

        DataManager.save(data);
        Visualizer.update();
        hideModal('add-member');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    Visualizer.init(document.getElementById('network-container'));
    
    // 初始化导入功能
    document.getElementById('import-file').addEventListener('change', e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            DataManager.save(JSON.parse(event.target.result));
            Visualizer.update();
        };
        reader.readAsText(file);
    });
});

// 辅助函数
function exportData() {
    const data = DataManager.load();
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family-tree.json';
    a.click();
}

function showModal(id) {
    MemberForm.show();
    document.getElementById(id).style.display = 'block';
}

function hideModal(id) {
    document.getElementById(id).style.display = 'none';
}
