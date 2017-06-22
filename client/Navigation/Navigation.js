//The code used to creat the navigation at the tp of every page

var log = new Logger('Navigation.js', CLL.error);


/*Template.navigation_navbar.onRendered(function () {
    log.trace("navigation.onRendered");
    
    //Navigation.updateCurrentPage(window.location.href);
});*/


//creating the Navigation object
Navigation = function () {};


/**
 * This will make sure the correct navigation item is highlighted
 * 
 * @param (string) routedPath, the url path
  * Example: Navigation.updateCurrentPage(window.location.href);
 */
Navigation.updateCurrentPage = function (routedPath) {
    log.trace("updateCurrentPage");
    var pageFound = false;

    //check to see if the default page
    var getFrontLoadPos = Lib.JS.getPosition(routedPath, "/", 3);
    if(getFrontLoadPos + 1 === routedPath.length){
        return false;
    }
    var page = routedPath.right(getFrontLoadPos);
    
    //If not the default page change the highliting to highlight the current page    
    log.trace("updateCurrentPage_document.ready");
    $('ul.nav.navbar-nav').children().each(function () {
        var DELPOS = Lib.JS.getPosition($(this).find("a").prop("href"), "/", 3);
        var currentLI = $(this).find("a").prop("href").right(DELPOS)
        
        if (currentLI === page) {
            $(this).addClass("active");
            pageFound = true;
        } else {
            $(this).removeClass("active");
        }
    });
    
    if(!pageFound){
        //highlith student as default
        $('#navHome').find('a').addClass("active");
    }

};