Template.layout.onCreated(function (){
});
Template.layout.onRendered(function (){
});
Template.layout.helpers({

});
Template.layout.events({
    "click .logout-btn": function(e,t){
        e.preventDefault();
        Meteor.logout();
    }
})


Template.sideBar.onRendered(function (){
    Meteor.defer(function (){
        app.sideBar();
        app.init();
    })
})

Template.navBar.onRendered(function (){
    Meteor.defer(function (){
        app.init();
    })
})
