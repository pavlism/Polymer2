/* V0.1
 * 
 * This is a simple check box.  It can be checked and disabled like a regular  <input type="checkbox">
 */

class MRPCheckBox extends Polymer.Element {
    static get is() {
        return  'mrp-check-box';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},                                          //The ID of the element
            class: {type: String, value: '', reflectToAttribute: true},             //The class of the element
            disabled: {type: Boolean, value: false},                                //If true then the check box will be disabled
            checked: {type: Boolean, value: false},                                 //If true then the check box will be checked
            tableRow: {type: String, value: ''},                                    //Used if inside a table to keep track of the row number of the table
            boxClass: {type: String, value: 'enabled', reflectToAttribute: true}    //Used to style the box for enabled/disabled modes
        };
    }

    attributeChangedCallback(name, old, value) {
        //Called when any of the element's attributes are changed, appended, removed, or replaced,
        super.attributeChangedCallback(name, old, value);
        
        //setup the disabled/enabled classes
        if(name === "disabled"){
            this.set('boxClass', 'disabled');
        }else if(name==='enabled'){
            this.set('boxClass', 'enabled');
        }
    }
    
    handleClick(event) {
        //If clicked and enabled, set the checked status and trigger the changed event
        if(this.get('disabled')){
            return false;
        }        
        
        this.set('checked', !this.get('checked'));
        var isChecked = this.get('checked');
        
        var triggerObj = {isChecked: isChecked, checkbox: this, event: event};
        
        Lib.Polymer.triggerEventsWithTable(this, triggerObj, "mrp-check-box_changed");
      }
}
customElements.define(MRPCheckBox.is, MRPCheckBox);