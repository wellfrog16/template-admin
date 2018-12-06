let axisCommon = () => {
    return {
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
    color: ['#fec42c', 'rgb(159, 240, 72)', 'rgb(37, 198, 252)', 'rgb(255, 83, 77)', 'rgb(237, 308, 190)', 'rgb(246, 214, 255)'],
    timeAxis: axisCommon(),
    // logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),
    legend: {
        textStyle: {
            color: '#eee'
        }
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
        }
    }
};