$(function()    {

/******************************
PUBLIC PROPERTIES
*******************************/
/*Eventually populate images array from XML file (a CMS)*/
var companyNames = [
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
var logoVersions = [
    ["amp-00ffff.png","#00ffff"], 
    ["amp-33ff00.png","#33ff00"], 
    ["amp-ff33cc.png","#ff33cc"], 
    ["amp-ff0066.png","#ff0066"], 
    ["amp-ff9900.png","#ff9900"], 
    ["amp-ffcc00.png","#ffcc00"]
]


/******************************
PRIVATE PROPERTIES
*******************************/
var imgFadeInSpeed = 3000;
var logoTextFadeInSpeed = 3000;


/**********************
COMMENCE THE INITIATION!!! MUAHAHAHAHAAAAA!!!!
***********************/
initUI();


function initUI(){
    /*This is where the image loading magic happens!*/
    var j = companyNames.length;
    for(var i=0; i<j; i++){
        var tileImgContainer = $("#" + companyNames[i] + " img");
        /*BUG =(
        idk why, but this load stuff only works if I wrap
        the callback in that anonymous function
        */
        tileImgContainer.attr("src", companyNames[i] + ".png").load(function(){
            centerImgAfterLoad($(this))
        });
        
    }
    
    /*
    Every image starts out invisible, until it loads, and then
    fades in. This is fine for now. It stops jumpyness on every image
    */
    $("img").css("opacity", "0").load(function(){
        imgFadeInAfterLoad($(this));
    });
    
    /* SPECIAL EFFECT
    Haven't done this yet,
    want to cycle through the colors
    quickly in a special effect
    -----------------------------------
    Need to do this for the effect----->
    Preload each logo version so we can cycle thru
    in a cool effect at the top 
    */
    
    /*randomize the amp logo*/
    var randLogo = logoVersions[Math.floor(Math.random()*logoVersions.length)];
    $("#logoImgContainer img").attr("src", randLogo[0]).load(function(){
        logoLoadCallback($(this));
    });
    
    /*Hiding the logo text*/
    $("#logoText").css("opacity", "0").css("color", randLogo[1]);
    
    
    /*Setting up the feature section*/
    $("#featureSectionTopBorderContainer img").attr("src", "shadTop.png");
    $("#featureSectionBottomBorderContainer img").attr("src", "shadBottom.png");
    $( window ).resize(onWindowResize());
    
    /*
    Set the height of the html element --- logoLockup.. 
    Otherwise the website jumps
    when this image loads
    ------------------------------------------------------
    $("#logoLockup").css("height", $("logoImgContainer img").clientHeight);
    Hardcoded =((((( I couldn't get the above to work and was spending too
    much time on it=((((
    */
    
    $("#logoLockup").css("height", "115");
}

function onWindowResize(){
    $("#featureSectionTopBorderContainer img").css("width", "100%");
    $("#featureSectionBottomBorderContainer img").css("width", "100%");
}

function logoLoadCallback(logo){
    /*logo.css.("height", logo.height());*/
    $("#logoText").animate({opacity: 100}, logoTextFadeInSpeed);
}

function imgFadeInAfterLoad(jqImgTagObj){
    jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
}

function centerImgAfterLoad(tileImgContainer){
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
}




function trace(str){
    console.log(str);
}
    
    
});