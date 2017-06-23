var tableData = [];

tableData.push(['Order Date', 'Region', 'Rep', 'Total']);
tableData.push(['1/6/2016', 'East', 'Jones', '189.05']);
tableData.push(['1/23/2016', 'Central', 'Kivell', '999.50']);
tableData.push(['2/9/2016', 'Central', 'Jardine', '179.64']);
tableData.push(['2/26/2016', 'Central', 'Gill', '539.73']);
tableData.push(['3/15/2016', 'West', 'Sorvino', '167.44']);
tableData.push(['4/1/2016', 'East', 'Jones', '299.40']);
tableData.push(['4/18/2016', 'Central', 'Andrews', '149.2']);

DataBroker.listen("GetSampleData", tableData, function (listenerArgs, triggerArgs) {
    return listenerArgs;
})
