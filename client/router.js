//contains code to manage the page routing

var log = new Logger('router.js', CLL.error);

//This adds our default layout
Router.configure({
    layoutTemplate: 'layout'
});

//configures the router to change the navigation highlighting after routed page
Router.onAfterAction(function () {
    //handles updated the navigation view after a page is routed
    log.trace("onAfterAction: " + this.url);
    
    //After a page is routed trigger the PageRouted event
    //EventBroker.trigger('router.routeCompleted');
    
    var routeCounter = 0;
    var routerName = Router.current().route.getName();
    for (routeCounter = 0; routeCounter < Router.routes.length; routeCounter++) {
        if (Router.routes[routeCounter].path() === "/" + routerName) {
           
            Navigation.updateCurrentPage(Router.routes[routeCounter].url());
            return false;
        }
    }
});

//This will creat the default routed page, the '/' is the default key
//The string used must match the template name
Router.route('/', function () {
    this.render('Home');
});

//Setup the other route paths for each page
Router.route('/Home');
Router.route('/MRP_Table');
Router.route('/MRPButton');
Router.route('/MRPCheckBox');
Router.route('/MRPTextBox');
Router.route('/MRPDropDown');
Router.route('/MRPAlert');
Router.route('/MRPButtonSet');
Router.route('/Brokers');
Router.route('/Dev');



//passing parameters to a routed page - or you can just use a global variable (much easier)
Router.route('/ConsumableRequest/:id', function () {
    this.render('ConsumableRequest', {
        //This is how you cna pass parrameters
        data: function () {
            return {id: this.params.id};//use {{id}} in the template to access this variable
        }
    });
}, {
    //You must add a name to the route so it can be called parameters
    name: 'ConsumableRequest.show'
});
