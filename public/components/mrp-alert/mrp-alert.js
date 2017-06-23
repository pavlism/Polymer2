/* V0.11
 * 
 * The alert box can be turn on and off.  turn it on displays and it and turning it off hides it.
 * To turn the box on or off you can data bind a Boolean to the toggle property.  False for off and true for on.
 * Alternatively, you can set the onEvent and offEvents.  When the onEvent is triggered the altert will appear.
 * The off event will then hide the alert.
 * You can also use the timer property.  The timer is a number, it will automatically close an alert after the timer values in second has passed.
 * 
 */

class MRPAlert extends Polymer.Element {
    static get is() {
        return  'mrp-alert';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},                                      //The ID of the element
            title: {type: String, value: 'title'},                              //The title of the alert box
            message: {type: String, value: 'message'},                          //The message inside the alert box
            timer: {type: Number, value: -1},                                   //If set when the alert is displayed a timer will be created to hide the alert after the timer value in seconds
            toggle: {type: String, observer: 'handleToggle', value:'false'},    //Can be data-bound to turn the alert on/off, false=off, true=on
            onEvent: {type: String, observer: 'setupOnEvent'},                  //An eventName, when triggered it will disaply the alert
            offEvent: {type: String, observer: 'setupOffEvent'},                //An eventName, when triggered it will hide the alert
            timeOut: {type: Number, value: -1}                                  //Will hold the window.setTimeout() value, -1 if no timer set
        };
    }
    setupOnEvent(eventName) {
        //If the onEvent property is set, then this creates a listener function to display the alert message that listens for the onEvent value
        if (Lib.JS.isDefined(eventName) && eventName !== '') {
            EventBroker.listen(eventName, this, function (listenerArgs, triggerArgs) {
                listenerArgs.set('toggle', 'true');
            });
        }
    }
    setupOffEvent(eventName) {
        //If the offEvent property is set, then this creates a listener function to hide the alert message that listens for the offEvent value
        if (Lib.JS.isDefined(eventName) && eventName !== '') {
            EventBroker.listen(eventName, this, function (listenerArgs, triggerArgs) {
                listenerArgs.set('toggle', 'false');
            });
        }
    }

    connectedCallback() {
        //Called when the element is added to a document.
        super.connectedCallback();
        if (this.get('toggle').toLowerCase() === 'false') {
            //used to hide the alert box on startup
            $(this).hide();
        }
    }
    handleToggle(toggle) {
        //turn off the windows.setTimeout() is set
        if (this.get('timeout') !== -1) {
            clearTimeout(this.get('timeout'));
            this.set('timeout', -1);
        }
        
        //If toggles to be one then disaplay the message       
        if (toggle.toLowerCase() === 'true') {
            var thisObj = this;
            $(this).fadeIn();
            var timer = this.get('timer') * 1000;
            if (timer > 1) {
                //if a timer value has been set then create the window.setTimeout() event to close the event
                var timeout = setTimeout(function () {
                    thisObj.set('toggle', 'false');
                    EventBroker.trigger("mrp-alert_closed", {button: thisObj});
                }, timer);
                this.set('timeout', timeout);
            }
        } else {
            //If not the hide the alert
            //$(this).fadeOut();
            $(this).hide();
        }
    }
    handleClick(event) {
        //If the alert is clicked close it
        this.set('toggle', 'false');        
        var id = this.id;
        if (!Lib.JS.isDefined(id)) {
            id = '';
        }
        
        var triggerObj = {alert: this, event: event};

        //Trigger the closed events
        if (id === '') {
            EventBroker.trigger("mrp-alert_closed", triggerObj);
        } else {
            EventBroker.trigger(id + "_mrp-alert_closed", triggerObj);
        }
    }
}
customElements.define(MRPAlert.is, MRPAlert);