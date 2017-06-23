//V0.1

class MRPButton extends Polymer.Element {
    static get is() {
        return  'mrp-button';
    }
    static get properties() {
        return {
            id: {type: String, value: ''},                                      //The ID of the element
            class: {type: String, value: '', reflectToAttribute: true},         //The class of the element
            title: {type: String, value: ''},                                   //Can be used to add text to the button instead of adding text in between the elements tags
            btnClass: {type: String, value: ''},                                //Used to setup the colors and size without overwriting any class setup by the user
            primary: {type: Boolean, value: false},                             //Applies the primary color (green)
            success: {type: Boolean, value: false},                             //Applies the success color (dark blue)
            info: {type: Boolean, value: false},                                //Applies the info color (light blue)
            warning: {type: Boolean, value: false},                             //Applies the warning color (yellow)
            danger: {type: Boolean, value: false},                              //Applies the danger color (red)
            large: {type: Boolean, value: false},                               //Applies the large size
            small: {type: Boolean, value: false},                               //Applies the small size
            mini: {type: Boolean, value: false},                                //Applies the mini size
            size: {type: String, value: ''},                                    //Can be set to any size string (large,small,mini) or left blank for the default size
            color: {type: String, value: ''},                                   //Can be set to any color string (primary,success,info,warning,danger) or left blank for the default color
            tableRow: {type: String, value: ''},                                //Used if inside a table, it's set to the row number this element is in.
            propertiesObj: {type: Object, value: function () {                  //Used to set the properties with an object instead of individually.  Works  with get propertiesObj().
                    return {};
                }
            }
        };
    }

    static get propertiesObj() {
        //used to help user setup this element using an object instead of by assigning all the properties in the HTML
        return {id: '', class: '', text: '', size: '', color: '', tableRow: ''};
    }
    val() {
        //Used to create a string representation of this element, for now <mrp-button>s are just empty strings.
        return "";
    }

    ready() {
        super.ready();
        var propertiesObj = this.get('propertiesObj');
        if (!$.isEmptyObject(propertiesObj)) {
            //The propertiesObj was set then use the size and color values to set the appropriate properties
            if (Lib.JS.isDefined(propertiesObj.id)) {
                this.set('id', propertiesObj.id);
            }
            if (Lib.JS.isDefined(propertiesObj.size)) {
                this.set('large', false);
                this.set('small', false);
                this.set('mini', false);
                this.set(propertiesObj.size, true);
            }
            if (Lib.JS.isDefined(propertiesObj.color)) {
                this.set('primary', false);
                this.set('success', false);
                this.set('info', false);
                this.set('warning', false);
                this.set('danger', false);
                this.set(propertiesObj.color, true);
            }
        }

        //Check the properties and setup the appropriate classes for the size and color of the button
        var btnClass = '';
        //setup class
        if (this.get('primary')) {
            btnClass = 'primary';
        } else if (this.get('success')) {
            btnClass = 'success';
        } else if (this.get('info')) {
            btnClass = 'info';
        } else if (this.get('warning')) {
            btnClass = 'warning';
        } else if (this.get('danger')) {
            btnClass = 'danger';
        }

        if (this.get('large')) {
            btnClass = btnClass + ' large';
        } else if (this.get('small')) {
            btnClass = btnClass + ' small';
        } else if (this.get('mini')) {
            btnClass = btnClass + ' mini';
        }
        this.set('btnClass', btnClass);
    }

    handleClick(event) {
        //If clicked fire the event triggers
        var triggerObj = {button: this, event: event};
        Lib.Polymer.triggerEventsWithTable(this, triggerObj, 'mrp-button_clicked');
    }
}
customElements.define(MRPButton.is, MRPButton);

//enum like objecs for size and color, string are used so the values can be reference directly
MRPButton.sizes = {large: 'large', small: 'small', mini: 'mini', default: ''};
MRPButton.colors = {primary: 'primary', success: 'success', info: 'info', warning: 'warning', danger: 'danger', default: '', green: 'primary', darkBlue: 'success', lightBlue: 'info', yellow: 'warning', red: 'danger', grey: ''};