//Parsely global config
window.ParsleyConfig = {
    errorTemplate: '<span></span>',
    errorsWrapper: '<span></span>',
    errorClass: 'has-error',
    successClass: '',
    trigger: 'blur',
    errorsContainer: function (pEle) {
        var $err = pEle.$element.siblings('.has-error-text');
        return $err;
    },
    classHandler: function (el) {
        return el.$element.parent();
    }
};
pageSession = new ReactiveDict();
pageSessionSuccessMsgFlag = false;
pageSessionUpdateMsgFlag = false;
pageSessionDeleteMsgFlag = false;
// Global helpers which used project wide
/**
 * Name: radioIsSelected
 * Description: Global helper to display radio button selected
 * params1: val
 * description: pass value which is from database or dynamic value
 * return: checked if true else return null
 */
Handlebars.registerHelper('radioIsSelected', function (val) {
    if (val)
        return 'checked';
    else
        return '';
});

/**
 * Name: selected
 * Description: Global helper to display option selected
 * @params1: desiredValue
 * Description:  pass value of each loop value datatype string
 * @params2: itemValue
 * Description:  pass value of database stored value or dynamic value datatype string
 * return: selected of desiredValue is equel to Item value
 */

Handlebars.registerHelper('selected', function(desiredValue, itemValue) {
    if (!desiredValue && !itemValue) {
        return ""
    };
    if (_.isArray(desiredValue)) {
        return desiredValue.indexOf(itemValue) >= 0 ? "selected" : "";
    }
    return desiredValue == itemValue ? "selected" : "";
});

Handlebars.registerHelper('paperInput', function() {
    Meteor.defer(function (){
        app.paperInput();
    })
});

Handlebars.registerHelper('loadFormValidationMessage', function () {
    Meteor.defer(function () {
        for (var i = 0; i < validationJSON.length; i++) {
            var items = $(validationJSON[i].selector);
            for (var j = 0; j < validationJSON[i].attributes.length; j++) {
                items.attr(validationJSON[i].attributes[j].name, validationJSON[i].attributes[j].value);
            }
        }
    });
    return "";
});
Handlebars.registerHelper('errorMessage', function (ERRORS_KEY) {
    return _.values(pageSession.get(ERRORS_KEY));
});
Handlebars.registerHelper('errorMessageType', function (ERRORS_KEY) {
    return _.keys(pageSession.get(ERRORS_KEY));
});
Handlebars.registerHelper('default_avtar', function (email,size) {
    if(size == undefined){
        size = 40;
    }
    var option = {
        size: size,
        default: 'mm'
    }
    return url = Gravatar.imageUrl(email,option);

});

Handlebars.registerHelper('usernameexitscheck', function(){
    if(Session.get("usernamechecking") != ""){
        if(Session.get("usernamechecking") == 0){
            return "checking...."
        }else if(Session.get("usernamechecking") == 1){
            return "Available...."
        }else{
            return "Already Exists";
        }
    }
});

Handlebars.registerHelper('menuItemClass', function (routeName) {
    if (!Router.current() || !Router.current().route) {
        return "";
    }

    if (!Router.routes[routeName]) {
        return "";
    }
    var currentPath = Router.routes[Router.current().route.getName()].handler.path;
    var routePath = Router.routes[routeName].handler.path;
    return currentPath == routePath ? "active" : "";
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper("getProductCategories",function () {
    return categories;
});
Template.registerHelper("getCategory",function (code) {
    var index = categories.findIndex(function (d){
        if(d.code == code){
            return d;
        }
    });
    if(index != -1){
        return categories[index].name;
    }
});