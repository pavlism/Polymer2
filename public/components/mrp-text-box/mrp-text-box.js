/* V0.1
 * 
 * The alert box can be turn on and off.  turn it on displays and it and turning it off hides it.
 * To turn the box on or off you can data bind a Boolean to the toggle property.  False for off and true for on.
 * Alternatively, you can set the onEvent and offEvents.  When the onEvent is triggered the altert will appear.
 * The off event will then hide the alert.
 * You can also use the timer property.  The timer is a number, it will automatically close an alert after the timer values in second has passed.
 * 
 */


class MRPTextBox extends Polymer.Element {
    static get is() {
        return  'mrp-text-box';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},                                      //The ID of the element
            class: {type: String, value: ''},                                   //The class of the element
            maxlength: {type: Number, value: -1},                               //The maxlength of the <input>
            value: {type: String, value: '', observer: 'changed', reflectToAttribute:true},
                                                                                //If not blank this will be the default value of the text box
            regex: {type: String, value: ''},                                   //The regex expression that text of the text box will ba validation against
            placeholder: {type: String, value: ''},                             //The placeholder of the <input>
            validation: {type: Number, value: -1, reflectToAttribute: true, observer: 'validationReset'},
                                                                                //This value will represent the validation status of the element. 0=invalid, 1=valid, -1=default.
            errorMsg: {type: String, value: ''},                                //The message displayed when the validation fails.
            required: {type: Boolean, value:false}                              //If true and empty textbox will not be considered valid, if false, then the element will not test it's validation until it's value it changed
        };
    }
    isInvalid(validation) {
        //Check the validation status of the properties so it can display  or hide the error message
        if (validation === 0) {
            return true;
        } else {
            return false;
        }
    }
    changed(event) {
        //The text is changed then trigger the changed event and check the validation
        if (event.type === "blur") {
            var value = this.get('value');
            this.checkValidation(this.get('validation'), true);
            var triggerObj = {textBox: this, event: event, text:value};
            Lib.Polymer.triggerEventsWithTable(this,triggerObj, 'mrp-text-box_changed');
        }
    }
    validationReset(validation){
        //This will cause the validation to run again
        if(validation ===2){
            this.checkValidation(validation, true);
        }
    }
    checkValidation(validation, isNotStart = false) {
        //This will check the validation against the regex property, also if the required property is true
        //the text box must has some text, or the validation will fail.
        if (isNotStart || validation !== -1) {
            if (this.get('regex') !== '') {
                var text = $(this).val();
                var res = text.match(this.get('regex'));
                if (res === null) {
                    //validation failed
                    //display error message
                    this.set('validation', 0);
                } else {
                    this.set('validation', 1);
                }
            } else {
                this.set('validation', 1);
            }
        }
        if(!this.get('required') && $(this).val()===''){
            this.set('validation', 1);
        }
    }
}
customElements.define(MRPTextBox.is, MRPTextBox);