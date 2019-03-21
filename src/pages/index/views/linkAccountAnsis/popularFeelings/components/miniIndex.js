export default {
    data() {
        return {
            timeWindowOptions: [
                // 1 秒、5 秒、1 分 钟、10 分钟，还是 1 天、5 天、1 个月、1
                {
                    idName: '0',
                    name: '5 分钟'
                },
                {
                    idName: '1',
                    name: '10 分钟'
                },
                {
                    idName: '2',
                    name: '15 分 钟'
                },
            ],
            dtaWindowOptions: [
                // 1 秒、5 秒、1 分 钟、10 分钟，还是 1 天、5 天、1 个月、1
                {
                    idName: '1',
                    name: '5 天'
                },
                {
                    idName: '2',
                    name: '10 天'
                },
                {
                    idName: '3',
                    name: '15 天'
                }
            ],
            rules: {
                timeWindow: [
                    {required: true, message: '请选择时间窗口', trigger: 'change'}
                ]
            },
        };
    },
    methods: {},
    mounted() {
    },
};
