$(document).ready(function(){
    
var important= document.getElementById("tac-input");
important.setAttribute('size', important.getAttribute('placeholder').length);
    
          var btn;
      if($("input[type='submit'][name='add']").length>0) {
          var btn= $("input[type='submit'][name='add']").outerWidth();
      } else if($("button[type='submit'][name='add']").length>0) {
         var btn= $("button[type='submit'][name='add']").outerWidth(); 
      }
          var tacb= $("#tacboard").outerWidth();
        console.log(btn+tacb);
    console.log("btn:"+btn);
    console.log("tacb:"+tacb);
          $("#cartAndTb").width(btn+tacb+110);
    
   
    
    $(".tacboard-form").keypress(function(event){
        return event.keyCode != 13;
    });
    
    $("#tacit").click(function(){
      var x= $("#tac-input").val()+"";
        x= parseInt(x.substring(1));
            console.log(x);
            if((!isNaN(x)) && (x!=="")) {
                console.log("good");
                var imp= document.getElementById("tacit");
                imp.setAttribute("type", "submit");
                 $("#invisible").val(window.location.href);
                    console.log($("#invisible").val());
                var y= $("#invisible").val();
                imp.click();
                window.open('http://localhost:3000/signup-pop?price='+x+'&url='+encodeURIComponent(y), 'newwindow', 'width=600, height=450'); 
                imp.setAttribute("type", "button");
                //document.location.replace("/");
                return false;
            }  

    });
    

/*keep $ symbol present!*/
    
var readOnlyLength = 2;


 
 $("#tac-input").focus(function(){
	$(this).val("$ ");
 });
 
 $("#tac-input").blur(function(){
     if($(this).val()==="$ ") {
         $(this).val("");
        $(this).attr("placeholder", "$ PRICE I'D PAY");
     }
 
 });
 
 

$("#tac-input").on("click", function(){
	
	
		if(this.selectionStart< readOnlyLength) {
    	
    	this.selectionEnd= 3;
    }
});




$("#tac-input").on("keypress, keydown", function(e){

	if((event.which== 39) && ($("#tac-input").val()== "$ ")) {
  	this.selectionStart= 3;
  }
});

$('#tac-input').on('keypress, keydown', function(event) {
    
    
    if(event.which== 38) {
    return false;
    }
    
    
    
    if(((event.which== 8) || (event.which== 37)) && ((this.selectionStart< readOnlyLength) || (this.selectionStart== readOnlyLength))) {
    	console.log(this.selectionStart, this.selectionEnd);
      var start= this.selectionStart;
      var end= this.selectionEnd;
      var len= $("#tac-input").val().length;
      if((event.which== 8) && (end-start===len)) {
      	
        
        $("#tac-input").val("$  ");
      } else {
      	return false;
      }
    	
    }
    
 
});                    
    
    
    

    

});

