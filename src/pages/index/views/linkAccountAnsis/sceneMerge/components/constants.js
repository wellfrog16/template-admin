export const echartsOptions1 = {
    title: {
        text: 'NPM Dependencies'
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            // progressiveThreshold: 700,
            data: [],
            edges: [],
            label: {
                emphasis: {
                    position: 'right',
                    show: true
                }
            },
            roam: true,
            focusNodeAdjacency: true,
            lineStyle: {
                normal: {
                    width: 0.5,
                    curveness: 0.3,
                    opacity: 0.7
                }
            }
        }
    ]
};