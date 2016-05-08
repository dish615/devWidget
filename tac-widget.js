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
        var web= "https://staging-thesavyapp.herokuapp.com";
        var btn;
        /*
        var htmlCSP='<meta http-equiv="Content-Security-Policy" content="default-src *; style-src * \'unsafe-inline\'; script-src * \'unsafe-inline\' \'unsafe-eval\'; img-src * data: \'unsafe-inline\'; connect-src * \'unsafe-inline\'; child-src *; frame-src *">';
        $(htmlCSP).appendTo("head");
        var htmlXf= '<frame-options policy=ALLOW-FROM "https://thesavyapp.herokuapp.com"/>'
        $(htmlXf).appendTo("head");
        
        
        var req = new XMLHttpRequest();
        req.setRequestHeader("X-Frame-Options", "");
        */
        
        var stored= window.location.href;
       
    
        $.get(web+"/current-url?currentUrl="+encodeURI(stored));

        window.setInterval(function(){
          if(window.location.href !== stored) {
              stored= window.location.href;
              $.get(web+"/current-url?currentUrl="+encodeURI(stored));
              if(stored.indexOf("product")>0) {
                  var data= {
                      url: stored,
                      btnWidth: btn
                  };
                  
                  console.log(data);
                  document.getElementById("plzwork").onload = function() {
                      document.getElementById("plzwork").contentWindow.postMessage(data, web);
                  };
              }
              
          }

        }, 50);

        
        if(stored.indexOf("product")>0) {
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "https://cdn.rawgit.com/dish615/devWidget26/master/style.css" 

        });
       
        css_link.appendTo("head");
        
        var google_fonts= $("<link>",{
            rel: "stylesheet",
            type: 'text/css',
            href: "https://fonts.googleapis.com/css?family=Raleway:400,500"
        });
        
        google_fonts.appendTo("head");
        
               
        
       var widg_script = $("<script>", {
           type: "text/javascript",
            async: true,
            src: "https://cdn.rawgit.com/dish615/devWidget26/master/check.js"
        });
        
        widg_script.prependTo("head");
        

        
        var jsonp_url= "https://cdn.rawgit.com/dish615/devWidget26/master/index.html";
        $.get(jsonp_url, function(data){
            console.log(data);
            console.log(typeof data);
            //might need to add a container surrounding add to cart button and tb widget to set width  $("input[type='submit'][name='add']").before("<div id='cartAndTb'>");
          
                //needCont
            
           
            if($("input[type='submit'][name='add']").length>0) {
               // var cartVerif= $("input[type='submit'][name='add']").text().toLowerCase();
                //console.log(cartVerif);
                //if(cartVerif.indexOf("cart")>0) {
   
                   $("input[type='submit'][name='add']").first().after(data);
                    $("input[type='submit'][name='add']").first().addClass("needCont");
                    $("input[type='submit'][name='add']").first().addClass("tb-width-important");
                   $(".needCont").wrapAll("<div id='cartAndTb'></div>");
                    btn= $("input[type='submit'][name='add']").first().outerWidth();
               //  }
                
            } else if($("button[type='submit'][name='add']").length>0) {
               // var cartVerif= $("button[type='submit'][name='add']").text().toLowerCase();
               // console.log(cartVerif);
               // if(cartVerif.indexOf("cart")>0) {
                   $("button[type='submit'][name='add']").first().after(data);
                    $("button[type='submit'][name='add']").first().addClass("needCont");
                    $("button[type='submit'][name='add']").first().addClass("tb-width-important");
                    $(".needCont").wrapAll("<div id='cartAndTb'></div>");
                    btn= $("button[type='submit'][name='add']").first().outerWidth();
               // }
                
            } else if($("script:contains('\"name\":\"Canopy\"')").length>0) {
                $("button[name='add']").first().after(data);
                $("button[name='add']").first().addClass("needCont");
                $("button[name='add']").first().addClass("tb-width-important");
                $(".needCont").wrapAll("<div id='cartAndTb'></div>");
                btn= $("button[name='add']").first().outerWidth();
                
            }
            
           // console.log($("#plzwork"));
            var content= {
                url: stored,
                btnWidth: btn
            };
            
            console.log(content);
            
            document.getElementById("plzwork").onload = function() {
                document.getElementById("plzwork").contentWindow.postMessage(content, web);  
                console.log(window.location.href.indexOf("sculpturemart"));
                 if(window.location.href.indexOf("sculpturemart")>0) {
                         console.log("triggered");
                         $("#plzwork").css("height", "53.5px");
                  }
            };
            
        });
        
        
    }

        
    });
}

})(); // We call our anonymous function immediately