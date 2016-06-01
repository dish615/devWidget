$(document).ready(function(){
    //dont think this is working...
    var web= "https://staging-thesavyapp.herokuapp.com";
    var url= window.location.href;
     var userId;
          var btn;
            //var btnVar;
    if($("script[src*='s3.amazonaws.com/shopify-apps/pre-order/js/jquery.spur.cart.api.js']" && $(".tooltipstered").is(":visible")).length>0) {
            btn= $(".tooltipstered").first().outerWidth();
            //btnVar= $(".tooltipstered").first();
            if($(".satcb_btn input").length<=0 || $("div.purchase.clearfix").length<=0) {
                $(".tooltipstered").first().css({"width": btn+"px",
                                                        "display": "inline-block"});

            }
                
                
            } else if($("input[type='submit'][name='add']").length>0) {
         // var cartVerif= $("input[type='submit'][name='add']").text().toLowerCase();
           // console.log(cartVerif);
           // if(cartVerif.indexOf("cart")>0) {
          
          btn= $("input[type='submit'][name='add']").first().outerWidth();
          //btnVar= $("input[type='submit'][name='add']").first();
          if($(".satcb_btn input").length<=0 || $("div.purchase.clearfix").length<=0) {
            $("input[type='submit'][name='add']").first().css({"width": btn+"px",
                                                    "display": "inline-block"});
            }
         
             //   }
          
      } else if($("button[type='submit'][name='add']").length>0) {
          //var y= encodeURI(window.location.href);
          //$.get("http://localhost:3000/current-url?currentUrl="+y);
          //var cartVerif= $("button[type='submit'][name='add']").text().toLowerCase();
       // console.log(cartVerif);
      //  if(cartVerif.indexOf("cart")>0) {
          
         btn= $("button[type='submit'][name='add']").first().outerWidth();
         // btnVar= $("button[type='submit'][name='add']").first();
          if($(".satcb_btn button").length<=0 || $("div.purchase.clearfix").length<=0) {
                  $("button[type='submit'][name='add']").first().css({"width": btn+"px",
                                                    "display": "inline-block"});
              }
          
        //}
          
      } else if($("script:contains('\"name\":\"Canopy\"')").length>0) {
               
          btn= $("button[name='add']").first().outerWidth();
          //btnVar= $("button[name='add']").first();
           $("button[name='add']").first().css({"width": btn+"px",
                                                    "display": "inline-block"});
                
      }
   // console.log(btn);
    
    //$.get(web+"/cartButton?width="+btn); REVERT TO THIS 622ae3df385a7cd5b1755e9715c95db5617d3ad7
    /*
    btnVar.click(function(){
        //var socket = io.connect(web);
        var dat= {
            page: window.location.href
        };
       socket.emit("add-to-cart-clicked", dat);
        
    });
    */
  
    
    
      $("#cartAndTb").width(btn+377);  
        console.log(btn);
    
    /*
    
    if($(".satcb_btn button").length>0) {
        $(".satcb_btn button").css("width", "121px");

    } else if($(".satcb_btn input").length>0) {
        $(".satcb_btn input").css("width", "121px");
    }
    */
    
    
        window.addEventListener("message", function(e){
                console.log(e.origin);
                console.log(e.data);
            if(e.origin!==web) {
                return;
            } else {
                var position= e.data;
                console.log(position);
                width= width+5; //for question mark
                if (position==="right") {
                    $("#plzwork").css({"display": "inline",
                                       "border": "none",
                                       "vertical-align": "middle",
                                       "height": "70px",
                                       "margin-left": "-5px",
                                      "margin-bottom": "auto",
                                      "width": "360px"});
                } else if(!isNaN(parseInt(position))) {
                    position= parseInt(position);
                    var width=247+position*4;
                    
                    if(width>btn) {
                    
                    $("#plzwork").css({"display": "block",
                                       "border": "none",
                                       "vertical-align": "bottom",
                                       "margin-bottom":"-100px",
                                       "height": "100px",
                                       "width": width+"px",
                                       "margin-left": "auto"});
                    
                    $("#cartAndTb").css({"width": width+"px",
                                        "text-align": "center",
                                        "margin-left": "-"+((width-btn)/2)+"px"}); 
                     } else {
                            $("#plzwork").css({"display": "block",
                                       "border": "none",
                                       "vertical-align": "bottom",
                                       "margin-bottom":"-100px",
                                       "height": "100px",
                                       "width": btn+"px",
                                       "margin-left": "auto"});
                    
                            $("#cartAndTb").css({"width": btn+"px",
                                                "text-align": "center"});
                            
                        }
                    if(window.location.href.indexOf("newmoonenterprise")<0) {
                        console.log("ugh bottom");
                        $("#cartAndTb").css("margin-bottom", "50px");
                    }
                } else {
                   var ind= position.indexOf("sessionid");
                    userId= position.substring(0, ind);
                    var dat= {
                        userId: userId,
                        from: position.substring(ind+9)
                    };
                    console.log(JSON.stringify(dat));
                    
                    socket.emit('store-userid', dat);
                    console.log("socket id stored in cookie at savy "+position);
                }
                
               
            }
            
           
        }, false);
   
     $("input[type='submit']").click(function(){
            var clickData= {
                ogUrl: url,
                userId: userId || socket.io.engine.id,
                element: this
            };
            
            console.log(JSON.stringify(clickData));

            socket.emit('click', clickData);
        });

        $("input[type='button']").click(function(){
            var clickData= {
                ogUrl: url,
                userId: userId || socket.io.engine.id,
                element: this
            };
            console.log(JSON.stringify(clickData));

            socket.emit('click', clickData);
        });

        $("button").click(function(){
            var clickData= {
                ogUrl: url,
                userId: userId || socket.io.engine.id,
                element: this
            };
            console.log(JSON.stringify(clickData));

            socket.emit('click', clickData);
        });

         $("a").click(function(){
            var clickData= {
                ogUrl: url,
                userId: userId || socket.io.engine.id,
                element: this
            };

             console.log(JSON.stringify(clickData));
            socket.emit('click', clickData);
        });
    
    
    
   

});

