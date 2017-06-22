var list = new ReactiveArray();

Template.MRPDropDown.onRendered(function () {
    EventBroker.listen("mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-drop-down> was changed, this listener will fire for any <mrp-drop-down> that does not have a class or id');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("sample_mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-drop-down> was changed with the id = sample');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("sampleClass_mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
        console.log('A <mrp-drop-down> was changed with the class = sampleClass, this listener will fire for any <mrp-drop-down> elements with this class.');
        console.log(triggerArgs);
    });
   
    list.length = 0;
    list.push('one');
    list.push('2');
    list.push('3');
});

Template.MRPDropDown.helpers({
    list: function () {
        return JSON.stringify(list.toArray());
    }
});