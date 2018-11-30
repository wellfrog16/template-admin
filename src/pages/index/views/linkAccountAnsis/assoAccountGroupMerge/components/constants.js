
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
let markValue = 1000;
let symbolSize = data => {
    return data[2] > 40 ? 40 : data[2];
};
export const chartOption1 = {
    color: [
        '#fec42c'
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
        x: 40,
        x2: 100,
        y: 40,
        y2: 60
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        position: function(point, params, dom, rect, size) {
            // 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            let divWidth = size.viewSize[0];
            let divHeight = size.viewSize[1];
            var x = point[0];
            var y = point[1];
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            var posX = 0;// x坐标位置
            var posY = 0;// y坐标位置
            if (divWidth - x < boxWidth) { // 右边放不开
                posX = x - boxWidth - 10;
            } else { // 右边放的下
                posX = x + 10;
            }
            if (divHeight - y < boxHeight) { // 下边放不开
                posY = y - boxHeight - 10;
            } else { // 下边放得下
                posY = y + 10;
            }
            return [posX, posY];
        },
        extraCssText: 'width:150px; white-space:pre-wrap;',
        formatter: data => {
            if (data.componentType === 'markLine' || data.componentType === 'markPoint') {
                return '';
            }
            let {value} = data;
            let str = '';
            str += `账户组号：${value[3]} \n`;
            str += `持仓量：${value[0]} \n`;
            str += `相关系数：${value[1]} \n`;
            str += `子账户数：${value[2]} \n`;
            str += `合约代码：${value[4]} \n`;
            // str += `子账户号：${value[5].replace(',', \n')} \n`;
            return str;
        }
    },
    xAxis: {
        type: 'value',
        name: '持仓量',
        nameGap: 16,
        minInterval: 1,
        nameTextStyle: {
            color: '#fff',
            fontSize: 12
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#eee'
            }
        },
        axisLabel: {
            show: true,
            verticalAlign: 'middle'
        },
    },
    yAxis: [{
        type: 'value',
        name: '相关系数',
        minInterval: 0.1,
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
            color: '#fff',
            fontSize: 12
        },
        axisLine: {
            lineStyle: {
                color: '#eee'
            }
        },
        splitLine: {
            show: false
        }
    }],
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            bottom: 0,
            // start: 1,
            // end: 35
        },
        // {
        //     type: 'slider',
        //     show: true,
        //     yAxisIndex: [0],
        //     right: 0,
        //     // start: 29,
        //     // end: 36
        // },
        {
            type: 'inside',
            xAxisIndex: [0],
            // start: 1,
            // end: 35
        },
        // {
        //     type: 'inside',
        //     yAxisIndex: [0],
        //     // start: 29,
        //     // end: 36
        // }
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
            name: '账户组持仓量相关系数',
            type: 'effectScatter',
            showEffectOn: 'hover',
            rippleEffect: {
                scale: 2
            },
            itemStyle: itemStyle,
            symbolSize: symbolSize,
            data: [],
            markLine: { // 标记线设置
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                label: {
                    formatter: params => {
                        return `超仓线：${params.value}`;
                    }
                },
                symbolSize: 0, // 控制箭头和原点的大小、官方默认的标准线会带远点和箭头
                data: [ // 设置条标准线——x=10
                    {xAxis: markValue || 1000}
                ]
            },
            markPoint: {
                symbol: 'arrow',
                symbolSize: 10,
                data: [],
                itemStyle: {
                    color: '#fff'
                }
            }
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
    {label: '账户组编号', field: 'acctId', minWidth: 130},
    {label: '子账户数量', field: 'custQtty', minWidth: 130},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '当前净持仓量', field: 'acctGroOpenInt', minWidth: 140},
    {label: '相关系数', field: 'acctGroAvgRela', minWidth: 100},
    {field: 'custIds', label: '子账户编号', minWidth: 130}
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
        field: 'acctId',
        label: '账户组号',
        minWidth: '80',
    },
    {
        field: 'custId',
        label: '客户编号'
    },
    {
        field: 'custName',
        label: '客户名称'
    },
    {
        field: 'acctGroAvgRelaCoef',
        label: '账户组平均相关系数',
    },
    {
        field: 'acctAvgRelaCoef',
        label: '账户平均相关系数',
    },
    {
        field: 'contrCd',
        label: '合约代码',
    },
    {
        field: 'acctGroNetOpenInt',
        label: '账户组净持仓量',
    },
    {
        field: 'acctNetOpenInt',
        label: '账户净持仓量',
    },
    {
        field: 'custWheOtherGro',
        label: '客户所在其他组',
    },
    {
        field: 'buyBargainRela',
        label: '买入成交相关系数',
    },
    {
        field: 'sellBargainRela',
        label: '卖出成交相关系数',
    },
    {
        field: 'netBuyBargainRela',
        label: '净买入成交相关系数',
    },
    {
        field: 'longPosMakePosRela',
        label: '多头持仓相关系数',
    },
    {
        field: 'shortPosMakePosRela',
        label: '空头持仓相关系数',
    },
    {
        field: 'floatPrftLossRela',
        label: '浮动盈亏相关系数',
    }
];
export const resData = {
    'mainTableData': [
        {
            id: 1885,
            acctId: 'AA001',
            children: [
                {
                    'id': 292073,
                    'acctId': 'AA001',
                    'custId': '20180000002',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'BB001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        },
        {
            'id': 46357,
            'acctId': 'CC001',
            'children': [
                {
                    'id': 185878,
                    'acctId': 'CC001',
                    'custId': '20180000005',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'BB001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                },
                {
                    'id': 205179,
                    'acctId': 'CC001',
                    'custId': '20180000007',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'BB001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        },
        {
            'id': 92527,
            'acctId': 'BB001',
            'children': [
                {
                    'id': 109006,
                    'acctId': 'BB001',
                    'custId': '20180000003',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'AA001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                },
                {
                    'id': 299236,
                    'acctId': 'BB001',
                    'custId': '20180000006',
                    'custName': null,
                    'acctGroAvgRelaCoef': 0,
                    'acctAvgRelaCoef': 0,
                    'contrCd': 'cu1712',
                    'acctGroNetOpenInt': 500,
                    'acctNetOpenInt': 100,
                    'custWheOtherGro': 'AA001',
                    'buyBargainRela': 0,
                    'sellBargainRela': 0,
                    'netBuyBargainRela': 0,
                    'longPosMakePosRela': 0,
                    'shortPosMakePosRela': 0,
                    'floatPrftLossRela': 0
                }
            ]
        }
    ],
    'chartData': [
        {
            'acctId': 'AA001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.2,
            'acctGroOpenInt': 1000,
            'custQtty': 20
        },
        {
            'acctId': 'BB001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.4,
            'acctGroOpenInt': 3000,
            'custQtty': 200
        },
        {
            'acctId': 'CC001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 6000,
            'custQtty': 100
        },
        {
            'acctId': 'CDD001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 1000,
            'custQtty': 100
        },
        {
            'acctId': 'EE001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 1200,
            'custQtty': 40
        },
        {
            'acctId': 'FF001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.1,
            'acctGroOpenInt': 5000,
            'custQtty': 10
        },
        {
            'acctId': 'GG001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.42,
            'acctGroOpenInt': 2000,
            'custQtty': 70
        }
    ]
};