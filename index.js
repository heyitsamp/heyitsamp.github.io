$(function()    {
    initUI();
});

function initUI(){
    
    /*
    setup tile image load callbacks (so they can center themselves based on their own width
    and height
    */
    
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
        
        /*
        $("#" + images[i] + " img").load(onTileImgLoad($(this)));
        REMEMBER!!! logoImg here is the div holding the <img> tags!!!
        */
        
        var tileImgContainer = $("#" + images[i] + " img");
        
        /*
        this is where the image loading magic happens!
        BUG
        idk why, but this load stuff only works if I wrap
        the callback in that anonymous function
        */
        tileImgContainer.attr("src", images[i] + ".png").css("opacity","0").load(function(){
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
    
    /*
    Preload each logo version so we can cycle thru in a cool effect at the top
    HAVEN'T DONE THIS YET, WANT TO CYCLE THROUGH THE COLORS QUICKLY 
    */
    
    //random amp logo
    var randLogo = logoVersions[Math.floor(Math.random()*logoVersions.length)];
    $("#logoImgContainer img").attr("src", randLogo[0]).load(function(){
        logoLoadCallback($(this));
    });
    
    /*
    Hiding the logo and the text
    */
    $("#logoImgContainer img").css("opacity", "0");
    $("#logoText").css("opacity", "0");
    $("#logoText").css("color", randLogo[1]);
    
    /*
    Set the height of the html element --- logoLockup.. Otherwise the website jumps
    when this image loads
    */
    
    /*
    $("#logoLockup").css("height", $("logoImgContainer img").clientHeight);
    
    
    Hardcoded =((((( I couldn't get the above to work and was spending too
    much time on it=((((
    */
    $("#logoLockup").css("height", "115");
}

function logoLoadCallback(logo){
    //logo.css.("height", logo.height());
    logo.animate({opacity:100}, 3000);
    $("#logoText").animate({opacity: 100}, 3000);
}

function fadeInAfterLoad(jqImgTagObj){
    jqImgTagObj.fadeIn();
}

function onTileImgLoad(tileImgContainer){
    /*
    this also uses jQuery's fadein
    on logo load, center the logo horizontally and vertically!
    trace($(imgContainer).attr("src"));
    */
    
    /*horizontally center logos inside their tiles*/
    tileImgContainer.css("left", 
        tileImgContainer.parent().width()/2
        -(tileImgContainer.width()/2)
    )
    
    /*vertically center logos inside their tiles*/
    tileImgContainer.css("top", 
        tileImgContainer.parent().height()/2
        -( tileImgContainer.height()/2)
    )
    
    /*
    Yeah, Yeah, I know what's with the opacity ---- remember we're Flash guys at heart though!!!!!!!
    */
    tileImgContainer.animate({opacity:100}, 4000);
}




function trace(str){
    console.log(str);
}