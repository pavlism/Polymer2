EventBroker.listen("mrp-button_clicked", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-button> was clicked, this listener will fire for any <mrp-button> that does not have a class or id');
    console.log(triggerArgs);
});

EventBroker.listen("sample_mrp-button_clicked", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-button> was clicked with the id = sample');
    console.log(triggerArgs);
});

EventBroker.listen("sampleClass_mrp-button_clicked", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-button> was clicked with the class = sampleClass, this listener will fire for any <mrp-button>s with this class.');
    console.log(triggerArgs);
});
