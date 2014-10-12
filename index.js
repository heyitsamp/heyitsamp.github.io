$(function()    {
    
    //cmd + option + J opens the JavaScript console in Chrome
    //This centers each logo vertically and horizontally.
    //trace("1234567890");
    var colors = [
        "#ff33cc", 
        "#00ccff", 
        "#ff9900", 
        "#33cc00", 
        "#ffcc00", 
        "#cc00ff", 
        "#ffffff", 
        "#ff0066"]
    
    initUI();
    
}
);



function initUI(){
    
    
    //select all the logos inside their tiles
    $(".tile img").each(function(){
        //horizontally center logos inside their tiles
        $(this).css("left", 
            $(this).parent().width()/2
            -( $(this).width()/2)
        )
        //vertically center logos inside their tiles
        $(this).css("top", 
            $(this).parent().height()/2
            -( $(this).height()/2)
        )
    });
    
}



function trace(str){
    console.log(str);
}