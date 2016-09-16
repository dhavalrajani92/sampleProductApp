Template.login.onCreated(function () {

});

Template.login.onRendered(function () {
    $("#frmLogin").parsley({ trigger: 'blur' });
});

Template.login.events({
    "submit #frmLogin": function (e,t) {
        e.preventDefault();
        getValues($(e.currentTarget), function (values) {
            Meteor.loginWithPassword({username:values.username},values.password,function (err,res){
                if(err){
                    toastr.clear();
                    toastr.error(err.reason);
                }
            });
        })
    }
})