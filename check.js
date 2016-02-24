$(document).ready(function(){
    $("#tacboard-form").keypress(function(){
        return event.keyCode != 13;
    });
    
    $("#tacit").click(function(){
      var x= document.forms["tb"]["price"].value;
            console.log(x);
            if((!isNaN(x)) && (x!=="")) {
                console.log("good");
                var imp= document.getElementById("tacit");
                imp.setAttribute("type", "submit");
                imp.click();
                window.open('http://localhost:3000/signup-pop?price='+x, 'newwindow', 'width=600, height=450'); 
                imp.setAttribute("type", "button");
                //document.location.replace("/");
                return false;
            }  

    });
    

    
    
    
    
    
});