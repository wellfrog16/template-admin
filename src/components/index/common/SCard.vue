<template>
    <el-card class="self-card-component"
             v-loading="loading"
             element-loading-text="数据加载中，请耐心等待..."
             element-loading-background="rgba(0,0,0,0.3)">
        <div slot="header" class="card-header">
            <div class="header-left">
                <span><i :class="icon"></i>{{ title }}</span>
                <span class="sub-title" v-if="subTitle">{{ subTitle }}</span>
                <span v-if="canCollose" class="collose-icon">
                    <i class="el-icon-arrow-up" v-if="show" @click="toggleIcon"></i>
                    <i class="el-icon-arrow-down" v-else @click="toggleIcon"></i>
                </span>
            </div>
            <div class="header-right">
                <slot name="right"></slot>
            </div>
        </div>
        <slot name="content" v-if="show"></slot>
    </el-card>
</template>
<script>
export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subTitle: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        canCollose: {
            type: Boolean,
            default: true
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toggleIcon() {
            this.show = !this.show;
        }
    }
};
</script>
<style lang="less" scoped>
    .self-card-component {
        box-shadow: 0 0 10px rgba(31, 82, 170, 0.75);
        margin-bottom: 15px;
        /deep/.el-card__header {
            background: url('../../../assets/img/usr/card_header_bg.png') no-repeat left bottom;
            background-size: 200px;
        }
        .card-header {
            display: flex;
            .header-left {
                flex: 1;
                text-align: left;
                line-height: 40px;
                .sub-title {
                    font-size: 12px;
                    margin-left: 10px;
                    color: #e6b820ed;
                }
            }

            .header-right {
                flex: 1;
                text-align: right;
            }
            .collose-icon {
                margin-left: 15px;
                cursor: pointer;
                i {
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }
    }

</style>
