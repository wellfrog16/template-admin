
import {post} from '@/utils/request';

// import config from '@/config';
// 获取关系图谱
export const getKnowledgeMap = params => {
    return post('/api-jena/knowledgemap/getmap', params);
};
export const getKnowledgeTreeMap = params => { // 树形推理图（包含五级）
    return post('/api-agent/operate/exceptionreasonkg/query', params);
};
export const getKnowledgeTreeMapNoArticle = params => { // 树形推理图（不包含五级）
    return post('/api-agent/operate/exceptionreasonkg/querytree', params);
};
export const queryTemplatesList = () => { // 指标模板列表
    return post('/api-agent/operate/indicatorsset/querytemplates', {});
};
export const deleteTemplate = templId => { // 删除指标模板
    return post('/api-agent/operate/indicatorsset/deletetemplate', {templId});
};
export const saveTemplate = params => { // 保存导出指标模板
    return post('/api-agent/operate/indicatorsset/savetemplate', params);
};
export const queryAllInfoByParams = params => { // 根据表单信息进行查询信息
    return post('/api-agent/operate/dynamicsanalysis/queryallinfo', params);
};
// 知识图谱树形详情相关接口
export const createNewChildNode = params => { // 新增子节点
    return post('/api-jena/knowledgeindicatormanage/insertnode', params);
};
export const deleteNodes = params => { // 删除节点及其子节点
    return post('/api-jena/knowledgeindicatormanage/deletenode', params);
};
export const modifyKeywords = params => { // 修改关键词
    return post('/api-jena/knowledgeindicatormanage/updatenode', params);
};
export const settingWarningRules = params => { // 预警配置
    return post('/api-jena/knowledgeindicatormanage/insertindicator', params);
};
export const getSettingWarningRulesById = params => { // 获取预警配置
    return post('/api-jena/knowledgeindicatormanage/getindicator', params);
};
export const getArticleDetailByKeywords = params => { // 根据关键词获取舆情详情
    return post('/api-agent/operate/externalcause/querybykeyword', params);
};

// 舆情列表
export const getArticleList = params => { // 舆情列表
    return post('/api-agent/operate/externalcause/query', params);
};

export const exportArticle = params => { // 导入舆情
    return post('/api-agent/operate/externalcause/saveopinion', params);
};

export const getInnerInfo = params => { // 内因
    return post('/api-agent/operate/dynamicsanalysis/queryinternalinfo', params);
};
export const getOutterInfo = params => { // 外因（情感分析）
    return post('/api-agent/operate/dynamicsanalysis/queryoutternalinfo', params);
};
export const getUnusualReport = params => { // 异常报告
    return post('/api-agent/operate/dynamicsanalysis/queryexceptioninfo', params);
};
export const getArticleDetailByArticleTitle = params => { // 根据id查询舆情详情
    return post('/api-agent/operate/externalcause/getopinion', params);
};
export const updateKeyword = params => { // 修改舆情关键词 (不用)
    return post('/api-agent/operate/externalcause/updatekeyword', params);
};
export const updateArticleItem = params => { // 修改舆情item
    return post('/api-agent/operate/externalcause/update', params);
};
