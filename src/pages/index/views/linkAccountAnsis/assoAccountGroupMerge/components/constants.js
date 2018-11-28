
export const chartOption2 = {
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
let itemStyle = {
    normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
};
let symbolSize = data => {
    return data[2];
};
export const chartOption1 = {
    color: [
        '#dd4444', '#fec42c', '#80F1BE'
    ],
    // legend: {
    //     y: 'top',
    //     data: ['北京', '上海', '广州'],
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: 16
    //     }
    // },
    grid: {
        x: 80,
        x2: 100,
        y: 50,
        y2: 60
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1
    },
    xAxis: {
        type: 'value',
        name: '持仓量',
        nameGap: 16,
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#eee'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '相关系数',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
            color: '#fff',
            fontSize: 16
        },
        axisLine: {
            lineStyle: {
                color: '#eee'
            }
        },
        splitLine: {
            show: false
        }
    },
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            bottom: 0,
            // start: 1,
            // end: 35
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            right: 0,
            // start: 29,
            // end: 36
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            // start: 1,
            // end: 35
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            // start: 29,
            // end: 36
        }
    ],
    /* visualMap: [
        {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 250,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['圆形大小：PM2.5'],
            textGap: 30,
            textStyle: {
                color: '#fff'
            },
            inRange: {
                symbolSize: [10, 70]
            },
            outOfRange: {
                symbolSize: [10, 70],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#c23531']
                },
                outOfRange: {
                    color: ['#444']
                }
            }
        },
        {
            left: 'right',
            bottom: '5%',
            dimension: 6,
            min: 0,
            max: 50,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['明暗：二氧化硫'],
            textGap: 30,
            textStyle: {
                color: '#fff'
            },
            inRange: {
                colorLightness: [1, 0.5]
            },
            outOfRange: {
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#c23531']
                },
                outOfRange: {
                    color: ['#444']
                }
            }
        }
    ], */
    series: [
        {
            name: '北京',
            type: 'scatter',
            itemStyle: itemStyle,
            symbolSize: symbolSize,
            data: [
                [1, 0.2, 9],
                [2, 0.4, 11],
                [3, 0.8, 7],
                [4, 0.4, 7],
                [5, 0.7, 24],
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
export const charts = [
    {title: '账户组相关性概览', icon: 'el-icon-edit', toggleDetailFlags: false},
    {title: '账户组历史持仓', icon: 'el-icon-edit', toggleDetailFlags: false},
    {title: '账户组历史成交', icon: 'el-icon-edit', toggleDetailFlags: false},
    {title: '账户组分时成交', icon: 'el-icon-edit', toggleDetailFlags: false}
];
export const chartTableColumns1 = [
    {label: '账户组编号', field: '', minWidth: 130},
    {label: '子账户数量', field: '', minWidth: 130},
    {label: '交易日', field: '', minWidth: 100},
    {label: '合约代码', field: '', minWidth: 100},
    {label: '当前净持仓量', field: '', minWidth: 140},
    {label: '相关系数', field: '', minWidth: 100}
];
export const chartTableColumns2 = [
    {label: '账户组编号', field: '', minWidth: 130},
    {label: '子账户编号', field: '', minWidth: 130},
    {label: '交易日', field: '', minWidth: 100},
    {label: '合约代码', field: '', minWidth: 100},
    {label: '当前净持仓量', field: '', minWidth: 140},
    {label: '当前净持仓金额', field: '', minWidth: 150},
    {label: '账户组净持仓量', field: '', minWidth: 150},
    {label: '空单净持仓量', field: '', minWidth: 140},
    {label: '多单净持仓量', field: '', minWidth: 140}
];
export const chartTableColumns3 = [
    {label: '账户组编号', field: '', minWidth: 130},
    {label: '子账户编号', field: '', minWidth: 130},
    {label: '交易日', field: '', minWidth: 100},
    {label: '合约代码', field: '', minWidth: 100},
    {label: '买入量', field: '', minWidth: 100},
    {label: '卖出量', field: '', minWidth: 100},
    {label: '多头持仓量', field: '', minWidth: 130},
    {label: '多头持仓量', field: '', minWidth: 130},
    {label: '盈亏', field: '', minWidth: 90},
    {label: '净买入量', field: '', minWidth: 100},
    {label: '净持仓量', field: '', minWidth: 100}
];
export const chartTableColumns4 = [
    {label: '交易日', field: '', minWidth: 100},
    {label: '报单编号', field: '', minWidth: 100},
    {label: '账户组编号', field: '', minWidth: 100},
    {label: '子账户编号', field: '', minWidth: 100},
    {label: '合约代码', field: '', minWidth: 100},
    {label: '买卖方向', field: '', minWidth: 100},
    {label: '开平标志', field: '', minWidth: 100},
    {label: '数量', field: '', minWidth: 100},
    {label: '成交量', field: '', minWidth: 100},
    {label: '报单时间', field: '', minWidth: 100},
    {label: '报单数量', field: '', minWidth: 100},
    {label: '报单价格', field: '', minWidth: 100},
    {label: '成交时间', field: '', minWidth: 100},
    {label: '成交数量', field: '', minWidth: 100},
    {label: '成交价格', field: '', minWidth: 100},
    {label: '撤单时间', field: '', minWidth: 100},
    {label: '撤单数量', field: '', minWidth: 100}
];
export const mainTableColumns = [
    {
        field: 'accountId',
        label: '账户组号',
        minWidth: '80',
    },
    {
        field: 'customId',
        label: '客户编号'
    },
    {
        field: 'customName',
        label: '客户名称'
    },
    {
        field: '',
        label: '账户组平均相关系数',
    },
    {
        field: '',
        label: '账户平均相关系数',
    },
    {
        field: '',
        label: '合约代码',
    },
    {
        field: '',
        label: '账户组净持仓量',
    },
    {
        field: '',
        label: '账户净持仓量',
    },
    {
        field: '',
        label: '客户所在其他组',
    },
    {
        field: '',
        label: '买入成交相关系数',
    },
    {
        field: '',
        label: '卖出成交相关系数',
    },
    {
        field: '',
        label: '净买入成交相关系数',
    },
    {
        field: '',
        label: '多头持仓相关系数',
    },
    {
        field: '',
        label: '空头持仓相关系数',
    },
    {
        field: '',
        label: '浮动盈亏相关系数',
    }
];