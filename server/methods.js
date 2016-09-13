Meteor.startup(function (){
    var count = Collections.Products.find().fetch();
    if(count == 0){
        for(var i = 0; i< 21; i++){
            Collections.Products.insert({
                "name" : "SHIRT"+i,
                "category" : "SHIRTS",
                "brand" : "PUMA",
                "color" : "White",
                "price" : "1990",
                "variations" : [
                    {
                        "quantity" : "22",
                        "size" : "M"
                    }
                ]
            })

        }
    }

})

Meteor.methods({
    createProductAdminUser: function (option) {
        check(option,Object);
        var user = Accounts.createUser(option);
        return user;
    },
    addProduct: function (productData) {
        check(productData,Object);
        return Collections.Products.insert(productData);
    }
})