class MRPAlert extends Polymer.Element {
    //The alert is a simple alert window that looks nicer.  It can be triggered through data-binding, or events.
    //A timer can also be used to turn of the alert after a certain number of seconds.
    
    static get is() {
        return  'mrp-alert';
    }
    static get properties() {
        return {
            title: {type: String, value: 'title'},
            message: {type: String, value: 'message'},
            timer: {type: Number, value: -1},
            toggle: {type: Number, observer: 'handleToggle'},   //Used to data-bind the alert to be on of off.
            onEvent: {type: String, observer: 'setupOnEvent'},
            offEvent: {type: String, observer: 'setupOffEvent'},
            timeOut: {type: Number, value: -1}, //Used to keep track of the setTimeout number
            id: {type: String, value: ''}
        };
    }
    setupOnEvent(eventName) {
        //creates a listener function that will listend to the onEvent, and when triggered it will display the alert.
        if (Lib.JS.isDefined(eventName) && eventName !== '') {
            EventBroker.listen(eventName, this, function (listenerArgs, triggerArgs) {
                listenerArgs.set('toggle', 1);
            });
        }
    }
    setupOffEvent(eventName) {
        //creates a listener function that will listend to the offEvent.
        if (Lib.JS.isDefined(eventName) && eventName !== '') {
            EventBroker.listen(eventName, this, function (listenerArgs, triggerArgs) {
                listenerArgs.set('toggle', 0);
            });
        }
    }

    connectedCallback() {
        //Called when the element is added to a document.
        //Used to makes sure the elements starts off hidden.
        super.connectedCallback();
        if (this.get('toggle') !== 1) {
            $(this).hide();
        }
    }
    handleToggle(toggle) {       
        //Turn off the timer if it's set
        if (this.get('timeout') !== -1) {
            clearTimeout(this.get('timeout'));
            this.set('timeout', -1);
        }
        
        if (toggle) {
            var thisObj = this;
            $(this).fadeIn();
            
            //check the timer
            var timer = this.get('timer') * 1000;
            if (timer > 1) {
                var timeout = setTimeout(function () {
                    //hide the element
                    thisObj.set('toggle', 0);
                    EventBroker.trigger("mrp-alert_closed", {button: thisObj});
                }, timer);
                this.set('timeout', timeout);
            }
        } else {
            //$(this).fadeOut();
            $(this).hide();
        }
    }
    handleClick(event) {
        //When clicked hide the alert element
        this.set('toggle', 0);        
        var id = this.id;
        if (!Lib.JS.isDefined(id)) {
            id = '';
        }
        
        var triggerObj = {alert: this, event: event};

        if (id === '') {
            EventBroker.trigger("mrp-alert_closed", triggerObj);
        } else {
            EventBroker.trigger(id + "_mrp-alert_closed", triggerObj);
        }
    }
}
customElements.define(MRPAlert.is, MRPAlert);