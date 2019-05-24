/*
export const data = {
    'name': 'flare',
    'itemStyle': {
        // borderWidth: 4,
        // borderColor: '#ec0000',
        // shadowColor: '#ec0000',
        // shadowBlur: 10
    },
    'symbolSize': 10,
    // 'symbol': 'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU3Mzg0NTA0ODUwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3NDQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDMzLjk5MTcwMUMyNDguNTY0MzE1IDMzLjk5MTcwMSAzMy45OTE3MDEgMjQ4LjU2NDMxNSAzMy45OTE3MDEgNTEyYzAgMjYzLjQzNTY4NSAyMTQuNTcyNjE0IDQ3OC4wMDgyOTkgNDc4LjAwODI5OSA0NzguMDA4Mjk5czQ3OC4wMDgyOTktMjE0LjU3MjYxNCA0NzguMDA4Mjk5LTQ3OC4wMDgyOTlDOTkwLjAwODI5OSAyNDguNTY0MzE1IDc3NS40MzU2ODUgMzMuOTkxNzAxIDUxMiAzMy45OTE3MDF6TTUxMiA5MzIuNjQ3MzAzQzI4MC40MzE1MzUgOTMyLjY0NzMwMyA5MS4zNTI2OTcgNzQzLjU2ODQ2NSA5MS4zNTI2OTcgNTEyYzAtMjMxLjU2ODQ2NSAxODkuMDc4ODM4LTQyMC42NDczMDMgNDIwLjY0NzMwMy00MjAuNjQ3MzAzczQyMC42NDczMDMgMTg5LjA3ODgzOCA0MjAuNjQ3MzAzIDQyMC42NDczMDNDOTMyLjY0NzMwMyA3NDMuNTY4NDY1IDc0My41Njg0NjUgOTMyLjY0NzMwMyA1MTIgOTMyLjY0NzMwM3oiIHAtaWQ9IjI3NDUiIGZpbGw9IiMxYWZhMjkiPjwvcGF0aD48cGF0aCBkPSJNNDgwLjEzMjc4IDU1Mi4zNjUxNDUgMjU5LjE4NjcyMiA1NTIuMzY1MTQ1Yy0xNi45OTU4NTEgMC0yOS43NDI3MzktMTIuNzQ2ODg4LTI5Ljc0MjczOS0yOS43NDI3MzkgMC0xNi45OTU4NTEgMTIuNzQ2ODg4LTI5Ljc0MjczOSAyOS43NDI3MzktMjkuNzQyNzM5bDIyMC45NDYwNTggMCAwIDBMNDgwLjEzMjc4IDI3NC4wNTgwOTFjMC0xNi45OTU4NTEgMTIuNzQ2ODg4LTI5Ljc0MjczOSAyOS43NDI3MzktMjkuNzQyNzM5IDE2Ljk5NTg1MSAwIDI5Ljc0MjczOSAxMi43NDY4ODggMjkuNzQyNzM5IDI5Ljc0MjczOWwwIDIxOC44MjE1NzcgMCAwIDIyMC45NDYwNTggMGMxNi45OTU4NTEgMCAyOS43NDI3MzkgMTIuNzQ2ODg4IDI5Ljc0MjczOSAyOS43NDI3MzkgMCAxNi45OTU4NTEtMTIuNzQ2ODg4IDI5Ljc0MjczOS0yOS43NDI3MzkgMjkuNzQyNzM5TDUzNy40OTM3NzYgNTUyLjM2NTE0NWwwIDAgMCAyMTguODIxNTc3YzAgMTYuOTk1ODUxLTEyLjc0Njg4OCAyOS43NDI3MzktMjkuNzQyNzM5IDI5Ljc0MjczOS0xNi45OTU4NTEgMC0yOS43NDI3MzktMTIuNzQ2ODg4LTI5Ljc0MjczOS0yOS43NDI3MzlMNDgwLjEzMjc4IDU1Mi4zNjUxNDUiIHAtaWQ9IjI3NDYiIGZpbGw9IiMxYWZhMjkiPjwvcGF0aD48L3N2Zz4=',
    'children': [
        {
            'name': 'analytics',
            'children': [
                {
                    'name': 'cluster',
                    'children': [
                        {'name': 'AgglomerativeCluster', 'value': 3938},
                        {'name': 'CommunityStructure', 'value': 3812},
                        {'name': 'HierarchicalCluster', 'value': 6714},
                        {'name': 'MergeEdge', 'value': 743}
                    ]
                },
                {
                    'name': 'graph',
                    'children': [
                        {'name': 'BetweennessCentrality', 'value': 3534},
                        {'name': 'LinkDistance', 'value': 5731},
                        {'name': 'MaxFlowMinCut', 'value': 7840},
                        {'name': 'ShortestPaths', 'value': 5914},
                        {'name': 'SpanningTree', 'value': 3416}
                    ]
                },
                {
                    'name': 'optimization',
                    'children': [
                        {'name': 'AspectRatioBanker', 'value': 7074}
                    ]
                }
            ]
        },
        {
            'name': 'animate',
            'children': [
                {'name': 'Easing', 'value': 17010},
                {'name': 'FunctionSequence', 'value': 5842},
                {
                    'name': 'interpolate',
                    'children': [
                        {'name': 'ArrayInterpolator', 'value': 1983},
                        {'name': 'ColorInterpolator', 'value': 2047},
                        {'name': 'DateInterpolator', 'value': 1375},
                        {'name': 'Interpolator', 'value': 8746},
                        {'name': 'MatrixInterpolator', 'value': 2202},
                        {'name': 'NumberInterpolator', 'value': 1382},
                        {'name': 'ObjectInterpolator', 'value': 1629},
                        {'name': 'PointInterpolator', 'value': 1675},
                        {'name': 'RectangleInterpolator', 'value': 2042}
                    ]
                },
                {'name': 'ISchedulable', 'value': 1041},
                {'name': 'Parallel', 'value': 5176},
                {'name': 'Pause', 'value': 449},
                {'name': 'Scheduler', 'value': 5593},
                {'name': 'Sequence', 'value': 5534},
                {'name': 'Transition', 'value': 9201},
                {'name': 'Transitioner', 'value': 19975},
                {'name': 'TransitionEvent', 'value': 1116},
                {'name': 'Tween', 'value': 6006}
            ]
        },
        {
            'name': 'data',
            'children': [
                {
                    'name': 'converters',
                    'children': [
                        {'name': 'Converters', 'value': 721},
                        {'name': 'DelimitedTextConverter', 'value': 4294},
                        {'name': 'GraphMLConverter', 'value': 9800},
                        {'name': 'IDataConverter', 'value': 1314},
                        {'name': 'JSONConverter', 'value': 2220}
                    ]
                },
                {'name': 'DataField', 'value': 1759},
                {'name': 'DataSchema', 'value': 2165},
                {'name': 'DataSet', 'value': 586},
                {'name': 'DataSource', 'value': 3331},
                {'name': 'DataTable', 'value': 772},
                {'name': 'DataUtil', 'value': 3322}
            ]
        },
        {
            'name': 'display',
            'children': [
                {'name': 'DirtySprite', 'value': 8833},
                {'name': 'LineSprite', 'value': 1732},
                {'name': 'RectSprite', 'value': 3623},
                {'name': 'TextSprite', 'value': 10066}
            ]
        },
        {
            'name': 'flex',
            'children': [
                {'name': 'FlareVis', 'value': 4116}
            ]
        },
        {
            'name': 'physics',
            'itemStyle': {
                borderWidth: 4,
                borderColor: '#ec0000',
                shadowColor: '#ec0000',
                shadowBlur: 10
            },
            'symbolSize': 10,
            'children': [
                {'name': 'DragForce', 'value': 1082},
                {'name': 'GravityForce', 'value': 1336},
                {'name': 'IForce', 'value': 319},
                {'name': 'NBodyForce', 'value': 10498},
                {'name': 'Particle', 'value': 2822},
                {'name': 'Simulation', 'value': 9983},
                {'name': 'Spring', 'value': 2213},
                {'name': 'SpringForce',
                    'value': 1681,
                    'itemStyle': {
                        borderWidth: 4,
                        borderColor: '#ec0000',
                        shadowColor: '#ec0000',
                        shadowBlur: 10
                    },
                    'symbolSize': 10}
            ]
        },
        {
            'name': 'query',
            'children': [
                {'name': 'AggregateExpression', 'value': 1616},
                {'name': 'And', 'value': 1027},
                {'name': 'Arithmetic', 'value': 3891},
                {'name': 'Average', 'value': 891},
                {'name': 'BinaryExpression', 'value': 2893},
                {'name': 'Comparison', 'value': 5103},
                {'name': 'CompositeExpression', 'value': 3677},
                {'name': 'Count', 'value': 781},
                {'name': 'DateUtil', 'value': 4141},
                {'name': 'Distinct', 'value': 933},
                {'name': 'Expression', 'value': 5130},
                {'name': 'ExpressionIterator', 'value': 3617},
                {'name': 'Fn', 'value': 3240},
                {'name': 'If', 'value': 2732},
                {'name': 'IsA', 'value': 2039},
                {'name': 'Literal', 'value': 1214},
                {'name': 'Match', 'value': 3748},
                {'name': 'Maximum', 'value': 843},
                {
                    'name': 'methods',
                    'children': [
                        {'name': 'add', 'value': 593},
                        {'name': 'and', 'value': 330},
                        {'name': 'average', 'value': 287},
                        {'name': 'count', 'value': 277},
                        {'name': 'distinct', 'value': 292},
                        {'name': 'div', 'value': 595},
                        {'name': 'eq', 'value': 594},
                        {'name': 'fn', 'value': 460},
                        {'name': 'gt', 'value': 603},
                        {'name': 'gte', 'value': 625},
                        {'name': 'iff', 'value': 748},
                        {'name': 'isa', 'value': 461},
                        {'name': 'lt', 'value': 597},
                        {'name': 'lte', 'value': 619},
                        {'name': 'max', 'value': 283},
                        {'name': 'min', 'value': 283},
                        {'name': 'mod', 'value': 591},
                        {'name': 'mul', 'value': 603},
                        {'name': 'neq', 'value': 599},
                        {'name': 'not', 'value': 386},
                        {'name': 'or', 'value': 323},
                        {'name': 'orderby', 'value': 307},
                        {'name': 'range', 'value': 772},
                        {'name': 'select', 'value': 296},
                        {'name': 'stddev', 'value': 363},
                        {'name': 'sub', 'value': 600},
                        {'name': 'sum', 'value': 280},
                        {'name': 'update', 'value': 307},
                        {'name': 'variance', 'value': 335},
                        {'name': 'where', 'value': 299},
                        {'name': 'xor', 'value': 354},
                        {'name': '-', 'value': 264}
                    ]
                },
                {'name': 'Minimum', 'value': 843},
                {'name': 'Not', 'value': 1554},
                {'name': 'Or', 'value': 970},
                {'name': 'Query', 'value': 13896},
                {'name': 'Range', 'value': 1594},
                {'name': 'StringUtil', 'value': 4130},
                {'name': 'Sum', 'value': 791},
                {'name': 'Variable', 'value': 1124},
                {'name': 'Variance', 'value': 1876},
                {'name': 'Xor', 'value': 1101}
            ]
        },
        {
            'name': 'scale',
            'children': [
                {'name': 'IScaleMap', 'value': 2105},
                {'name': 'LinearScale', 'value': 1316},
                {'name': 'LogScale', 'value': 3151},
                {'name': 'OrdinalScale', 'value': 3770},
                {'name': 'QuantileScale', 'value': 2435},
                {'name': 'QuantitativeScale', 'value': 4839},
                {'name': 'RootScale', 'value': 1756},
                {'name': 'Scale', 'value': 4268},
                {'name': 'ScaleType', 'value': 1821},
                {'name': 'TimeScale', 'value': 5833}
            ]
        },
        {
            'name': 'util',
            'children': [
                {'name': 'Arrays', 'value': 8258},
                {'name': 'Colors', 'value': 10001},
                {'name': 'Dates', 'value': 8217},
                {'name': 'Displays', 'value': 12555},
                {'name': 'Filter', 'value': 2324},
                {'name': 'Geometry', 'value': 10993},
                {
                    'name': 'heap',
                    'children': [
                        {'name': 'FibonacciHeap', 'value': 9354},
                        {'name': 'HeapNode', 'value': 1233}
                    ]
                },
                {'name': 'IEvaluable', 'value': 335},
                {'name': 'IPredicate', 'value': 383},
                {'name': 'IValueProxy', 'value': 874},
                {
                    'name': 'math',
                    'children': [
                        {'name': 'DenseMatrix', 'value': 3165},
                        {'name': 'IMatrix', 'value': 2815},
                        {'name': 'SparseMatrix', 'value': 3366}
                    ]
                },
                {'name': 'Maths', 'value': 17705},
                {'name': 'Orientation', 'value': 1486},
                {
                    'name': 'palette',
                    'children': [
                        {'name': 'ColorPalette', 'value': 6367},
                        {'name': 'Palette', 'value': 1229},
                        {'name': 'ShapePalette', 'value': 2059},
                        {'name': 'SizePalette', 'value': 2291}
                    ]
                },
                {'name': 'Property', 'value': 5559},
                {'name': 'Shapes', 'value': 19118},
                {'name': 'Sort', 'value': 6887},
                {'name': 'Stats', 'value': 6557},
                {'name': 'Strings', 'value': 22026}
            ]
        },
        {
            'name': 'vis',
            'children': [
                {
                    'name': 'axis',
                    'children': [
                        {'name': 'Axes', 'value': 1302},
                        {'name': 'Axis', 'value': 24593},
                        {'name': 'AxisGridLine', 'value': 652},
                        {'name': 'AxisLabel', 'value': 636},
                        {'name': 'CartesianAxes', 'value': 6703}
                    ]
                },
                {
                    'name': 'controls',
                    'children': [
                        {'name': 'AnchorControl', 'value': 2138},
                        {'name': 'ClickControl', 'value': 3824},
                        {'name': 'Control', 'value': 1353},
                        {'name': 'ControlList', 'value': 4665},
                        {'name': 'DragControl', 'value': 2649},
                        {'name': 'ExpandControl', 'value': 2832},
                        {'name': 'HoverControl', 'value': 4896},
                        {'name': 'IControl', 'value': 763},
                        {'name': 'PanZoomControl', 'value': 5222},
                        {'name': 'SelectionControl', 'value': 7862},
                        {'name': 'TooltipControl', 'value': 8435}
                    ]
                },
                {
                    'name': 'data',
                    'children': [
                        {'name': 'Data', 'value': 20544},
                        {'name': 'DataList', 'value': 19788},
                        {'name': 'DataSprite', 'value': 10349},
                        {'name': 'EdgeSprite', 'value': 3301},
                        {'name': 'NodeSprite', 'value': 19382},
                        {
                            'name': 'render',
                            'children': [
                                {'name': 'ArrowType', 'value': 698},
                                {'name': 'EdgeRenderer', 'value': 5569},
                                {'name': 'IRenderer', 'value': 353},
                                {'name': 'ShapeRenderer', 'value': 2247}
                            ]
                        },
                        {'name': 'ScaleBinding', 'value': 11275},
                        {'name': 'Tree', 'value': 7147},
                        {'name': 'TreeBuilder', 'value': 9930}
                    ]
                },
                {
                    'name': 'events',
                    'children': [
                        {'name': 'DataEvent', 'value': 2313},
                        {'name': 'SelectionEvent', 'value': 1880},
                        {'name': 'TooltipEvent', 'value': 1701},
                        {'name': 'VisualizationEvent', 'value': 1117}
                    ]
                },
                {
                    'name': 'legend',
                    'children': [
                        {'name': 'Legend', 'value': 20859},
                        {'name': 'LegendItem', 'value': 4614},
                        {'name': 'LegendRange', 'value': 10530}
                    ]
                },
                {
                    'name': 'operator',
                    'children': [
                        {
                            'name': 'distortion',
                            'children': [
                                {'name': 'BifocalDistortion', 'value': 4461},
                                {'name': 'Distortion', 'value': 6314},
                                {'name': 'FisheyeDistortion', 'value': 3444}
                            ]
                        },
                        {
                            'name': 'encoder',
                            'children': [
                                {'name': 'ColorEncoder', 'value': 3179},
                                {'name': 'Encoder', 'value': 4060},
                                {'name': 'PropertyEncoder', 'value': 4138},
                                {'name': 'ShapeEncoder', 'value': 1690},
                                {'name': 'SizeEncoder', 'value': 1830}
                            ]
                        },
                        {
                            'name': 'filter',
                            'children': [
                                {'name': 'FisheyeTreeFilter', 'value': 5219},
                                {'name': 'GraphDistanceFilter', 'value': 3165},
                                {'name': 'VisibilityFilter', 'value': 3509}
                            ]
                        },
                        {'name': 'IOperator', 'value': 1286},
                        {
                            'name': 'label',
                            'children': [
                                {'name': 'Labeler', 'value': 9956},
                                {'name': 'RadialLabeler', 'value': 3899},
                                {'name': 'StackedAreaLabeler', 'value': 3202}
                            ]
                        },
                        {
                            'name': 'layout',
                            'children': [
                                {'name': 'AxisLayout', 'value': 6725},
                                {'name': 'BundledEdgeRouter', 'value': 3727},
                                {'name': 'CircleLayout', 'value': 9317},
                                {'name': 'CirclePackingLayout', 'value': 12003},
                                {'name': 'DendrogramLayout', 'value': 4853},
                                {'name': 'ForceDirectedLayout', 'value': 8411},
                                {'name': 'IcicleTreeLayout', 'value': 4864},
                                {'name': 'IndentedTreeLayout', 'value': 3174},
                                {'name': 'Layout', 'value': 7881},
                                {'name': 'NodeLinkTreeLayout', 'value': 12870},
                                {'name': 'PieLayout', 'value': 2728},
                                {'name': 'RadialTreeLayout', 'value': 12348},
                                {'name': 'RandomLayout', 'value': 870},
                                {'name': 'StackedAreaLayout', 'value': 9121},
                                {'name': 'TreeMapLayout', 'value': 9191}
                            ]
                        },
                        {'name': 'Operator', 'value': 2490},
                        {'name': 'OperatorList', 'value': 5248},
                        {'name': 'OperatorSequence', 'value': 4190},
                        {'name': 'OperatorSwitch', 'value': 2581},
                        {'name': 'SortOperator', 'value': 2023}
                    ]
                },
                {'name': 'Visualization', 'value': 16540}
            ]
        }
    ]
}; */

