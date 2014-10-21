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
    var scrollToTopOfPageSpeed = 500;
    var featureSlideRevealSpeed = 500;
    var featureFadeOutSpeed = 150;
    var featureFadeInSpeed = 1000;
    var featureSectionJQueryObj = $("#featureSection");
    var currentFeature = "";


    /**********************
    COMMENCE THE INITIATION
    ***********************/
    initUI();



    function initUI(){
        $("#everythingBelowFeatureSection").css("top", $("header nav").offset().top + "px");
        
        $("#logoLockup, nav").css("opacity", "0");
        
        $("img").css("opacity", "0").load(function(){
            imgFadeInAfterLoad($(this));
        });
        
        $("#tilesContainer").children().click(function(){
            var theImgTagJQueryObj = $(this).find("img");
            setFeature(theImgTagJQueryObj.attr("src").substring(0,theImgTagJQueryObj.attr("src").lastIndexOf(".")))
        });
        
        $("#logoObjectElement").load(function(){randomizeHeaderColor();});
        $("nav li").click(onNavItemClick);
    }

    function setFeature(feature){
        trace(feature);
        trace(currentFeature);
        if(feature == currentFeature){
            return;
        }
        currentFeature = feature;
        trace("THIS IS SCROLLTOP" + $("body").scrollTop());
        $("body").animate({scrollTop : 0}, scrollToTopOfPageSpeed);
        
        featureSectionJQueryObj.animate({opacity:0}, featureFadeOutSpeed, function(){
            featureSectionJQueryObj.load("content/" + feature + ".html", function(){
                
                /*STYLE 1 --- THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT, AND THEN THE FEATURE FADES IN*/
                $("#everythingBelowFeatureSection").animate({top:(featureSectionJQueryObj.offset().top + featureSectionJQueryObj.height() + "px")}, featureSlideRevealSpeed, function(){featureSectionJQueryObj.animate({opacity:100}, featureFadeInSpeed);});
            });
                /*END STYLE 1*/
                
                /*STYLE 2 --- THE CONTENT LOADS AND FADES IN WHILE THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT*/
            /*$("#everythingBelowFeatureSection").animate({top:(featureSectionJQueryObj.offset().top + featureSectionJQueryObj.height() + "px")}, featureSlideRevealSpeed);
                featureSectionJQueryObj.animate({opacity:100}, featureFadeInSpeed);
            });*/
                /*END STYLE 2*/
                
        });
    }

    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }

    function onNavItemClick() {
        randomizeHeaderColor();
    }

    function randomizeHeaderColor() {
        var randColor = colorList[Math.floor(Math.random()*colorList.length)];
        
        $("#logoLockup, nav").css("opacity", "0");
        //change to random color
        $("#logoText").css("color", randColor);
        $("#logoObjectElement").contents().find(".svgPathElement").attr("fill", randColor);
        $("nav a").css("color", randColor);
        $("#logoLockup, nav").animate({opacity: 100}, imgFadeInSpeed);
    }


    function trace(str){
        console.log(str);
    }
    
    
});
