exports.createRefObject = (data, docs) => {
    return data.reduce((refs, datum, i) => {
        ref[datum.id] = docs[i]._id;
        return refs;
    }, {});
};

exports.formatArticleData = (articlesData, userDocs) => {
    return articlesData.map(article => {
        const belongs_to = article.topic;
        const created_by = userDocs.find(user => user.username === article.created_by)._id;
        return { ...article, belongs_to, created_by };
    });
};

exports.formatCommentData = (commentData, articleDocs, userDocs) => {
    return commentData.map(comment => {
        const belongs_to = articleDocs.find(article => article.title === comment.belongs_to)._id;
        const created_by = userDocs.find(user => user.username === comment.created_by)._id;
        return { ...comment, belongs_to, created_by };
    });
};