/* global $, document, console, window, colorboxOptions, location, history */
(function() {
    "use strict";
    var scrollTime = 500,
		loadingImage = "img/colorbox/loading.gif";

	var historySupport = !!(window.history && history.pushState);

    var updateFeature = function() {
		var path = location.pathname;
		var feature = path.slice(path.lastIndexOf("/")+1);

		$("div.feature").remove();
		if (feature.length === 0 || feature === "index.html") {
			return;
		}

		var square = $("#"+feature);
		$("html, body").animate({scrollTop: square.offset().top+square.height()-32}, scrollTime);

	    var href = "features/" + feature + ".html";
		$("#"+feature).after($("<div class=feature><img src=\""+loadingImage+"\" /></div>").load(href, function(response, status, xhr) {
			if (status !== "success") {
				console.log("Error: "+xhr.status+" "+xhr.statusText+": "+href);

				// The browser will give a familiar error message if we do
				// it the old fashioned way.
				// However, after this, back is broken in IE and Chrome.
				window.location.href = feature;
				return;
			}
			$("div.feature-images > a").colorbox(colorboxOptions);
		}));
    };
    
	if (historySupport) {
		$(window).on("popstate", function() {
			updateFeature();
		});
	}

	$(document).ready(function() {
		$("#tiles > a, #navv > a").on("click", function(event) {
			if (!historySupport) {
				// let the browser treat it like a regular link
				return;
			}
			event.preventDefault();

			console.log($(this).attr("href"));
			history.pushState(null, null, $(this).attr("href"));
			updateFeature();
		});
		$("<img />").attr("src", loadingImage);
	});
}());
$(function(){
    "use strict";

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
    ];
    
    /******************************
    PRIVATE PROPERTIES
    *******************************/
    // var imgFadeInSpeed = 3000;
    var currentHeaderColor;

    /**********************
    COMMENCE THE INITIATION
    ***********************/
    (function () {

		/* BUG: broken in IE
			$("img").css("opacity", "0").load(function(){
				imgFadeInAfterLoad($(this));
			});
		*/

	    // zero the height of the old element and remove it
	    // xhr into a new element and then set it's height

	    // how to load something zero height and animate it's height to full?

	    // how to xhr not to element?
	    // or xhr to zero height element?

	    // in load success, check time
	    // set timeout if not long enough
	    // otherwise call directly

        randomizeHeaderColor();

        $("nav li a").click(function(event) {
			event.preventDefault();

			$("nav li a").removeClass("current");

			// addClass on header item
			var destination = this.href;
			$("nav li a").filter(function() {
				return this.href === destination;
			}).addClass("current");

			randomizeHeaderColor();
		});

    }());


	/*
    function imgFadeInAfterLoad(jqImgTagObj){
        jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
    }
	*/
    
    function clearColorClasses(element) {
		var i,
			classes = (element.attr("class") || "").split(" ");
		for (i = 0; i < classes.length; i++) {
			if (classes[i].substring(0, "color-".length) === "color-") {
			element.removeClass(classes[i]);
			}
		}
    }
    
    function randomizeHeaderColor() {
		var body = $("body"),
			randColor = colorList[Math.floor(Math.random()*colorList.length)];
		clearColorClasses(body);
		if(currentHeaderColor === randColor){
			randomizeHeaderColor();
			return;
		}
		currentHeaderColor = randColor;
		body.addClass(randColor);
    }
});
