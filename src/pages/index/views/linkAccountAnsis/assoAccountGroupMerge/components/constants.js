export const chartOption1 = {
    title: {text: 'hhhh'},
    tooltip: {
    },
    legend: {
        data: ['Myriel1', 'Myriel2', 'Myriel3', 'Myriel4', 'Myriel5']
    },
    series: [
        {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: JSON.parse(JSON.stringify([
                {attributes: {}, category: 0, draggable: true, id: '0', itemStyle: null, name: 'Myriel1', symbolSize: 10, value: 10, x: null, y: null},
                {attributes: {}, category: 0, draggable: true, id: '1', itemStyle: null, name: 'Myriel2', symbolSize: 10, value: 10, x: null, y: null},
                {attributes: {}, category: 0, draggable: true, id: '2', itemStyle: null, name: 'Myriel3', symbolSize: 10, value: 10, x: null, y: null},
                {attributes: {}, category: 0, draggable: true, id: '3', itemStyle: null, name: 'Myriel4', symbolSize: 10, value: 10, x: null, y: null},
                {attributes: {}, category: 0, draggable: true, id: '4', itemStyle: null, name: 'Myriel5', symbolSize: 10, value: 10, x: null, y: null},
                {attributes: {}, category: 0, draggable: true, id: '5', itemStyle: null, name: 'Myriel6', symbolSize: 10, value: 10, x: null, y: null},
            ])),
            links: JSON.parse(JSON.stringify([
                {source: 'Myriel1', target: 'Myriel2'},
                {source: 'Myriel1', target: 'Myriel3'},
                {source: 'Myriel4', target: 'Myriel5'},
                {source: 'Myriel4', target: 'Myriel6'},
            ])),
            categories: ['Myriel1', 'Myriel4'],
            roam: true,
            label: {
                normal: {
                    position: 'right'
                }
            },
            force: {
                repulsion: 100
            }
        }
    ]
};
export const chartOption2 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};
export const chartOption3 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};
export const chartOption4 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};