class MRPCheckBox extends Polymer.Element {
    static get is() {
        return  'mrp-check-box';
    }
    static get properties() {
        return {
            disabled: {type: Boolean, value: false},
            checked: {type: Boolean, value: false},
            id: {type: String, value: ''},
            tableRow: {type: String, value: ''}, //used if inside a table
            class: {type: String, value: '', reflectToAttribute: true},
            boxClass: {type: String, value: 'enabled', reflectToAttribute: true}
        }
    }

    attributeChangedCallback(name, old, value) {
        //Called when any of the element's attributes are changed, appended, removed, or replaced,
        super.attributeChangedCallback(name, old, value);
        
        if(name === "disabled"){
            this.set('boxClass', 'disabled');
        }else if(name==='enabled'){
            this.set('boxClass', 'enabled');
        }
    }
    
    handleClick(event) {
        if(this.get('disabled')){
            return false;
        }
        
        this.set('checked', !this.get('checked'));

        var tableRow = this.get('tableRow');
        var isChecked = this.get('checked');
        
        var triggerObj = {isChecked: isChecked, checkbox: this, event: event};
        if(tableRow !==''){
            triggerObj.tableRow = tableRow;
        }
        
        Lib.Polymer.triggerEventsWithoutTable(this, triggerObj, "mrp-check-box_changed");
      }
}
customElements.define(MRPCheckBox.is, MRPCheckBox);