let myChart = null;
let familyData = {
    name: '族谱',
    children: []
};

function initChart() {
    myChart = echarts.init(document.getElementById('familyTree'));
    updateChart();
}

function updateChart() {
    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'tree',
            data: [familyData],
            top: '5%',
            left: '5%',
            bottom: '5%',
            right: '5%',
            symbolSize: 10,
            label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 14
            },
            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },
            emphasis: {
                focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }]
    };
    
    myChart.setOption(option);
}

function findNode(name, node = familyData) {
    if (node.name === name) return node;
    if (node.children) {
        for (let child of node.children) {
            const result = findNode(name, child);
            if (result) return result;
        }
    }
    return null;
}

function addMember() {
    const name = document.getElementById('name').value.trim();
    const birth = document.getElementById('birth').value.trim();
    const parent = document.getElementById('parent').value.trim();

    if (!name || !birth) {
        alert('请输入姓名和出生年份！');
        return;
    }

    const newMember = {
        name: `${name}\n(${birth})`,
        children: []
    };

    if (parent) {
        const parentNode = findNode(parent);
        if (!parentNode) {
            alert('未找到指定的父母节点！');
            return;
        }
        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(newMember);
    } else if (familyData.children.length === 0) {
        familyData.children.push(newMember);
    } else {
        alert('请指定父母节点！');
        return;
    }

    updateChart();
    
    // 清空输入框
    document.getElementById('name').value = '';
    document.getElementById('birth').value = '';
    document.getElementById('parent').value = '';
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
    if (myChart) myChart.resize();
});

// 初始化图表
window.onload = initChart;