import custIdColumn from '@/components/index/common/CustIdColumn';
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
        x2: 60,
        y: 35,
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
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true,
            verticalAlign: 'middle'
        }
    },
    yAxis: [{
        type: 'value',
        name: '相关系数',
        minInterval: 0.1,
        nameLocation: 'end',
        nameGap: 20,
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
            start: 50,
            end: 100
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
            start: 50,
            end: 100
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
                        type: 'dashed',
                        color: '#ec0000'
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

export const chartOption2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: [],
        textStyle: {
            color: '#eee'
        }
    },
    grid: {
        left: 30,
        right: 45,
        top: 30,
        bottom: 35,
        containLabel: true
    },
    xAxis: [
        {
            name: '日期',
            type: 'category',
            data: [],
        }
    ],
    yAxis: [
        {
            name: '持仓量',
            type: 'value',
        }
    ],
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            bottom: 0,
            start: 50,
            end: 100
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 50,
            end: 100
        }
    ],
    series: []
};
let upColor = '#ec0000';
let upBorderColor = '#8A0000';
let downColor = '#00da3c';
let downBorderColor = '#008F28';
let chart3SymbolSize = 15;
let itemStyleArray = [{
    normal: {
        color: 'green',
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
}, {
    normal: {
        color: 'red',
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
}];
let schema = [
    {name: 'date', index: 0, text: '交易日'},
    {name: 'open', index: 1, text: '开盘价'},
    {name: 'close', index: 2, text: '收盘价'},
    {name: 'highest', index: 3, text: '最高价'},
    {name: 'lowest', index: 4, text: '最低价'}
];
export const chartOption3 = {
    animation: false,
    // color: ['transparent', '#8A0000'],
    tooltip: {
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        trigger: 'item',
        axisPointer: {
            type: 'cross'
        },
        formatter: param => {
            if (param.seriesIndex === 0) {
                return schema.map((v, i) => {
                    return v.text + ': ' + param.value[i === 0 ? 5 : i];
                }).join('<br>');
            } else if (param.seriesIndex === 1) {
                return param.value[4].map(v => {
                    return `
                        客户编号： ${param.value[4]}<br>
                        ${param.value[3]}笔数： ${param.value[2]}<br>
                        ${param.value[3]}数量 ${param.value[2]}<br>
                    `;
                }).join('<br>');
            } else if (param.seriesIndex === 2) {

            }
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#222',
            borderColor: '#777'
        }
    },
    legend: {
        data: ['日K', '卖出', '买入'],
        textStyle: {
            color: '#eee'
        }
    },
    grid: {
        x: 40,
        x2: 60,
        y: 35,
        y2: 60
    },
    xAxis: {
        name: '日期',
        type: 'category',
        data: [],
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
    },
    yAxis: {
        name: '成交价',
        scale: true,
        splitArea: {
            show: true,
            areaStyle: {
                color: ['transparent', 'rgba(4, 58, 127, 0.92)']
            }
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100,
        }
    ],
    visualMap: [
        {
            left: 'right',
            top: '3%',
            dimension: 2,
            min: 0,
            max: 50,
            itemHeight: 80,
            itemWidth: 10,
            calculable: true,
            precision: 0.1,
            text: ['卖出'],
            textGap: 5,
            textStyle: {
                color: '#fff'
            },
            seriesIndex: 1,
            inRange: {
                color: ['green'],
                colorLightness: [1, 0.5]
            },
            outOfRange: {
                // symbolSize: [10, 45],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['green']
                },
                outOfRange: {
                    color: '#444'
                }
            }
        },
        {
            left: 'right',
            inverse: true,
            textGap: 5,
            bottom: '24%',
            dimension: 2,
            min: 0,
            max: 50,
            seriesIndex: 2,
            itemHeight: 80,
            itemWidth: 10,
            calculable: true,
            precision: 0.1,
            text: ['买入'],
            textStyle: {
                color: '#fff'
            },
            inRange: {
                color: ['red'],
                colorLightness: [1, 0.5]
            },
            outOfRange: {
                // symbolSize: [10, 45],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['red']
                },
                outOfRange: {
                    color: '#444'
                }
            }
        }
    ],
    series: [
        {
            name: '日K',
            type: 'candlestick',
            barMaxWidth: 20,
            data: [],
            itemStyle: {
                normal: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                }
            },
            markPoint: {
                // label: {
                //     normal: {
                //         formatter: param => {
                //             return param != null ? Math.round(param.value) : '';
                //         }
                //     }
                // },
                data: [
                    // {
                    //     name: 'XX标点',
                    //     coord: ['2013/01/02', 2300],
                    //     value: 2300,
                    //     itemStyle: {
                    //         normal: {color: 'rgb(41,60,85)'}
                    //     }
                    // },
                    // {
                    //     name: 'highest value',
                    //     type: 'max',
                    //     valueDim: 'highest'
                    // },
                    // {
                    //     name: 'lowest value',
                    //     type: 'min',
                    //     valueDim: 'lowest'
                    // },
                    // {
                    //     name: 'average value on close',
                    //     type: 'average',
                    //     valueDim: 'close'
                    // }
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: param => {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },
            markLine: {
            //     symbol: ['none', 'none'],
            //     data: [
            //         [
            //             {
            //                 name: 'from lowest to highest',
            //                 type: 'min',
            //                 valueDim: 'lowest',
            //                 symbol: 'circle',
            //                 symbolSize: 10,
            //                 label: {
            //                     normal: {show: false},
            //                     emphasis: {show: false}
            //                 }
            //             },
            //             {
            //                 type: 'max',
            //                 valueDim: 'highest',
            //                 symbol: 'circle',
            //                 symbolSize: 10,
            //                 label: {
            //                     normal: {show: false},
            //                     emphasis: {show: false}
            //                 }
            //             }
            //         ],
            //         {
            //             name: 'min line on close',
            //             type: 'min',
            //             valueDim: 'close'
            //         },
            //         {
            //             name: 'max line on close',
            //             type: 'max',
            //             valueDim: 'close'
            //         }
            //     ]
            },
        },
        {
            name: '卖出',
            type: 'scatter',
            symbol: 'triangle',
            symbolSize: chart3SymbolSize,
            symbolRotate: 180,
            itemStyle: itemStyleArray[0],
            data: [],
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: '买入',
            type: 'scatter',
            symbol: 'triangle',
            symbolSize: chart3SymbolSize,
            itemStyle: itemStyleArray[1],
            data: [],
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        }
    ]
};
export const chartOption4 = {
    grid: {
        x: 40,
        x2: 60,
        y: 35,
        y2: 60
    },
    tooltip: {
        trigger: 'item',
        formatter: param => {
            if (param.seriesIndex === 0) {
                console.log(param);
                return `
                    时间点： ${param.name}<br>
                    价格： ${param.value}<br>
                `;
            } else {
                return `
                    时间点： ${param.value[0]}<br>
                    账户号： ${param.value[4]}<br>
                    ${param.value[3]}交易量： ${param.value[2]}<br>
                `;
            }
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value',
    },
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100,
        }
    ],
    series: [
        {
            name: '分时图',
            data: [],
            type: 'line'
        }
    ]
};
export const charts = [
    {title: '账户组相关性概览', icon: 'fa fa-globe', toggleDetailFlags: false},
    {title: '账户组历史持仓', icon: 'fa fa-chart-bar', toggleDetailFlags: false},
    {title: '账户组历史成交', icon: 'fa fa-handshake', toggleDetailFlags: false},
    {title: '账户组分时成交', icon: 'fa fa-chart-line', toggleDetailFlags: false}
];
export const chartTableColumns1 = [
    {label: '账户组编号', field: 'acctId', minWidth: 130},
    {label: '子账户数量', field: 'custQtty', minWidth: 130},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '当前净持仓量', field: 'acctGroOpenInt', minWidth: 140},
    {label: '相关系数', field: 'acctGroAvgRela', minWidth: 100},
    {label: '所属客户编号', field: 'custIds', minWidth: 130}
];
export const chartTableColumns2 = [
    {label: '账户组编号', field: 'acctId', minWidth: 130},
    {label: '客户编号', field: 'custId', minWidth: 130, template: custIdColumn},
    {label: '交易日', field: 'txDay', minWidth: 100},
    {label: '合约代码', field: 'contrCd', minWidth: 100},
    {label: '当前净持仓量', field: 'acctNetOpenInt', minWidth: 140},
    {label: '当前净持仓金额', field: 'posLimQtty', minWidth: 150},
    {label: '账户组净持仓量', field: 'acctGroNetOpenInt', minWidth: 150},
    {label: '空单净持仓量', field: 'nuBillOpenInt', minWidth: 140},
    {label: '多单净持仓量', field: 'multiBillOpenInt', minWidth: 140}
];
export const chartTableColumns3 = [
    {label: '账户组编号', field: '', minWidth: 130},
    {label: '客户编号', field: '', minWidth: 130, template: custIdColumn},
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
    {label: '客户编号', field: '', minWidth: 100, template: custIdColumn},
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
let ddd = [];
for (let i = 0; i < 21; i++) {
    ddd.push({
        'id': i,
        'acctId': 'XG' + i,
        'children': (() => {
            let d = [];
            for (let ii = 0; ii < 11; ii++) {
                d.push({
                    'id': String(i) + String(ii),
                    'acctId': 'XG' + i,
                    'custId': '80' + String(i) + String(ii),
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
                });
            }
            return d;
        })()
    });
}
console.log(ddd);
export const resData1 = {
    'mainTableData': ddd,
    'chartData': [
        {
            'acctId': 'XG00001',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.2,
            'acctGroOpenInt': 1000,
            'custQtty': 20
        },
        {
            'acctId': 'XG00002',
            'contrCd': 'CU1712',
            'acctGroAvgRela': 0.4,
            'acctGroOpenInt': 2000,
            'custQtty': 200
        },
        {
            'acctId': 'XG00003',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 3000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00004',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 4000,
            'custQtty': 100
        },
        {
            'acctId': 'XG00005',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.4,
            'acctGroOpenInt': 5000,
            'custQtty': 40
        },
        {
            'acctId': 'XG00006',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.1,
            'acctGroOpenInt': 6000,
            'custQtty': 10
        },
        {
            'acctId': 'XG00007',
            'contrCd': 'CU1712',
            'acctGroAvgRela': -0.42,
            'acctGroOpenInt': 7000,
            'custQtty': 70
        }
    ]
};
export const resData2 = {
    qtty: 3000,
    mainData: {
        '20180909': [
            {date: '2018-11-08', value: '1122'},
            {date: '2018-11-02', value: '4444'},
            {date: '2018-11-05', value: '1122'},
            {date: '2018-11-04', value: '1122'},
            {date: '2018-11-05', value: '1122'},
        ],
        '20180911': [
            {date: '2018-11-01', value: '1122'},
            {date: '2018-11-02', value: '4444'},
            {date: '2018-11-03', value: '1122'},
            {date: '2018-11-04', value: '1122'},
            {date: '2018-11-05', value: '1122'},
        ]
    },
    tableData: [{
        acctGroNetOpenInt: 193496715,
        acctId: 'XG00001',
        acctNetOpenInt: -2573,
        contrCd: 'cu1712',
        custId: '80000025',
        multiBillOpenInt: 0,
        nuBillOpenInt: 2573,
        posLimQtty: 10000,
        txDay: '2017-02-19'
    }]
};
export const table3Options = [
    {label: '买入量', field: 'buyCnt', minWidth: 100},
    {label: '卖出量', field: 'sellCnt', minWidth: 100},
    {label: '多头持仓量', field: 'longPosOpenInt', minWidth: 130},
    {label: '多头持仓金额', field: '', minWidth: 130},
    {label: '盈亏', field: 'prftLoss', minWidth: 90},
    {label: '净买入量', field: 'netBuyQtty', minWidth: 100},
    {label: '净持仓量', field: 'netOpenInt', minWidth: 100}
];
export const respData3 = {
    mainData: [
        {txDt: '2013-01-02', openQuotPrice: '2320.26', closeQuotPrice: '2320.26', highestPrice: '2987.3', lowestPrice: '2362.94', sellAcctCnt: 3, buyAcctCnt: 22},
        {txDt: '2013-01-03', openQuotPrice: '2300', closeQuotPrice: '2300', highestPrice: '2288.26', lowestPrice: '2288.26', sellAcctCnt: 2, buyAcctCnt: 3},
        {txDt: '2013-01-04', openQuotPrice: '2288.26', closeQuotPrice: '2320.26', highestPrice: '2400', lowestPrice: '2362.94', sellAcctCnt: 6, buyAcctCnt: 9},
        {txDt: '2013-01-05', openQuotPrice: '2300', closeQuotPrice: '2288.26', highestPrice: '2420.26', lowestPrice: '2362.94', sellAcctCnt: 32, buyAcctCnt: 2},
        {txDt: '2013-01-06', openQuotPrice: '2300', closeQuotPrice: '2362.94', highestPrice: '2588.26', lowestPrice: '2320.26', sellAcctCnt: 9, buyAcctCnt: 4},
    ],
    tableData: [
        {
            date: '2017-04-14',
            map: {
                80000025: {
                    acctId: '11111',
                    buyCnt: '11111',
                    buyQtty: '11111',
                    contrCd: '11111',
                    custId: '11111',
                    longPosOpenInt: '11111',
                    netBuyQtty: '11111',
                    netOpenInt: '11111',
                    prftLoss: '11111',
                    sellCnt: '11111',
                    sellQtty: '11111',
                    shortPosOpenInt: '11111',
                    txDay: '11111'
                }
            }
        }
    ]
};
export const respData4 = {
    mainData: [
        {time: '12:09', price: 12},
        {time: '12:19', price: 22}
    ],
    buy: {
        20189898: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189897: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189896: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189895: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189894: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
    },
    sail: {
        20189898: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189897: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189896: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189895: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
        20189894: [{time: '12:09', price: 12, count: 3}, {time: '12:19', price: 22, count: 9}],
    },
    tableData: [
        {a: 1, b: 2}
    ]
};