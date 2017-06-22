var defaultButton = new ReactiveObject({val:0});
var toggleID = new ReactiveObject({val:0});

Template.MRPAlert.onRendered(function () {
    EventBroker.listen("toggleBasic_mrp-button_clicked", function (listenerArgs, triggerArgs) {
        if(defaultButton.val ===0){
            defaultButton.val =1;
        }else{
            defaultButton.val = 0;
        }
    });
    
     EventBroker.listen("toggleID_mrp-button_clicked", function (listenerArgs, triggerArgs) {
        if(toggleID.val ===0){
            toggleID.val =1;
        }else{
            toggleID.val = 0;
        }
    });
    
    EventBroker.listen("sample_mrp-alert_closed", function (listenerArgs, triggerArgs) {
        console.log('An alert was clsed with the id of sample');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("mrp-alert_closed", function (listenerArgs, triggerArgs) {
        console.log('An alert was clsed');
        console.log(triggerArgs);
    });

   
});

Template.MRPAlert.helpers({
    defaultButton: function () {
        return JSON.stringify(defaultButton.val);
    },
    toggleID: function () {
        return JSON.stringify(toggleID.val);
    }
});