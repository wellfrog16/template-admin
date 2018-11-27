export const chartOption2 = {
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
var itemStyle = {
    normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
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
        x: '10%',
        x2: 150,
        y: '18%',
        y2: '10%'
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1
    },
    xAxis: {
        type: 'value',
        name: '日期',
        nameGap: 16,
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        max: 31,
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
        name: 'AQI指数',
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
            left: '93%',
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
            data: [
                [1, 55, 9, 56, 0.46, 18, 6, '良'],
                [2, 25, 11, 21, 0.65, 34, 9, '优'],
                [3, 56, 7, 63, 0.3, 14, 5, '良'],
                [4, 33, 7, 29, 0.33, 16, 6, '优'],
                [5, 42, 24, 44, 0.76, 40, 16, '优'],
                [6, 82, 58, 90, 1.77, 68, 33, '良'],
                [7, 74, 49, 77, 1.46, 48, 27, '良'],
                [8, 78, 55, 80, 1.29, 59, 29, '良'],
                [9, 267, 216, 280, 4.8, 108, 64, '重度污染'],
                [10, 185, 127, 216, 2.52, 61, 27, '中度污染'],
                [11, 39, 19, 38, 0.57, 31, 15, '优'],
                [12, 41, 11, 40, 0.43, 21, 7, '优'],
                [13, 64, 38, 74, 1.04, 46, 22, '良'],
                [14, 108, 79, 120, 1.7, 75, 41, '轻度污染'],
                [15, 108, 63, 116, 1.48, 44, 26, '轻度污染'],
                [16, 33, 6, 29, 0.34, 13, 5, '优'],
                [17, 94, 66, 110, 1.54, 62, 31, '良'],
                [18, 186, 142, 192, 3.88, 93, 79, '中度污染'],
                [19, 57, 31, 54, 0.96, 32, 14, '良'],
                [20, 22, 8, 17, 0.48, 23, 10, '优'],
                [21, 39, 15, 36, 0.61, 29, 13, '优'],
                [22, 94, 69, 114, 2.08, 73, 39, '良'],
                [23, 99, 73, 110, 2.43, 76, 48, '良'],
                [24, 31, 12, 30, 0.5, 32, 16, '优'],
                [25, 42, 27, 43, 1, 53, 22, '优'],
                [26, 154, 117, 157, 3.05, 92, 58, '中度污染'],
                [27, 234, 185, 230, 4.09, 123, 69, '重度污染'],
                [28, 160, 120, 186, 2.77, 91, 50, '中度污染'],
                [29, 134, 96, 165, 2.76, 83, 41, '轻度污染'],
                [30, 52, 24, 60, 1.03, 50, 21, '良'],
                [31, 46, 5, 49, 0.28, 10, 6, '优']
            ]
        },
        {
            name: '上海',
            type: 'scatter',
            itemStyle: itemStyle,
            data: []
        },
        {
            name: '广州',
            type: 'scatter',
            itemStyle: itemStyle,
            data: []
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