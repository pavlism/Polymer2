var tableData = new ReactiveArray();
var files = new ReactiveArray();
var list = new ReactiveArray();
var toggle = new ReactiveObject({val:0});

Template.dev.onRendered(function () {
       
    EventBroker.listen('_mrp-Submit-Button_passed', {}, function (listenerArgs, triggerArgs) {
        if(toggle.val ===0){
            toggle.val=1;
        }else{
            toggle.val=0;
        }
    });
    
    EventBroker.listen('mrp-alert_closed', {}, function (listenerArgs, triggerArgs) {
        toggle.val=0;
    });
    
    tableData.length = 0;
    files.length = 0;
    list.length = 0;

    list.push('one');
    list.push('2');
    list.push('3');
    
    files.push({name:'file name1.pdf'});
    files.push({name:'file name2.pdf'});
    files.push({name:'file name3.pdf'});
    
    
    tableData.push(['#','OrderDate','Region','Rep','Total']);
    tableData.push(['1','1/6/2016','East','Jones','189.05']);
    tableData.push(['2','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['3','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['4','2/26/2016','Central','Gill','539.73']);
    tableData.push(['5','3/15/2016','West','Sorvino','167.44']);
    tableData.push(['6','4/1/2016','East','Jones','299.40']);
    tableData.push(['7','4/18/2016','Central','Andrews','149.2']);
    tableData.push(['8','1/6/2016','East','Jones','189.05']);
    tableData.push(['9','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['10','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['11','1/6/2016','East','Jones','189.05']);
    tableData.push(['12','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['13','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['14','2/26/2016','Central','Gill','539.73']);
    tableData.push(['15','3/15/2016','West','Sorvino','167.44']);
    tableData.push(['16','4/1/2016','East','Jones','299.40']);
    tableData.push(['17','4/18/2016','Central','Andrews','149.2']);
    tableData.push(['18','1/6/2016','East','Jones','189.05']);
    tableData.push(['19','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['20','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['21','1/6/2016','East','Jones','189.05']);
    tableData.push(['22','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['23','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['24','2/26/2016','Central','Gill','539.73']);
    tableData.push(['25','3/15/2016','West','Sorvino','167.44']);
    tableData.push(['26','4/1/2016','East','Jones','299.40']);
    tableData.push(['27','4/18/2016','Central','Andrews','149.2']);
    tableData.push(['28','1/6/2016','East','Jones','189.05']);
    tableData.push(['29','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['30','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['31','1/6/2016','East','Jones','189.05']);
    tableData.push(['32','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['33','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['34','2/26/2016','Central','Gill','539.73']);
    tableData.push(['35','3/15/2016','West','Sorvino','167.44']);
    tableData.push(['36','4/1/2016','East','Jones','299.40']);
    tableData.push(['37','4/18/2016','Central','Andrews','149.2']);
    tableData.push(['38','1/6/2016','East','Jones','189.05']);
    tableData.push(['39','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['40','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['41','1/6/2016','East','Jones','189.05']);
    tableData.push(['42','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['43','2/9/2016','Central','Jardine','179.64']);
    tableData.push(['44','2/26/2016','Central','Gill','539.73']);
    tableData.push(['45','3/15/2016','West','Sorvino','167.44']);
    tableData.push(['46','4/1/2016','East','Jones','299.40']);
    tableData.push(['47','4/18/2016','Central','Andrews','149.2']);
    tableData.push(['48','1/6/2016','East','Jones','189.05']);
    tableData.push(['49','1/23/2016','Central','Kivell','999.50']);
    tableData.push(['50','2/9/2016','Central','Jardine','179.64']);
    
    
    /*    
    var regex = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    var obj = {title:'Mark', prop:{Company:'MRP inc', phone:'519-768-4521'}};
    
    var Link = {link:{href:'http//www.google.ca',text:'google'}};
    var TextArea = {textArea:{rows:'4',cols:'50', text:'text', value:'value', regex:regex, placeholder:'placeholder', errorMsg:"This is not a valid e-mail address", required:true, id:'str-id', class:'str-class' }};
    var button = {button:{id:'str-id', class:'str-class', size:MRPButton.sizes.small,color:MRPButton.colors.danger, text:'Add'}};
    var buttons = {buttons:[{size:MRPButton.sizes.mini,color:MRPButton.colors.info, text:'Add'},{size:MRPButton.sizes.small,color:MRPButton.colors.primary, text:'Add'}]};
                
    tableData.push(['F-Name','L-Name','Job','Country']);
    //tableData.push(['1 Roger','Yang','Boss',TextArea]);
    //tableData.push(['1 Roger','Yang','Boss',TextArea]);
    //tableData.push(['1 Roger','Yang','Boss',TextArea]);
    tableData.push([Link, '1 Roger','Yang','Boss']);
    tableData.push([button,obj,TextArea, buttons]);
    tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push(['2 Mark','Pavlis','Developer','Canada']);
    //tableData.push([{title:'1 Mark', prop:{Company:'MRP inc', phone:'519-768-4521'}},'Pavlis','Developer','Canada']);
   
    //tableData.push([{title:'2 Tom', prop:{Company:'Tom inc', phone:'519-768-4521'}},'Grove','Developer','Canada']);
    tableData.push(['3 Thomas','Grove','Developer','Canada']);
    tableData.push(['4 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['5 Lucy','Chen','Developer','China']);
    //tableData.push(['7 Mark','Pavlis','Developer',buttons]);
    //tableData.push(['7 Mark','Pavlis','Developer',obj]);
    //tableData.push(['7 Mark','Pavlis','Developer',Link]);
    
    */
    
    /*tableData.push([{button:{ID:'23',class:'primary', text:'add New'}},'',' ','']);
    tableData.push([Link,'Pavlis','Developer',buttons]);
    tableData.push(['7 Mark','Pavlis','Developer',buttons]);
    tableData.push(['8 Thomas','Grove','Developer',buttons]);
    tableData.push(['9 Nhi','Somthing','Web Stuff',buttons]);
    tableData.push(['9 Nhi','Somthing','Web Stuff',buttons]);
    tableData.push([{title:'1 Mark', prop:{Company:'MRP inc', phone:'519-768-4521'}},'Pavlis','Developer','Canada']);
    tableData.push([{title:'2 Tom', prop:{Company:'Tom inc', phone:'519-768-4521'}},'Grove','Developer','Canada']);
    tableData.push(['3 Thomas','3 Grove','3 Developer','3 Canada']);
    tableData.push([{title:'4 Nhi', prop:{Company:'Tom inc', phone:'519-768-4521'}},'Somthing','Web Stuff',{title:'Nhi 2', prop:{Company:'Nhi inc', phone:'519-768-4521', phone2:'519-768-4521', phone3:'519-768-4521'}}]);
    tableData.push(['5 Terry','Chen','Developer','China']);
    tableData.push(['6 Roger','Yang','Boss','China']);
    tableData.push(['7 Mark','Pavlis','Developer','Canada']);
    tableData.push(['8 Thomas','Grove','Developer','Canada']);
    tableData.push(['9 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['10 Lucy','Chen','Developer','China']);
    tableData.push(['11 Terry','Chen','Developer','China']);
    tableData.push(['12 Roger','Yang','Boss','China']);
    tableData.push(['13 Mark','Pavlis','Developer','Canada']);
    tableData.push(['14 Thomas','Grove','Developer','Canada']);
    tableData.push(['15 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['16 Lucy','Chen','Developer','China']);
    tableData.push(['17 Terry','Chen','Developer','China']);
    tableData.push(['18 Roger','Yang','Boss','China']);
    tableData.push(['19 Mark','Pavlis','Developer','Canada']);
    tableData.push(['20 Thomas','Grove','Developer','Canada']);
    tableData.push(['21 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['22 Lucy','Chen','Developer','China']);
    tableData.push(['23 Terry','Chen','Developer','China']);
    tableData.push(['24 Roger','Yang','Boss','China']);
    tableData.push(['25 Mark','Pavlis','Developer','Canada']);
    tableData.push(['26 Thomas','Grove','Developer','Canada']);
    tableData.push(['27 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['28 Lucy','Chen','Developer','China']);
    tableData.push(['29 Terry','Chen','Developer','China']);
    tableData.push(['30 Roger','Yang','Boss','China']);
    tableData.push(['31 Mark','Pavlis','Developer','Canada']);
    tableData.push(['32 Thomas','Grove','Developer','Canada']);
    tableData.push(['33 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['34 Lucy','Chen','Developer','China']);
    tableData.push(['35 Terry','Chen','Developer','China']);
    tableData.push(['36 Roger','Yang','Boss','China']);
    tableData.push(['37 Mark','Pavlis','Developer','Canada']);
    tableData.push(['38 Thomas','Grove','Developer','Canada']);
    tableData.push(['39 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['40 Lucy','Chen','Developer','China']);
    tableData.push(['41 Terry','Chen','Developer','China']);
    tableData.push(['42 Roger','Yang','Boss','China']);
    tableData.push(['43 Mark','Pavlis','Developer','Canada']);
    tableData.push(['44 Thomas','Grove','Developer','Canada']);
    tableData.push(['45 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['46 Lucy','Chen','Developer','China']);
    tableData.push(['47 Terry','Chen','Developer','China']);
    tableData.push(['48 Roger','Yang','Boss','China']);
    tableData.push(['49 Mark','Pavlis','Developer','Canada']);
    tableData.push(['50 Thomas','Grove','Developer','Canada']);
    tableData.push(['51 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['52 Lucy','Chen','Developer','China']);
    tableData.push(['53 Terry','Chen','Developer','China']);
    tableData.push(['54 Roger','Yang','Boss','China']);
    tableData.push(['55 Mark','Pavlis','Developer','Canada']);
    tableData.push(['56 Thomas','Grove','Developer','Canada']);
    tableData.push(['57 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['58 Lucy','Chen','Developer','China']);
    tableData.push(['59 Terry','Chen','Developer','China']);
    tableData.push(['60 Roger','Yang','Boss','China']);
    tableData.push(['61 Mark','Pavlis','Developer','Canada']);
    tableData.push(['62 Thomas','Grove','Developer','Canada']);
    tableData.push(['63 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['64 Lucy','Chen','Developer','China']);
    tableData.push(['65 Terry','Chen','Developer','China']);
    tableData.push(['66 Roger','Yang','Boss','China']);
    tableData.push(['67 Mark','Pavlis','Developer','Canada']);
    tableData.push(['68 Thomas','Grove','Developer','Canada']);
    tableData.push(['69 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['70 Lucy','Chen','Developer','China']);
    tableData.push(['71 Terry','Chen','Developer','China']);
    tableData.push(['72 Roger','Yang','Boss','China']);
    tableData.push(['73 Mark','Pavlis','Developer','Canada']);
    tableData.push(['74 Thomas','Grove','Developer','Canada']);
    tableData.push(['75 Nhi','Somthing','Web Stuff','Viatnam']);
    tableData.push(['76 Lucy','Chen','Developer','China']);
    tableData.push(['77 Terry','Chen','Developer','China']);
    tableData.push(['78 Roger','Yang','Boss','China']);*/
    
    EventBroker.listen("primary add_mrp-button_clicked", function (listenerArgs, triggerArgs) {
        console.log('primary add button was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("primary delete_mrp-button_clicked", function (listenerArgs, triggerArgs) {
        console.log('primary add button was clicked');
        console.log(triggerArgs);
    });
   
});

Template.dev.helpers({
    tableData: function () {
        return JSON.stringify(tableData.toArray());
    },
    files: function () {
        return JSON.stringify(files.toArray());
    },
    list: function () {
        return JSON.stringify(list.toArray());
    },
    toggle: function () {
        return JSON.stringify(toggle.val);
    }
});