export const data = {'name': '螺纹钢',
    'keyWord': null,
    'factorLevel': 1,
    'children': [{
        'name': '宏观经济因子',
        'itemStyle': null,
        'symbolSize': null,
        // 'itemStyle': {},
        // 'symbolSize': 7,
        'keyWord': null,
        'factorLevel': 2,
        'children': [{
            'name': '固定资产投资增速',
            'keyWord': null,
            'factorLevel': 3,
            'itemStyle': null,
            'symbolSize': null,
            'children': [
                {

                    'name': '9caebd6d4f5b4185bbbd7749dc225e13',
                    'keyWord': null,
                    'factorLevel': null,
                    'children': null,
                    'id': null,
                    'factorId': null,
                    'parentId': null}, {'name': '020d2ac9dc06465282b31f60f1524eb8', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'c10e478c0b204adc8059ef14a9fab2fa', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}],
            'id': '18',
            'factorId': '19',
            'parentId': '4'}, {'name': '进出口数据', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '1b51e51d2c6a4c1584291a1b4140eb25', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '77f1533c4309459291d42c6322b4caab', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '2b352471b7c0431fb17accc12ca2f8ae', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '20', 'factorId': '21', 'parentId': '4'}, {'name': 'PMI', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'bbf1f42fb3694458b5f4fcf66d8c8f73', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'e1f800a7635d4458ab91653ed8fceabb', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'd551a58541b743628477f384673cebd6', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '17', 'factorId': '18', 'parentId': '4'}, {'name': 'GDP', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'c93434b2a27e41cbb0462c8fc462f0ea', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'f148146312834f31bc040616faa0fc55', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '0ae339936b27450fa464120c9a5fcab0', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '16', 'factorId': '17', 'parentId': '4'}, {'name': '工业增加值', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '86c0bad80c744b04a5d919bf88ca0bc0', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '4fbd7a227597483f987c864d9f3914dc', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '84e7287bb54e4df18ebe3183ae7bf553', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '19', 'factorId': '20', 'parentId': '4'}, {'name': '货币供应量', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '4a138016c60e49fab402ce891fc1b4aa', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '19ca20ca8e584e99ba3ae58be45a37e1', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '5cd8123d7a14439aa3283dfde1c7d845', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '21', 'factorId': '22', 'parentId': '4'}],
        'id': '3',
        'factorId': '4',
        'parentId': '1'}, {
        'itemStyle': {
            borderWidth: 4,
            borderColor: '#ec0000',
            shadowColor: '#ec0000',
            shadowBlur: 10
        },
        'symbolSize': 10,
        'name': '产量因子',
        'keyWord': null,
        'factorLevel': 2,
        'children': [{
            'itemStyle': {
                borderWidth: 4,
                borderColor: '#ec0000',
                shadowColor: '#ec0000',
                shadowBlur: 10
            },
            'symbolSize': 10,
            'name': '产能利用率',
            'keyWord': null,
            'factorLevel': 3,
            'children': [{
                'itemStyle': {
                    borderWidth: 4,
                    borderColor: '#ec0000',
                    shadowColor: '#ec0000',
                    shadowBlur: 10
                },
                'symbolSize': 10,
                'name': '0fa9cd0a4c7748ceb3322d033ce102be',
                'keyWord': null,
                'factorLevel': null,
                'children': null,
                'id': null,
                'factorId': null,
                'parentId': null}, {'name': 'c6f389cee1274109a8e68db84135c7fb', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'c3baec0b703747158bf35941b811ffa3', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}],
            'id': '29',
            'factorId': '29',
            'parentId': '7'}, {'name': '季度产量数据', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '57754285dda34dc6a303e36d19bfb9a4', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'f13e43ff378545aaa2af9e1f2daca2c6', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '68998611e35e4492909d883e9ba7efb4', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '28', 'factorId': '28', 'parentId': '7'}, {'name': '月度产量数据', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '2ec5d9799f5946e1ac8ffaa91826f263', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '810849c7401748eea7a1a770613ecb9b', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'a647f5169c9546618bc6ac045a508c25', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '27', 'factorId': '27', 'parentId': '7'}],
        'id': '6',
        'factorId': '7',
        'parentId': '1'}, {'name': '需求端（下游）', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '基建', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '5b2ce6523d394d6d82cee8217a8001de', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '233c9a8deedc4940b42093e161fb16df', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '1d54fb8855224092af25b4319d754e7d', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '35', 'factorId': '33', 'parentId': '10'}, {'name': '新房价指数', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '8130bf9670ac48c294826eda6f27eb6a', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '0a1ed3d71c764a7ea8e457d8935c1490', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'a894915640994947b2011dadd929f11a', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '34', 'factorId': '32', 'parentId': '10'}, {'name': '机械设备', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'c48d951900df40c496ea2855dbbbcfb1', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '7033793c8b024e6e83265a2ff8aa7d69', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '9288fda0334648188cfde2681062d772', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '36', 'factorId': '34', 'parentId': '10'}], 'id': '9', 'factorId': '10', 'parentId': '1'}, {'name': '舆情', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '情感因子', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '48adbccb8bd543f797cbebe1302f553e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'd1816b1e798d48b1b5e5d33aa613339e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'b0fbde20dcc24c058edec00e71311e2b', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '38', 'factorId': '36', 'parentId': '12'}], 'id': '11', 'factorId': '12', 'parentId': '1'}, {'name': '相关品种', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '焦炭', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '86304b5abc0a47efa71715d118a6706b', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'd27260ca94a94d74b0a781e91598174e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '2fd8f07a997e43bbbb70448dbaf4f686', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '15', 'factorId': '16', 'parentId': '3'}, {'name': '铁矿石', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '51b1c0535e124328a56c198b1f50651e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '48d1061de3304cd7840be638c037a91e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'eccb16c42c594a6ca6bd7fe59de1ef60', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '14', 'factorId': '15', 'parentId': '3'}], 'id': '2', 'factorId': '3', 'parentId': '1'}, {'name': '行业政策因子', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '提高附加值', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '640b7f4ca7554df190090d66ee5c31a7', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'bd572b25aa8e474e914a9160b58c3460', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '9aad977dd49f4f7b9082659991ffd60f', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '26', 'factorId': '26', 'parentId': '6'}, {'name': '落后产能', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'ccd8dc4a5f0c4533819fe9cc28a66354', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '1ff6d168e34c4b3ab2ae1934bf700ca4', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '8ec677a1754e491aa80d7370d6868ad9', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '25', 'factorId': '25', 'parentId': '6'}, {'name': '企业重组', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'bbfbe43bcf2740259f033a04aa01feea', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'bc6b5165ffbf4c0184d7b492e4865638', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'a612995f942f488b8a5f5e4ffe8c673d', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '24', 'factorId': '24', 'parentId': '6'}], 'id': '5', 'factorId': '6', 'parentId': '1'}, {'name': '供应端（上游）', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '铁矿石', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'd0db5c22d17c40078d7bc4ba18e39029', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '2cb5594e99a94897ad7abbf87417e344', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'd7f617bed2f54c88a82bac6b2782b3f4', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '32', 'factorId': '15', 'parentId': '9'}, {'name': '焦炭', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '3fe6cf9a4378433ba3fa35629f7b1daa', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '4d185a533f69457ea8b5d2e267c0d569', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'c742d37cdbb646989cbb8e93a5eebae8', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '33', 'factorId': '16', 'parentId': '9'}], 'id': '8', 'factorId': '9', 'parentId': '1'}, {
        'itemStyle': {
            borderWidth: 4,
            borderColor: '#00da3c',
            shadowColor: '#00da3c',
            shadowBlur: 10
        },
        'symbolSize': 10,
        'name': '现货价格',
        'keyWord': null,
        'factorLevel': 2,
        'children': [{
            'itemStyle': {
                borderWidth: 4,
                borderColor: '#00da3c',
                shadowColor: '#00da3c',
                shadowBlur: 10
            },
            'symbolSize': 10,
            'name': '期现差',
            'keyWord': null,
            'factorLevel': 3,
            'children': [{
                'itemStyle': {
                    borderWidth: 4,
                    borderColor: '#00da3c',
                    shadowColor: '#00da3c',
                    shadowBlur: 10
                },
                'symbolSize': 10,
                'name': 'd0e9b5da2bee47a68105dbe23c52e797',
                'keyWord': null,
                'factorLevel': null,
                'children': null,
                'id': null,
                'factorId': null,
                'parentId': null}, {'name': '5832a81366b14d54a46ce8ff383e7405', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '9ffd7c090535420ebcd7b16e43e9ce0e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}],
            'id': '37',
            'factorId': '35',
            'parentId': '11'}],
        'id': '10',
        'factorId': '11',
        'parentId': '1'}, {'name': '财政货币政策因子', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '货币供应量', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'ae42e5e08e0b4e84ac8f729fc2d25801', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'de0c3d70cc8a4571a650133a84d4f3ef', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '0558858087c64293aeff7f92682e8866', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '23', 'factorId': '22', 'parentId': '5'}, {'name': '财政政策', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '58129ef432d2477bbe2335ddb75b3f67', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '7536cc98c95948f48196318f892644b9', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '75632e6fd47d4a06b94033d179bc7d1e', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '22', 'factorId': '23', 'parentId': '5'}], 'id': '4', 'factorId': '5', 'parentId': '1'}, {'name': '库存因子', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '社会库存量', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '7677a96441c14f1889b53154051eaad8', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'c420c7a4fd564305a2385a0b6f45c7d5', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '31b1b54f8532475b933a34bf2da8b7e5', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '31', 'factorId': '31', 'parentId': '8'}, {'name': '企业钢铁库存量', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': 'cb23c2cb4ef14dc4a6ecea51c3a8387a', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '5ea2698abcb247cbbaaf85a6830bc31b', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': 'f6edb0a370ef4bcc92fbb1c06e80f47f', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '30', 'factorId': '30', 'parentId': '8'}], 'id': '7', 'factorId': '8', 'parentId': '1'}, {'name': '内因', 'keyWord': null, 'factorLevel': 2, 'children': [{'name': '价格波动', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '1fdf3a3488f04d0caf4479c1b6d7c5d3', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '20a7cf69a0754e429566302e44bbe3ec', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '46206a7be39842159a2efc2a853c180f', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '13', 'factorId': '14', 'parentId': '2'}, {'name': '交易量', 'keyWord': null, 'factorLevel': 3, 'children': [{'name': '843c942bb30b4910b3d54f6d7e301b59', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '9f216626bf234c3ab138b136257f6cc8', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}, {'name': '7237caf812c445b5942e527b11cd22cb', 'keyWord': null, 'factorLevel': null, 'children': null, 'id': null, 'factorId': null, 'parentId': null}], 'id': '12', 'factorId': '13', 'parentId': '2'}], 'id': '1', 'factorId': '2', 'parentId': '1'}],
    'id': '0',
    'factorId': '1',
    'parentId': '0'};