<template>
    <svg
        @mousemove="dragIng($event)"
        @mouseup="dragEnd($event)"
        id="svgContent"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1260" height="1029" data-spm-anchor-id="TODO.11007039.0.i6.12b64a9bcbXQmm">
        <g
            v-for="(item, i) in DataAll"
            :key="i" class="svg-each"
            :transform="`translate(${item.translate.left}, ${item.translate.top})`">
            <foreignObject  width="180" height="30" >
                <body style="margin: 0;" xmlns="http://www.w3.org/1999/xhtml">
                    <div :class="choice.paneNode === i ? 'pane-node-content selected' : 'pane-node-content'">
                        <span class="icon icon-data"></span>
                        <span class="name">{{ item.name }}</span>
                        <span @mouseup="linkEnd($event, item.id)" :class="item.parentNode ? 'parent-link' : 'parent-ring'">{{ i }}</span>
                        <span @mousedown="linkPre($event, i)"  :class="item.childNode ? 'child-link' : 'child-ring'"></span>
                    </div>
                </body>
            </foreignObject>
            <path
                class="connector"
                v-for="(each, n) in item.linkTo" :key="n"
                :d="computedLink(i, each, n)"
            ></path>
        </g>
        <g
            :transform="`translate(${dragFrame.posX}, ${dragFrame.posY})`"
            v-show="currentEvent === 'dragPane'"
            class="drag-frame">
            <foreignObject width="180" height="30">
                <body xmlns="http://www.w3.org/1999/xhtml">
                    <div
                        class="drag-frame-area">
                    </div>
                </body>
            </foreignObject>
        </g>
        <g>
            <path
                class="connector"
                :d="dragLinkPath()"
            ></path>
            <foreignObject width="12" height="12" >
                <body xmlns="http://www.w3.org/1999/xhtml">
                    <div
                        v-show="currentEvent === 'dragLink'"
                        :style="{transform: `translate(${dragLink.toX - 14}px, ${dragLink.toY - 6}px)`}"
                        class="drag-link-arrows">
                    </div>
                </body>
            </foreignObject>
        </g>
    </svg>
