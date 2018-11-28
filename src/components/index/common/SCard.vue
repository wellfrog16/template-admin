<template>
    <el-card class="self-card-component">
        <div slot="header" class="card-header">
            <div class="header-left">
                <span><i :class="icon"></i>{{ title }}</span>
                <span class="sub-title" v-if="subTitle">{{ subTitle }}</span>
            </div>
            <div class="header-right"><slot name="right"></slot></div>
        </div>
        <slot name="content"></slot>
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
        }
    }
};
</script>
<style lang="less" scoped>
    .self-card-component {
        box-shadow: 0 0 10px #326fcb;
        margin-bottom: 15px;
        .card-header {
            display: flex;

            .header-left {
                flex: 1;
                text-align: left;
                background: url('../../../assets/img/usr/card_header_bg.png') no-repeat left bottom;
                background-size: 200px;

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
        }
    }

</style>
