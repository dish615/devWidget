//make external file of css, html and also link to google fonts
(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.11.3') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "https://code.jquery.com/jquery-1.11.3.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "https://cdn.rawgit.com/dish615/widgetExternalFin/master/style.css" 

        });
        
        css_link.appendTo("head");
        
        var google_fonts= $("<link>",{
            rel: "stylesheet",
            type: 'text/css',
            href: "https://code.jquery.com/jquery-1.11.3.min.js"
        });
        
        google_fonts.appendTo("head");
        
        var widg_script = $("<script>", {
           type: "text/javascript",
            async: true,
            src: "https://cdn.rawgit.com/dish615/widgetExternalFin/master/check.js"
        });
        
        widg_script.appendTo("head");
        
        var jsonp_url= "https://cdn.rawgit.com/dish615/widgetExternalFin/master/index.html?callback=?";
        $.get(jsonp_url, function(data){
            console.log(data);
            //"input[type=‘submit’][name=‘add’]”
            if($("input[type=‘submit’][name=‘add’]").length>0) {
               $("input[type=‘submit’][name=‘add’]").after(data.html);
            } else if($("button[type=‘submit’][name=‘add’]").length>0) {
               $("button[type=‘submit’][name=‘add’]").after(data.html);
            }
           
        });
        
    });
}

})(); // We call our anonymous function immediately