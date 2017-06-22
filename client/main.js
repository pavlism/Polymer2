import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/*

Template.clearFilterButton.onRendered(function () {
    EventBroker.listen("clearFilters", function(){
        alert("Event Triggered: clearFilters");
    });
});

Template.statusChangeBar.helpers({
    buttons: function () {
        var buttons = [];
        buttons.push({newStatus:4,text:'Approve'});
        buttons.push({newStatus:5,text:'Reject'});
        buttons.push({newStatus:6,text:'Delete'});
        return JSON.stringify(buttons);
    }
});

Template.statusChangeBar.helpers({
    user: function () {
        var user = {};
        user.type = "user";
        user.ID = 123;
        return JSON.stringify(user);
    }
});

Template.statusChangeBar.onRendered(function () {
    EventBroker.listen("statusChange_user_123", function(listenArgs, triggerArgs){
        alert("Event Triggered: statusChange_user_123 \n triggerArgs:" + triggerArgs);
    });
});


Template.statusChangeButton.onRendered(function () {
    EventBroker.listen("statusChange_user_123", function(){
        alert("Event Triggered: statusChange_user_123");
    });
});

Template.statusChangeButton.helpers({
    user: function () {
        var user = {};
        user.type = "user";
        user.ID = 123;
        return JSON.stringify(user);
    }
});

Template.testButton.helpers({
    buttonText: function () {
        return "example 2";
    }
});

Template.testComp.helpers({
    compText: function () {
        return "example 2";
    }
});

*/