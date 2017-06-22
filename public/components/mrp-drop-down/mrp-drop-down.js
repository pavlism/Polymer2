class MRPDropDown extends Polymer.Element {
    static get is() {
        return  'mrp-drop-down';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},
            list: {type: Array, value: function () {
                    return [];
                }},
            value: {type: Number, notify: true}
        };
    }
    handleClick(event) {
        var currentValue = $(event.target).val();
        var partValue = this.get('value');

        if (Lib.JS.isDefined(partValue) && currentValue !== partValue) {
            this.set('value', currentValue);                        
            var triggerObj = {textBox: this, event: event, text:this.get('value')};
            Lib.Polymer.triggerEventsWithoutTable(this,triggerObj, 'mrp-drop-down_changed');
        } else if (Lib.JS.isUndefined(partValue)) {
            this.set('value', currentValue);
        }
    }
    isSelected(itemValue) {
        var value = this.get('value');
        if (value === itemValue) {
            return true;
        } else {
            return false;
        }
    }
}
customElements.define(MRPDropDown.is, MRPDropDown);