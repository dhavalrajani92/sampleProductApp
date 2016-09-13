Meteor.publish("subProducts", function (query,findOptions) {
    Counts.publish(this, 'totalProducts', Collections.Products.find());
    var condition = query || {};
    var objFindOptions = findOptions || {};

    return Collections.Products.find(condition,objFindOptions);
})