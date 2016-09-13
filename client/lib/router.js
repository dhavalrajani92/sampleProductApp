//Iron-router global configuration
Router.configure({
    notFoundTemplate: "notFound"
});
var loginrequired = function (req, res, next) {
    if (!Meteor.userId()) {
        Router.go("login");
        this.next();
        return;
    }else{
        this.next();
    }
};

var goToDashboard = function () {
    if(Meteor.userId()){
        Router.go("/home");
        this.next();
        return;
    }else{
        this.next();
    }
}

Router.onBeforeAction(loginrequired, {
    except: ['login','signUp']
});
Router.onBeforeAction(goToDashboard, {
    only: ['login','signUp']
});
Router.map(function () {
    this.route('login', {path: '/',layoutTemplate:"layout"});
    this.route('signUp', {path: '/sign-up',layoutTemplate:"layout"});
    this.route('home', {path: '/home',layoutTemplate:"layout"});
    this.route('productListings', {path: '/product-listings',layoutTemplate:"layout"});
    this.route('addProduct', {path: '/add-product',layoutTemplate:"layout"});
    this.route('viewProduct', {path: '/view-product/:_id',layoutTemplate:"layout",waitOn: function () {
        return [
            Meteor.subscribe("subProducts",{_id:this.params._id})
        ]
    },
    data: function () {
        if(this.ready()){
            return {
                productData: Collections.Products.findOne(this.params._id)
            }
        }
    }});
});