var list = new ReactiveArray();

Template.MRPDropDown.onRendered(function () {

    list.length = 0;
    list.push('SQL');
    list.push('Java');
    list.push('Java Script');
    list.push('C#');
    list.push('Python');
    list.push('C++');
    list.push('PHP');
    list.push('IOS');
    list.push('Ruby');
});

Template.MRPDropDown.helpers({
    list: function () {
        return JSON.stringify(list.toArray());
    }
});

EventBroker.listen("mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-drop-down> was changed, this listener will fire for any <mrp-drop-down> that does not have a class or id');
    console.log(triggerArgs);
});

EventBroker.listen("sample_mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-drop-down> was changed with the id = sample');
    console.log(triggerArgs);
});

EventBroker.listen("sampleClass_mrp-drop-down_changed", function (listenerArgs, triggerArgs) {
    console.log('A <mrp-drop-down> was changed with the class = sampleClass, this listener will fire for any <mrp-drop-down>s with this class.');
    console.log(triggerArgs);
});