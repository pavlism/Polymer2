EventBroker.listen("mrp-text-box_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-text-box> was changed, this listener will fire for any <mrp-text-box> that does not have a class or id');
    console.log(triggerArgs);
});

EventBroker.listen("sample_mrp-text-box_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-text-box> was changed with the id = sample');
    console.log(triggerArgs);
});

EventBroker.listen("sampleClass_mrp-text-box_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-text-box> was changed with the class = sampleClass, this listener will fire for any <mrp-text-box>s with this class.');
    console.log(triggerArgs);
});