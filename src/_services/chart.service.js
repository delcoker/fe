import {axiosWrapper} from '../_helpers';

export const chartService = {
    getCollectedConversations,
    getCollectedSentimentTypes,
    getIssueImportance,
    getIssueSeverity,
    getHighLights,
    getWordCloud,
    getChartById,
    create,
    update,
    delete: _delete,
};

// total daily collected conversations,
// total daily sentiment by positive or negative count
// total daily sentiment by positive or negative percentage

const apiRoute = `/graphs`;

function getCollectedConversations(params) {
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/collected_conversations`, requestData);
}

function getIssueSeverity(params) {
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/issue_severity`, requestData);
}

function getIssueImportance(params) {
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);

    return axiosWrapper.post(`${apiRoute}/issue_importance`, requestData);
}

function getCollectedSentimentTypes(params) {
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);
    requestData.append("granularity", params.granularity);

    return axiosWrapper.post(`${apiRoute}/collected_sentiment_types`, requestData);
}

function getHighLights(params) {
    let requestData = new FormData();
    requestData.append("start_date", params.start_date);
    requestData.append("end_date", params.end_date);

    return axiosWrapper.post(`${apiRoute}/highlights`, requestData);
}

function getWordCloud(params) {
    let requestData = new FormData();
    return axiosWrapper.get(`${apiRoute}/wordcloud`, requestData);
}

function getChartById(chart_id) {
    return axiosWrapper.post(`${apiRoute}`, chart_id);
}

function create(params) {
    let requestData = new FormData();
    requestData.append("category_name", params.name.trim());
    requestData.append("group_category_id", params.group_category_id);
    requestData.append("keywords", params.keywords.trim());

    return axiosWrapper.post(`${apiRoute}/create`, requestData);
}

function update(params) {
    let requestData = new FormData();
    requestData.append("category_name", params.name.trim());
    requestData.append("group_category_id", params.group_category_id);
    requestData.append("keywords", params.keywords.trim());

    return axiosWrapper.post(`${apiRoute}/update/${params.category_id}`, requestData);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(ids) {
    const deleted = ids.map(id => Promise.allSettled([axiosWrapper.post(`${apiRoute}/delete/${id}`)]));
    // console.log(deleted);
    if (deleted.length === ids.length) {
        return deleted;
    }
}