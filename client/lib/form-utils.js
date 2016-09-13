//Common functions which will use project wise

/**
 * Name: getValues
 * Description: Get the values of submitted form
 * @param formObject
 * @param submitCallback
 */
this.getValues = function (formObject, submitCallback) {
    var values = {};
    formObject.find("input,select,textarea").each(function () {
        var inputObject = $(this);
        var fieldName = inputObject.attr("name");
        var fieldValue = $.trim(inputObject.val());
        if (inputObject.attr("type") == "checkbox") {
            // auto set data type for checkbox
            if (!inputObject.attr("data-type")) {

                // single checkbox with that name means dataType="BOOL" else it is "ARRAY"
                if (formObject.find("input[name='" + fieldName + "']").length == 1 && !inputObject.attr("data-custom")) {
                    dataType = "BOOL";
                }
                else {
                    dataType = "ARRAY";
                }
            }
            if (dataType == "BOOL") fieldValue = inputObject.is(":checked");
            if (dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "off";
            if (dataType == "ARRAY") {
                if ($.isArray(values[fieldName]) && values[fieldName].length != 0) {
                    if (fieldValue != "") {
                        values[fieldName].push(fieldValue)
                    }
                } else {
                    values[fieldName] = [];
                    if (fieldValue != "") {
                        values[fieldName].push(fieldValue)
                    }

                }
            } else {
                values[fieldName] = fieldValue;
            }

        } else if (inputObject.attr("type") == "radio") {
            if (inputObject.is(":checked")) {
                values[fieldName] = $.trim(fieldValue);
            }
        } else {
            if(!inputObject.attr("data-custom") ){
                values[fieldName] = $.trim(fieldValue);
            }else{
                dataTypeInput = "ARRAY";
                if(dataTypeInput == "ARRAY"){
                    if ($.isArray(values[fieldName]) && values[fieldName].length != 0) {
                        values[fieldName].push($.trim(fieldValue))

                    } else {
                        values[fieldName] = [];

                        values[fieldName].push($.trim(fieldValue))


                    }
                }else{
                    values[fieldName] = $.trim(fieldValue);
                }
            }

        }
    });
    if (submitCallback) {
        submitCallback(values);
    }

};

//validation json
validationJSON = [{
    selector: ".validationRequired",
    attributes: [{
        name: "data-parsley-required",
        value: true
    }, {
        name: "data-parsley-required-message",
        value: function() {
            var message = "This field is required";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].requiredmessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].requiredmessage;
            }
            return message;
        }
    }]
}, {
    selector: ".validationType",
    attributes: [{
        name: "data-parsley-type-message",
        value: function() {
            var message = "Please enter valid data";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].typemessage;
            }
            return message;
        }
    }]
}, {
    selector: ".validationEqualTo",
    attributes: [{
        name: "data-parsley-equalto",
        value: function() {
            return $(this).attr("euqalTo");
        }
    }, {
        name: "data-parsley-equalto-message",
        value: function() {
            var message = "Please enter data with euqalTo field";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].euqalToMessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].euqalToMessage;
            }
            return message;
        }
    }]
}, {
    /* dependency : app.js > getParsleyGreaterThanValidator() */
    selector: ".validationGreaterThan",
    attributes: [{
        name: "data-parsley-greaterthan",
        value: function() {
            return $(this).attr("greaterThan");
        }
    }, {
        name: "data-parsley-greaterthan-message",
        value: function() {
            var message = "Please enter data with greaterThan field";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].greaterthanmessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].greaterthanmessage;
            }
            return message;
        }
    }]
}, {
    /* dependency : app.js > getParsleyLessThanValidator() */
    selector: ".validationLessThan",
    attributes: [{
        name: "data-parsley-lessthan",
        value: function() {
            return $(this).attr("lessThan");
        }
    }, {
        name: "data-parsley-lessthan-message",
        value: function() {
            var message = "Please enter data with lessThan field";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].lessthanmessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].lessthanmessage;
            }
            return message;
        }
    }]
}, {
    selector: ".validationNumber",
    attributes: [{
        name: "data-parsley-type",
        value: "number"
    }, {
        name: "data-parsley-type-message",
        value: function() {
            var message = "Please enter valid number";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].typemessage;
            }
            return message;
        }
    }]
}, {
    selector: ".validationMinLength",
    attributes: [{
        name: "data-parsley-minlength",
        value: function() {
            return $(this).attr("minLength");
        }
    }, {
        name: "data-parsley-minlength-message",
        value: function() {
            var message = "Please enter minimum " + $(this).attr("minLength") + " characters";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].minLengthMessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].minlengthMessage;
            }
            return message;
        }
    }]
}, {
    selector: ".validationMaxLength",
    attributes: [{
        name: "data-parsley-maxlength",
        value: function() {
            return $(this).attr("maxLength");
        }
    }, {
        name: "data-parsley-maxlength-message",
        value: function() {
            var message = "Please enter maximum " + $(this).attr("maxLength") + " characters";
            if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].maxLengthMessage != "undefined") {
                message = errorMessages[$(this).attr("Name")].maxLengthMessage;
            }
            return message;
        }
    }]
},
    {
        selector: ".validationNumberInteger",
        attributes: [{
            name: "data-parsley-type",
            value: "integer"
        }, {
            name: "data-parsley-type-message",
            value: function() {
                var message = "Please enter valid integer number";
                if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") {
                    message = errorMessages[$(this).attr("Name")].typemessage;
                }
                return message;
            }
        }]
    },
    {
        selector: ".validationUrl",
        attributes: [{
            name: "data-parsley-type",
            value: "url"
        }, {
            name: "data-parsley-type-message",
            value: function() {
                var message = "Please enter valid url";
                if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") {
                    message = errorMessages[$(this).attr("Name")].typemessage;
                }
                return message;
            }
        }]
    },
    {
        selector: ".validationPattern",
        attributes: [{
            name: "data-parsley-pattern",
            value: function() {
                return $(this).attr("data-pattern");
            }
        }, {
            name: "data-parsley-pattern-message",
            value: function() {
                var message = "Please enter valid " + $(this).attr("Name");
                if (typeof errorMessages[$(this).attr("Name")] != "undefined" && typeof errorMessages[$(this).attr("Name")].typemessage != "undefined") {
                    message = errorMessages[$(this).attr("Name")].typemessage;
                }
                return message;
            }
        }]
    }];

errorMessages = {};