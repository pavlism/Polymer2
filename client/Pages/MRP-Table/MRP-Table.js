var tableData = new ReactiveArray();
var tableData2 = new ReactiveArray();
var tableData3 = new ReactiveArray();
var tableData4 = new ReactiveArray();
var tableData5 = new ReactiveArray();
var tableData6 = new ReactiveArray();


Template.MRPTable.onRendered(function () {
    tableData.length = 0;
    tableData2.length = 0;
    tableData3.length = 0;
    tableData4.length = 0;
    tableData5.length = 0;
    tableData6.length = 0;
    
    tableData.push(['OrderDate','Region','Rep','Total']);
    tableData.push(['1/6/2016','East','Jones','189.05']);
    tableData.push(['1/23/2016','Central','Kivell','999.50']);
    tableData.push(['2/9/2016','Central','Jardine','179.64']);
    tableData.push(['2/26/2016','Central','Gill','539.73']);
    tableData.push(['3/15/2016','West','Sorvino','167.44']);
    tableData.push(['4/1/2016','East','Jones','299.40']);
    tableData.push(['4/18/2016','Central','Andrews','149.2']);
    
    
    
    tableData3.push(['OrderDate','Region','Rep','Total']);
    tableData3.push(['1/6/2016','East',{title:'Jones', prop:{Company:'Jones inc', phone:'519-768-4521'}},'189.05']);
    tableData3.push(['1/23/2016','Central',{title:'Kivell', prop:{Company:'Kivell inc', phone:'519-123-4521'}},'999.50']);
    tableData3.push(['2/9/2016','Central','Jardine',{title:'175.90', prop:{Pencils:'104.54', Pens:'71.36'}}]);
    tableData3.push(['2/26/2016','Central','Gill','539.73']);
    tableData3.push(['3/15/2016','West','Sorvino','167.44']);
    tableData3.push(['4/1/2016','East','Jones','299.40']);
    tableData3.push(['4/18/2016','Central','Andrews','149.2']);
   
    var Link = {link:{href:'http://www.google.ca',text:'google'}};
    
    tableData5.push(['OrderDate','Region','Rep','Web Page']);
    tableData5.push(['1/6/2016','East','Jones',Link]);
    tableData5.push(['1/23/2016','Central','Kivell',Link]);
    tableData5.push(['2/9/2016','Central','Jardine',Link]);
    tableData5.push(['2/26/2016','Central','Gill',Link]);
    tableData5.push(['3/15/2016','West','Sorvino',Link]);
    tableData5.push(['4/1/2016','East','Jones',Link]);
    tableData5.push(['4/18/2016','Central','Andrews',Link]);
        
    var buttons = {buttons:[{color:MRPButton.colors.info, text:'edit'},{color:MRPButton.colors.danger, text:'delete'}]};
    var buttons2 = {buttons:[{text:'e-mail'},{color:MRPButton.colors.warning, text:'call'}]};   


    tableData4.push(['OrderDate','Region','Rep','Actions']);
    tableData4.push(['1/6/2016','East','Jones',buttons]);
    tableData4.push(['1/23/2016','Central','Kivell',buttons]);
    tableData4.push(['2/9/2016','Central','Jardine',buttons]);
    tableData4.push(['2/26/2016','Central','Gill',buttons2]);
    tableData4.push(['3/15/2016','West','Sorvino',buttons2]);
    tableData4.push(['4/1/2016','East','Jones',buttons2]);
    tableData4.push(['4/18/2016','Central','Andrews',buttons2]);
    tableData4.push([{button:{ID:'23',color:MRPButton.colors.primary, text:'add New'}},'',' ','']);
    
    tableData2.push(['#','OrderDate','Region','Rep','Total']);
    tableData2.push(['1','1/6/2016','East','Jones','189.05']);
    tableData2.push(['2','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['3','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['4','2/26/2016','Central','Gill','539.73']);
    tableData2.push(['5','3/15/2016','West','Sorvino','167.44']);
    tableData2.push(['6','4/1/2016','East','Jones','299.40']);
    tableData2.push(['7','4/18/2016','Central','Andrews','149.2']);
    tableData2.push(['8','1/6/2016','East','Jones','189.05']);
    tableData2.push(['9','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['10','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['11','1/6/2016','East','Jones','189.05']);
    tableData2.push(['12','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['13','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['14','2/26/2016','Central','Gill','539.73']);
    tableData2.push(['15','3/15/2016','West','Sorvino','167.44']);
    tableData2.push(['16','4/1/2016','East','Jones','299.40']);
    tableData2.push(['17','4/18/2016','Central','Andrews','149.2']);
    tableData2.push(['18','1/6/2016','East','Jones','189.05']);
    tableData2.push(['19','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['20','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['21','1/6/2016','East','Jones','189.05']);
    tableData2.push(['22','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['23','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['24','2/26/2016','Central','Gill','539.73']);
    tableData2.push(['25','3/15/2016','West','Sorvino','167.44']);
    tableData2.push(['26','4/1/2016','East','Jones','299.40']);
    tableData2.push(['27','4/18/2016','Central','Andrews','149.2']);
    tableData2.push(['28','1/6/2016','East','Jones','189.05']);
    tableData2.push(['29','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['30','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['31','1/6/2016','East','Jones','189.05']);
    tableData2.push(['32','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['33','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['34','2/26/2016','Central','Gill','539.73']);
    tableData2.push(['35','3/15/2016','West','Sorvino','167.44']);
    tableData2.push(['36','4/1/2016','East','Jones','299.40']);
    tableData2.push(['37','4/18/2016','Central','Andrews','149.2']);
    tableData2.push(['38','1/6/2016','East','Jones','189.05']);
    tableData2.push(['39','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['40','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['41','1/6/2016','East','Jones','189.05']);
    tableData2.push(['42','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['43','2/9/2016','Central','Jardine','179.64']);
    tableData2.push(['44','2/26/2016','Central','Gill','539.73']);
    tableData2.push(['45','3/15/2016','West','Sorvino','167.44']);
    tableData2.push(['46','4/1/2016','East','Jones','299.40']);
    tableData2.push(['47','4/18/2016','Central','Andrews','149.2']);
    tableData2.push(['48','1/6/2016','East','Jones','189.05']);
    tableData2.push(['49','1/23/2016','Central','Kivell','999.50']);
    tableData2.push(['50','2/9/2016','Central','Jardine','179.64']);  
    
    var total = {title:'175.90', prop:{Pencils:'104.54', Pens:'71.36'}}
    var Link = {link:{href:'http://www.google.ca',text:'Gill'}};
    var button = {button:{color:MRPButton.colors.info, text:'Missing Info'}}
    
    tableData6.push(['#','OrderDate','Region','Rep','Total']);
    tableData6.push(['1','1/6/2016','East','Jones','189.05']);
    tableData6.push(['2','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['3','2/9/2016','Central','Jardine',total]);
    tableData6.push(['4','2/26/2016','Central',Link,'539.73']);
    tableData6.push(['5','3/15/2016','West','Sorvino','167.44']);
    tableData6.push(['6','4/1/2016','East','Jones',total]);
    tableData6.push(['7','4/18/2016','Central','Andrews','149.2']);
    tableData6.push(['8','1/6/2016',buttons,'Jones','189.05']);
    tableData6.push(['9','1/23/2016',button,'Kivell','999.50']);
    tableData6.push(['10','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['11','1/6/2016','East','Jones','189.05']);
    tableData6.push(['12','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['13','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['14','2/26/2016','Central',Link,total]);
    tableData6.push(['15','3/15/2016','West','Sorvino','167.44']);
    tableData6.push(['16','4/1/2016','East','Jones','299.40']);
    tableData6.push(['17','4/18/2016','Central','Andrews','149.2']);
    tableData6.push(['18','1/6/2016','East','Jones','189.05']);
    tableData6.push(['19','1/23/2016','Central','Kivell',total]);
    tableData6.push(['20','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['21','1/6/2016','East','Jones','189.05']);
    tableData6.push(['22','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['23','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['24','2/26/2016','Central',Link,'539.73']);
    tableData6.push(['25','3/15/2016','West','Sorvino','167.44']);
    tableData6.push(['26','4/1/2016','East','Jones','299.40']);
    tableData6.push(['27','4/18/2016','Central','Andrews','149.2']);
    tableData6.push(['28','1/6/2016','East','Jones','189.05']);
    tableData6.push(['29','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['30','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['31','1/6/2016','East','Jones','189.05']);
    tableData6.push(['32','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['33','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['34','2/26/2016','Central','Gill','539.73']);
    tableData6.push(['35','3/15/2016','West','Sorvino','167.44']);
    tableData6.push(['36','4/1/2016','East','Jones','299.40']);
    tableData6.push(['37','4/18/2016','Central','Andrews','149.2']);
    tableData6.push(['38','1/6/2016','East','Jones','189.05']);
    tableData6.push(['39','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['40','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['41','1/6/2016','East','Jones','189.05']);
    tableData6.push(['42','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['43','2/9/2016','Central','Jardine','179.64']);
    tableData6.push(['44','2/26/2016','Central','Gill','539.73']);
    tableData6.push(['45','3/15/2016','West','Sorvino','167.44']);
    tableData6.push(['46','4/1/2016','East','Jones','299.40']);
    tableData6.push(['47','4/18/2016','Central','Andrews','149.2']);
    tableData6.push(['48','1/6/2016','East','Jones','189.05']);
    tableData6.push(['49','1/23/2016','Central','Kivell','999.50']);
    tableData6.push(['50','2/9/2016','Central','Jardine','179.64']);  
    
    EventBroker.listen("Table1_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table1 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table1_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table1 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table2_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table2 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table2_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table2 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table3_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table3 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table3_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table3 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table4_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table4 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table4_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table4 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table5_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table5 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table5_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table5 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table6_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table6 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table6_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table6 was double clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table7_mrp-table_clicked", function (listenerArgs, triggerArgs) {
        console.log('Table7 was clicked');
        console.log(triggerArgs);
    });
    
    EventBroker.listen("Table7_mrp-table_dblclicked", function (listenerArgs, triggerArgs) {
        console.log('Table7 was double clicked');
        console.log(triggerArgs);
    });
});

Template.MRPTable.helpers({
    tableData: function () {
        return JSON.stringify(tableData.toArray());
    },
    tableData2: function () {
        return JSON.stringify(tableData2.toArray());
    },
    tableData3: function () {
        return JSON.stringify(tableData3.toArray());
    },
    tableData4: function () {
        return JSON.stringify(tableData4.toArray());
    },
    tableData5: function () {
        return JSON.stringify(tableData5.toArray());
    },
    tableData6: function () {
        return JSON.stringify(tableData6.toArray());
    }
    
});
