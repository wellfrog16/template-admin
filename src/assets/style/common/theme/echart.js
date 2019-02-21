let axisCommon = () => {
    return {
        axisLabel: {
            rotate: 340
        },
        nameTextStyle: {
            color: '#fff',
            fontSize: 12,
        },
        axisLine: {
            lineStyle: {
                color: '#eee',
                width: 1
            }
        },
        splitLine: {
            lineStyle: {
                color: '#21446a'
            }
        }
    };
};
export const echartsDefault = {
    title: {
        textStyle: {
            color: '#fff'
        }
    },
    color: [
        '#f8f400',
        '#40f3d6',
        '#ce20ff',
        '#13ce34',
        '#ff8a00',
        '#e3007b',
        '#1929b3',
        '#b69913',
        '#00709e',
        '#006624',
        '#4f1692',
        '#b9cc87',
        '#ffabf3',
        '#f3253c',
        '#18414c',
        '#dbef09',
        '#791e06',
        '#09beef',
        '#c475cc',
        '#75ccbe'
    ],
    timeAxis: axisCommon(),
    // logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),
    legend: {
        itemWidth: 16,
        itemGap: 6,
        textStyle: {
            color: '#fff',
            fontSize: 14
        }
    },
    grid: {
        x: 40,
        x2: 60,
        y: 35,
        y2: 60,
        containLabel: true
    },
    dataZoom: {
        backgroundColor: '#001c4c',
        borderColor: '#092b66',
        handleStyle: {
            color: '#0a2a62',
            borderColor: '',
            borderWidth: '',
            borderType: ''
        },
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        confine: true,
        // position: function(point, params, dom, rect, size) {
        //     // 其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
        //     let divWidth = size.viewSize[0];
        //     let divHeight = size.viewSize[1];
        //     var x = point[0];
        //     var y = point[1];
        //     var boxWidth = size.contentSize[0];
        //     var boxHeight = size.contentSize[1];
        //     var posX = 0;// x坐标位置
        //     var posY = 0;// y坐标位置
        //     debugger;
        //     if (divWidth - x < boxWidth) { // 左边放不开
        //         posX = x - boxWidth - 10;
        //     } else {
        //         posX = x + 10;
        //     }
        //     if (divHeight - y < boxHeight) { // 上边放不开
        //         posY = y - boxHeight - 10;
        //     } else {
        //         posY = y + 10;
        //     }
        //     return [posX, posY];
        // }
    }
};
