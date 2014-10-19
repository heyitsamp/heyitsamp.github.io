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
        $("#logoObjectElement").load(function(){randomizeHeaderColor()});
        //randomizeHeaderColor();
        /*Setup the nave buttons to randomize
        the logo every time you click a nav
        button.*/
        //$("nav li").click(randomizeLogo);



        /*Set random feature (Just a random tile for now)*/
        //LOOKING AT CLONE AND CREATING AN EMPTY
        //jQuery object
        var tilesContainer = $("#tilesContainer");
        var numTiles = tilesContainer.children().length;
        /********eq*********
        parent.eq(index) let's you grab a child @ specific index*/
        var randomTile = tilesContainer.eq(Math.floor(Math.random()*numTiles));
        //$("#featureSection").append(randomTile);
        //setFeature(randomTile);



        /*
        Set the height of the html element --- logoLockup.. 
        Otherwise the website jumps
        when this image loads
        ------------------------------------------------------
        $("#logoLockup").css("height", $("logoImgContainer img").clientHeight);
        Hardcoded =((((( I couldn't get the above to work and was spending too
        much time on it=((((
        */

        //$("#logoLockup").css("height", "115");
    }

    function setFeature(feature){
        /*Feature should always be a div*/
        featureSectionJQueryObj.empty();
        featureSectionJQueryObj.append(feature);
        /*featureSectionJQueryObj.replaceWith(feature);???
        Actually this won't exactly work*/
    }

    /*
    This has been deprecated since the logo switched to SVG
    
    function logoLoadCallback(logo){
        $("#logoText").animate({opacity: 100}, logoTextFadeInSpeed);
    }*/
    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }

    function randomizeHeaderColor() {
        /*Random number*/
        var randColor = colorList[Math.floor(Math.random()*colorList.length)];
        /*Hiding the logo text*/
        
        trace("1");
        
        $("#logoText").css("color", randColor).css("opacity", "0").animate({opacity: 100}, imgFadeInSpeed);
        
        trace("2");
        //$("#logo").setAttribute("fill", "white");
        //$("#logo").css("opacity", ".5");
        //$("#logoObject .svgPathElement").setAttribute("fill", "white");
        //$("#logoObject path");
        //trace("These are the children" + $("#logoObject path"));
        var a = document.getElementById("logoObjectElement");
        var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
        var delta = svgDoc.getElementById("delta"); //get the inner element by id
            delta.addEventListener("mousedown",function(){alert('hello world!')},false);    //add behaviour
        trace("3");
        
        
        
        //$("#logoText").css("color", randLogo[1]);
        $("nav a").css("color", randColor);
        trace("4");
    }


    function trace(str){
        console.log(str);
    }
    
    
});
