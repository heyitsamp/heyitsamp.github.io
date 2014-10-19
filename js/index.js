$(function(){

    /******************************
    PUBLIC PROPERTIES
    *******************************/
    var colorList = [
        "#00ffff",
        "#33ff00",
        "#ff33cc",
        "#ff0066",
        "#ff9900",
        "#ffcc00"
    ]
    
    var colorsUsedAlready = [];
    
    /******************************
    PRIVATE PROPERTIES
    *******************************/
    var imgFadeInSpeed = 3000;
    var logoTextFadeInSpeed = 3000;
    var featureSectionJQueryObj = $("#featureSection");


    /**********************
    COMMENCE THE INITIATION!!! MUAHAHAHAHAAAAA!!!!
    ***********************/
    initUI();



    function initUI(){
        /*This is where the image loading magic happens!*/
        /*
        var j = companyNames.length;
        for(var i=0; i<j; i++){
            var tileImgContainer = $("#tile" + i + " img");
            
            tileImgContainer.attr("src", companyNames[i] + ".png").load(function(){
                centerImgAfterLoad($(this))
            });
        }
*/
        /*
        Every image starts out invisible, until it loads, and then
        fades in. This is fine for now. It stops jumpyness on every image
        */
        
        //it looks very ugly if this isn't hidden in JavaScript
        //$("#logoLockup, nav").css("opacity", "0");
        $("img").css("opacity", "0").load(function(){
            imgFadeInAfterLoad($(this));
        });

        /* SPECIAL EFFECT
        Haven't done this yet,
        want to cycle through the colors
        quickly in a special effect
        -----------------------------------
        Need to do this for the effect----->
        Preload each logo version so we can 
        cycle thru in a cool effect at the top 
        */



        /*Randomize the amp logo*/
        $("#logoObjectElement").load(function(){randomizeHeaderColor();});
        //randomizeHeaderColor();
        /*Setup the nave buttons to randomize
        the logo every time you click a nav
        button.*/
        $("nav li").click(onNavItemClick);
    }

    function setFeature(feature){
        featureSectionJQueryObj.empty();
        featureSectionJQueryObj.append(feature);
    }

    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }

    function onNavItemClick() {
        //alsdjflkasdjflkjsdlfjlksdjflkasdjflksjdlfkjasdfjkalsdfjaksdf
    }

    function randomizeHeaderColor() {
        /*Random color*/
        var randColor = colorList[Math.floor(Math.random()*colorList.length)];
        
        //$("#logoLockup, nav").css("opacity", "0");
        //change to random color
        $("#logoText").css("color", randColor);
        $("#logoObjectElement").contents().find(".svgPathElement").attr("fill", randColor);
        $("nav a").css("color", randColor);
        //$("#logoLockup, nav").animate({opacity: 100}, 3000);
        trace("hello?");
    }


    function trace(str){
        console.log(str);
    }
    
    
});
