/* global $, console */
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
    var $feature = $("#featureSection");
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
        
        $("#tiles > a").on("click", function(event) {
	    event.preventDefault();
            setFeature($(this).attr("href"));
        });
        
        randomizeHeaderColor();
        $("nav li a").click(onNavItemClick);
    }

    // setFeature loads feature and displays it. feature is named like
    // "disney".
    function setFeature(feature){
        if(feature == currentFeature){
            return;
        }
        currentFeature = feature;
        $("body, html").animate({scrollTop : 0}, scrollToTopOfPageSpeed);
        trace("");
        $feature.animate({opacity:0}, featureFadeOutSpeed, function(){
            $feature.load("content/" + feature + ".html", function() {
		$("div.feature-images > a").colorbox(colorboxOptions);
		
                /*STYLE 1 --- THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT, AND THEN THE FEATURE FADES IN*/
                $("#everythingBelowTheFeatureSection").animate({top:($feature.offset().top + $feature.height() + "px")}, featureSlideRevealSpeed, function(){$feature.animate({opacity:100}, featureFadeInSpeed);});
                
                //$feature.find("img").each().load(function(){revealFeatureSection();});
                //$feature.find("img").each().load(function(){});
                //$feature.find("img").each(function(){});
                featureSectionNumImgs = $feature.find("img").length;
                $feature.find("img").each(function(){$(this).load(revealFeatureSection())});
                //$feature.find("img").each($(this).load(revealFeatureSection();));
                
            });
                /*END STYLE 1*/
                
                /*STYLE 2 --- THE CONTENT LOADS AND FADES IN WHILE THE PAGE SLIDES TO FIT THE NEW LOADED CONTENT*/
            /*$("#everythingBelowTheFeatureSection").animate({top:($feature.offset().top + $feature.height() + "px")}, featureSlideRevealSpeed);
                $feature.animate({opacity:100}, featureFadeInSpeed);
            });*/
                /*END STYLE 2*/
                
        });
    }
    
    function revealFeatureSection(){
        /*trace("image loaded!");
        $("#everythingBelowTheFeatureSection").animate({top:($feature.offset().top + $feature.height() + "px")}, featureSlideRevealSpeed);
        $feature.animate({opacity:100}, featureFadeInSpeed);
        */
    }
    
    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }
    
    function onNavItemClick(event) {
	event.preventDefault();

	$("nav li a").removeClass("current");

	// addClass on both header and footer item
	var href = $(this).attr("href");
	$("nav li a").filter(function() {
	    return $(this).attr("href") === href;
	}).addClass("current");

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
