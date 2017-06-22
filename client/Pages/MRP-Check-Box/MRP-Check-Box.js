Template.MRPCheckBox.onRendered(function () {
    EventBroker.listen("mrp-check-box_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-check-box> box was changed, this listener will fire for any <mrp-check-box> that does not have a class or id');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("sample_mrp-check-box_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-check-box> box was changed with the id = sample');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("sampleClass_mrp-check-box_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-check-box> box was changed with the class = sampleClass, this listener will fire for any <mrp-check-box> elements with this class.');
        console.log(triggerArgs);
    });
});