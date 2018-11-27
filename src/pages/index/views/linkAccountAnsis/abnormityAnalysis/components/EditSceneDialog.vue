<template>
    <div>
        <sceneModel1 v-if="String(createType)==='1'" :operateType="operateType" :createType="1" :dialogItem="dialogItem" @saveScene="saveScene"></sceneModel1>
        <sceneModel2 v-if="String(createType)==='2'" :operateType="operateType" :createType="2" :dialogItem="dialogItem" @saveScene="saveScene"></sceneModel2>
        <sceneModel3 v-if="String(createType)==='3'" :operateType="operateType" :createType="3" :dialogItem="dialogItem" @saveScene="saveScene"></sceneModel3>
        <sceneModel4 v-if="String(createType)==='4'" :operateType="operateType" :createType="4" :dialogItem="dialogItem" @saveScene="saveScene"></sceneModel4>
    </div>
</template>
<script>
import sceneModel1 from './SceneMode1';
import sceneModel2 from './SceneMode2';
import sceneModel3 from './SceneMode3';
import sceneModel4 from './SceneMode4';
import {
    updateScene,
    createScene
} from '@/api/dataAnsis/sceneConfig';
export default {
    components: {sceneModel1, sceneModel2, sceneModel3, sceneModel4},
    props: {
        createType: {
            type: [Number, String],
            required: true
        },
        operateType: {
            type: [Number, String],
            required: true
        },
        dialogItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        saveScene(ruleForm) {
            if (ruleForm.sceneId) {
                // 编辑
                updateScene(ruleForm).then(() => {
                    this.$emit('updateSceneList');
                });
            } else {
                // 新增
                createScene(ruleForm).then(() => {
                    this.$emit('updateSceneList');
                });
            }
        }
    }
};
</script>
