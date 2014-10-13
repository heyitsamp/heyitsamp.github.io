$(function()    {
    
    //cmd + option + J opens the JavaScript console in Chrome
    //This centers each logo vertically and horizontally.
    //trace("1234567890");
    initUI();
}
);

function initUI(){
    
    //setup tile image load callbacks (so they can center themselves based on their own width
    //and height
    
    
    //Eventually populate images array from XML file (a CMS)
    var images = [
        "atomic",
        "branding",
        "cocacola",
        "disney",
        "eb",
        "kmd",
        "ms",
        "obama",
        "pg"
    ]
    
    
    
    
    var j = images.length;
    for(var i=0; i<j; i++){
        //$("#" + images[i] + " img").load(onTileImgLoad($(this)));
        
        //REMEMBER!!! logoImg here is the div holding the <img> tags!!!
        var imgContainer = $("#" + images[i] + " img");
        
        //this is where the image loading magic happens!
        //BUG
        //idk why, but this load stuff only works if I wrap
        //the callback in that anonymous function
        imgContainer.attr("src", images[i] + ".png").fadeOut(0).load(function(){
            onTileImgLoad($(this))
        });
        
    }
    
    
    var logoVersions = [
        ["amp-00ffff.png","#00ffff"], 
        ["amp-33ff00.png","#33ff00"], 
        ["amp-ff33cc.png","#ff33cc"], 
        ["amp-ff0066.png","#ff0066"], 
        ["amp-ff9900.png","#ff9900"], 
        ["amp-ffcc00.png","#ffcc00"]
    ]
    
    //random color for amp logo
    var randLogo = logoVersions[Math.floor(Math.random()*logoVersions.length)];
    trace(randLogo + "THIS IS RAND");
    
    trace(randLogo[0] + "THIS IS LOGO VERSIONS RAND");
    
    $("#logoImg img").attr("src", randLogo[0]).load(function(){
        logoLoadCallback($(this));
    });
    
    $("#logoText").css("color", randLogo[1]);
    
    //select all the logos inside their tiles
    /*
    $(".tile img").each(
        function(){
            
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
            
        }
    );
    */
    
}

function logoLoadCallback(logo){
    //logo.css.("height", logo.height());
}

function onTileImgLoad(imgContainer){
    //this also uses jQuery's fadein
    //on logo load, center the logo horizontally and vertically!
    //trace($(imgContainer).attr("src"));
    
    //horizontally center logos inside their tiles
    imgContainer.css("left", 
        imgContainer.parent().width()/2
        -(imgContainer.width()/2)
    )
    
    //vertically center logos inside their tiles
    imgContainer.css("top", 
        imgContainer.parent().height()/2
        -( imgContainer.height()/2)
    )
    imgContainer.fadeIn();
}




function trace(str){
    console.log(str);
}