</template>
<script>
import DataAll from './constants';
export default {
    data() {
        return {
            DataAll: DataAll,
            choice: {
                paneNode: -1, // 选取的节点下标
                index: -1
            },
            dragFrame: {
                posX: 0,
                posY: 0
            },
            dragLink: {
                fromX: 0,
                fromY: 0,
                toX: 0,
                toY: 0
            },
            currentEvent: null, // 当前执行的方法
            initPos: {
                left: -1,
                top: -1
            }
        };
    },
    methods: {
        setInitRect() {
            let {left, top} = document
                .getElementById('svgContent')
                .getBoundingClientRect(); // 画板坐标
            this.initPos = {left, top};
        },
        setDragFramePosition(e) {
            const x = e.x - this.initPos.left; // 修正拖动元素坐标
            const y = e.y - this.initPos.top;
            this.dragFrame = {posX: x - 90, posY: y - 15};
        },
        dragPre(e, i) {
            // 准备拖动节点
            this.setInitRect(); // 初始化画板坐标
            this.currentEvent = 'dragPane'; // 修正行为
            this.choice.index = i;
            this.setDragFramePosition(e);
        },
        setDragLinkPostion(e, init) {
            // 定位连线
            const x = e.x - this.initPos.left;
            const y = e.y - this.initPos.top;
            if (init) {
                this.dragLink = Object.assign({}, this.dragLink, {
                    fromX: x,
                    fromY: y
                });
            }
            this.dragLink = Object.assign({}, this.dragLink, {toX: x, toY: y});
        },
        linkEnd(e, i) {
            if (this.currentEvent === 'dragLink') {
                this.DataAll[this.choice.index].linkTo.push({id: i});
                this.DataAll.find(item => item.id === i).parentNode = 1;
            }
            this.currentEvent = null;
        },
        linkPre(e, i) {
            this.setInitRect();
            this.currentEvent = 'dragLink';
            this.choice.index = i;
            this.setDragLinkPostion(e, true);
            e.preventDefault();
            e.stopPropagation();
        },
        dragIng(e) {
            if (this.currentEvent === 'dragPane') {
                this.setDragFramePosition(e);
                // 模拟框随动
            }
        },
        dragEnd(e) {
            // 拖动结束
            // if (this.currentEvent === 'dragPane') {
            //     this.dragFrame = {dragFrame: false, posX: 0, posY: 0};
            //     this.setPanePosition(e); // 设定拖动后的位置
            // }
            this.currentEvent = null; // 清空事件行为
        },
        setPanePosition(e) {
            const x = e.x - this.initPos.left - 90;
            const y = e.y - this.initPos.top - 15;
            const i = this.choice.index;
            this.DataAll[i].translate = {left: x, top: y};
        },
        dragLinkPath() {
            if (this.currentEvent === 'dragLink') {
                const {fromX, fromY, toX, toY} = this.dragLink;
                return `M ${fromX} ${fromY}  Q ${fromX} ${(fromY + toY) / 2} ${(toX +
                    fromX) /
                    2} ${(fromY + toY) / 2} T ${toX} ${toY}`;
            } else {
                return 'M 0 0 T 0 0';
            }
        },
        computedLink(i, each, n) {
            const {left, top} = this.DataAll[i].translate; // 起点位置
            const aimObj = this.DataAll.find(item => item.id === each.id).translate; // 终点坐标
            /**
       * 关于贝塞尔曲线坐标公式直接看
       * https://brucewar.gitbooks.io/svg-tutorial/15.SVG-path%E5%85%83%E7%B4%A0.html
       * path里关于贝塞尔的部分
       * step5 整合以后的计算公式更清晰, 此处可以跳过
       */
            return `M 90 30  Q 90 ${(aimObj.top - top + 30) / 2} ${(aimObj.left -
                left +
                180) /
                2} ${(aimObj.top - top + 30) / 2} T ${aimObj.left -
                left +
                90} ${aimObj.top - top}`;
        }
    }
};
</script>
<style lang="less" scoped>
    .svg-each {
        position: relative;
    }
    .pane-node-content {
        width: 180px;
        height: 30px;
        background-color: hsla(0, 0%, 100%, 0.9);
        border: 1px solid #289de9;
        border-radius: 15px;
        font-size: 12px;
        -webkit-transition: background-color 0.2s;
        transition: background-color 0.2s;
        box-sizing: border-box;
        .icon {
            width: 26px;
            height: 26px;
            margin: 1px;
            border-radius: 100%;
            float: left;
            color: #fff;
            font-size: 16px;
            background-color: #289de9;
            cursor: pointer;
        }
        .name {
            float: left;
            margin-left: 2px;
            width: 135px;
            height: 28px;
            line-height: 28px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
            color: green;
        }
        .parent-link {
            font-size: 0;
            height: 12px;
            width: 12px;
            position: absolute;
            top: 0;
            left: 90px;
            transform: translateX(-50%);
            border-top: 6px solid black;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        .parent-ring {
            font-size: 0;
            height: 10px;
            width: 10px;
            position: absolute;
            top: 0;
            left: 90px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            border: 1px solid #fff;
            background: green;
        }
        .child-link {
            height: 10px;
            width: 10px;
            position: absolute;
            bottom: 0;
            left: 90px;
            transform: translate(-50%, 50%);
            border-radius: 50%;
            border: 1px solid #fff;
            background: green;
            cursor: crosshair;
        }
    }
    .selected {
        background: rgba(227, 244, 255, 0.9) !important;
    }
    .connector {
        stroke: #fff;
        stroke-width: 2px;
        fill: none;
    }
    .drag-frame {
        .drag-frame-area {
            width: 180px;
            height: 30px;
            background-color: hsla(0, 0%, 100%, 0.9);
            border: 1px dashed black;
            border-radius: 15px;
            font-size: 12px;
            -webkit-transition: background-color 0.2s;
            transition: background-color 0.2s;
        }
    }
    .drag-link-arrows {
        border-top: 6px solid black;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        z-index: -10;
    }
</style>
