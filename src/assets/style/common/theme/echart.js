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
        }
    };
};
export const echartsDefault = {
    color: ['#fec42c', '#88efed'],
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),
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
    }
};