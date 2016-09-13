Template.signUp.onCreated(function () {

});

Template.signUp.onRendered(function () {
    $("#frmSignup").parsley({ trigger: 'blur' });
});

Template.signUp.events({
    "submit #frmSignup": function (e,t) {
        e.preventDefault();
        getValues($(e.currentTarget), function (values) {
            if(values){
                Meteor.call("createProductAdminUser", values,function (err,res) {
                    if(!err){
                        toastr.clear();
                        toastr.success("Sign up successfully! Please login with same credential");
                    }else{
                        toastr.clear();
                        toastr.error(err.reason);
                    }
                })

            }
        })
    }
})