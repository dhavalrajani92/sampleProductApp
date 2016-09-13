Session.setDefault("productVariants",[]);
Session.setDefault("categoryCode","")
Template.addProduct.onCreated(function () {
    Session.set("categoryCode","")
    var productVariants = [{
        "quantity":"",
        "size":""
    }]
    Session.set("productVariants",productVariants);

});
Template.addProduct.onRendered(function () {
    $("#frmAddProduct").parsley({ trigger: 'blur' });
    this.find(".parentClass")._uihooks = {
        insertElement: function (node, next) {

            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn(function () {

                });
            app.paperInput();
        },
        removeElement: function (node) {

            $(node)
                .hide()
                .fadeOut(function () {
                    $(this).remove();
                });
        }
    }
});

Template.productAddForm.helpers({
    getProductVariants: function () {
        return Session.get("productVariants");
    },
    getVariations: function () {
        var categoryCode = Session.get("categoryCode");
        if(categoryCode != ""){
            var index = categories.findIndex(function (d) {
                if(d.code == categoryCode){
                    return d
                }
            }) ;
            if(index != -1){
                return categories[index].variations;
            }
        }
    }
})

Template.addProduct.events({
    "submit #frmAddProduct": function (e,t) {
        e.preventDefault();
    },
    "click #addRow": function (e,t) {
        e.preventDefault();
        var productVariants = Session.get("productVariants");
        productVariants.push({
            "quantity":"",
            "size":""
        });
        Session.set("productVariants",productVariants);
    },
    "click .removeRow": function (e,t) {
        e.preventDefault();
        var index = $(e.currentTarget).data("index");
        if(index > -1){
            var productVariants = Session.get("productVariants");
            var data = productVariants.splice(index,1);
            Session.set("productVariants",data);
        }
    },
    "submit #frmAddProduct": function (e,t) {
        e.preventDefault();
        getValues($(e.currentTarget), function (values) {
            if(values){
                var finalObject = {};
                finalObject = values;
                finalObject.variations = [];
                _.each(finalObject.quantity,function (value,index) {
                    finalObject.variations.push({
                        "quantity": value,
                        "size": values.size[index]
                    })
                });
                delete finalObject.quantity;
                delete finalObject.size;
                Meteor.call("addProduct",finalObject,function (err,res) {
                    if(!err){
                        $("#frmAddProduct")[0].reset();
                        toastr.clear();
                        toastr.success("Product added successfully");
                    }else{
                        toastr.clear();
                        toastr.error(err.reason);
                    }
                })
            }
        })
    },
    "click #btnCancel": function (e,t) {
        e.preventDefault();
        Router.go("productListings");
    },
    "change [name='category']": function (e,t) {
        e.preventDefault();
        Session.set("categoryCode",$(e.currentTarget).val());
    }
})