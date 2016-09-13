var self;
PAGE_LIMIT = 15;
Session.setDefault("pageLimit",PAGE_LIMIT);
Session.setDefault("skipCount",0);
Template.productListings.onCreated(function () {
    Session.set("pageLimit",PAGE_LIMIT);
    Session.set("skipCount",0);
    self = this;
    self.autorun(function () {
        var skip = Session.get("skipCount");
        var limit = Session.get("pageLimit");
        var findOptions = {
            skip: (skip * PAGE_LIMIT)
        };


        if (limit > 0) {
            findOptions.limit = limit;
        }
        console.log(findOptions);
        self.subscribe("subProducts",{},findOptions);
    })
});

Template.productListings.onRendered(function () {

});

Template.productListings.helpers({
    getProductData: function () {
        return Collections.Products.find().fetch();
    },
    moreResults: function () {
        return Counts.get("totalProducts") >= (Session.get("skipCount") * Session.get("pageLimit")) ? false : true
    },
    lessResults: function () {
        return Session.get("skipCount") != 0 ? true : false;
    },
    
});
Template.productListings.events({
    "click #next": function (e,t) {
        e.preventDefault();
        var nextPage = Session.get("skipCount");
        Session.set("skipCount",nextPage + 1);
    },
    "click #previous": function (e,t) {
        e.preventDefault();
        var nextPage = Session.get("skipCount");
        Session.set("skipCount",nextPage - 1);
    }
})