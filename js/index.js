$(function(){

    /******************************
    PUBLIC PROPERTIES
    *******************************/
    var colorList = [
	"color-cyan",
	"color-green",
	"color-magenta",
	"color-pink",
	"color-orange",
	"color-yellow"
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
    var featureSectionNumImgs = 0;
    var featureSectionImgIterator = 0;
    var currentFeature = "";
    
    /**********************
    COMMENCE THE INITIATION
    ***********************/
    initUI();
    
    function initUI(){
        $("#everythingBelowTheFeatureSection").css("top", $("header").height() + "px");
        
        $("img").css("opacity", "0").load(function(){
            imgFadeInAfterLoad($(this));
        });
        
        $("#tilesContainer").children().click(function(event){
            var theImgTagJQueryObj = $(this).find("img");
            var str = theImgTagJQueryObj.attr("src").replace("images/", "");
            str = str.replace(".png", "");
            str = str.replace(".svg", "");
            //setFeature(theImgTagJQueryObj.attr("src").substring(0,theImgTagJQueryObj.attr("src").lastIndexOf(".")))
            setFeature(str);
        });
        
        randomizeHeaderColor();
        $("nav li").click(onNavItemClick);
    }
    
    function setFeature(feature){
        if(feature == currentFeature){
            return;
        }
        currentFeature = feature;
        $("body, html").animate({scrollTop : 0}, scrollToTopOfPageSpeed);
        trace("");
        featureSectionJQueryObj.animate({opacity:0}, featureFadeOutSpeed, function(){
            featureSectionJQueryObj.load("content/" + feature + ".html", function(){
                /*STYLE 1 --- THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT, AND THEN THE FEATURE FADES IN*/
                $("#everythingBelowTheFeatureSection").animate({top:(featureSectionJQueryObj.offset().top + featureSectionJQueryObj.height() + "px")}, featureSlideRevealSpeed, function(){featureSectionJQueryObj.animate({opacity:100}, featureFadeInSpeed);});
                
                //featureSectionJQueryObj.find("img").each().load(function(){revealFeatureSection();});
                //featureSectionJQueryObj.find("img").each().load(function(){});
                //featureSectionJQueryObj.find("img").each(function(){});
                featureSectionNumImgs = featureSectionJQueryObj.find("img").length;
                featureSectionJQueryObj.find("img").each(function(){$(this).load(revealFeatureSection())});
                //featureSectionJQueryObj.find("img").each($(this).load(revealFeatureSection();));
                
            });
                /*END STYLE 1*/
                
                /*STYLE 2 --- THE CONTENT LOADS AND FADES IN WHILE THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT*/
            /*$("#everythingBelowTheFeatureSection").animate({top:(featureSectionJQueryObj.offset().top + featureSectionJQueryObj.height() + "px")}, featureSlideRevealSpeed);
                featureSectionJQueryObj.animate({opacity:100}, featureFadeInSpeed);
            });*/
                /*END STYLE 2*/
                
        });
    }
    
    function revealFeatureSection(){
        /*trace("image loaded!");
        $("#everythingBelowTheFeatureSection").animate({top:(featureSectionJQueryObj.offset().top + featureSectionJQueryObj.height() + "px")}, featureSlideRevealSpeed);
        featureSectionJQueryObj.animate({opacity:100}, featureFadeInSpeed);
        */
        
    }
    
    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }
    
    function onNavItemClick() {
        randomizeHeaderColor();
    }

    function clearColorClasses(element) {
	var i,
	    classes = (element.attr("class") || "").split(" ");
	for (i = 0; i < classes.length; i++) {
	    if (classes[i].substring(0, "color-".length) === "color-") {
		element.removeClass(classes[i]);
	    }
	}
    };
    
    function randomizeHeaderColor() {
	var body = $("body"),
            randColor = colorList[Math.floor(Math.random()*colorList.length)];
	clearColorClasses(body);
	body.addClass(randColor);
    }
    
    function trace(str){
        console.log(str);
    }
});
