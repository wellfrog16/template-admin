<template>
    <div>
        <sceneModel1 v-if="String(createType)==='1'" :confirmCommitMode="confirmCommitMode" :operateType="operateType" :dialogItem="dialogItem" @updateSceneList="updateSceneList"></sceneModel1>
        <sceneModel2 v-if="String(createType)==='2'" :confirmCommitMode="confirmCommitMode" :operateType="operateType" :dialogItem="dialogItem" @updateSceneList="updateSceneList"></sceneModel2>
        <sceneModel3 v-if="String(createType)==='3'" :confirmCommitMode="confirmCommitMode" :operateType="operateType" :dialogItem="dialogItem" @updateSceneList="updateSceneList"></sceneModel3>
        <sceneModel4 v-if="String(createType)==='4'" :confirmCommitMode="confirmCommitMode" :operateType="operateType" :dialogItem="dialogItem" @updateSceneList="updateSceneList"></sceneModel4>
    </div>
</template>
<script>
import sceneModel1 from './SceneMode1';
import sceneModel2 from './SceneMode2';
import sceneModel3 from './SceneMode3';
import sceneModel4 from './SceneMode4';
export default {
    components: {sceneModel1, sceneModel2, sceneModel3, sceneModel4},
    props: {
        createType: {
            type: [Number, String],
            required: true
        },
        confirmCommitMode: {
            type: Boolean,
            default: false
        },
        operateType: {
            type: Number,
            required: true
        },
        dialogItem: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>
