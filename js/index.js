/* global $, document, console, window, colorboxOptions, location, history */
(function() {

    //Run this JS soon as the js file loads
    //$({....}) waits until the document loads. $(){} <---- Function is same as $(document).ready(){}

    "use strict";
    var scrollTime = 500,
		loadingImage = "img/colorbox/loading.gif";

	var historySupport = !!(window.history && history.pushState);

    /*
       * Function defs
    */
    
	if (historySupport) {
		$(window).on("popstate", function() {
			updateFeature();
		});
	}

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

    var currentFeature;


    var updateFeature = function() {
        var path = location.pathname;
        var feature = path.slice(path.lastIndexOf("/")+1);

        //Return clauses

        if (feature.length === 0 || feature == "index.html") {
            return;
        }
        if(currentFeature == feature){
            return;
        } else {
            currentFeature = feature;
        }
        //end return clauses

        $("#tiles > div.feature").slideUp(0, function(){$(this).remove();});

        var square = $("#"+feature);

        /*We're determining whether this is a tile by checking to see if our
        "square" variable contains an <img> tag*/

        if(square.has("img").length > 0){
            //Is tile
            $("html, body").animate({scrollTop: square.offset().top+square.height()-32}, scrollTime);
            var href = "features/" + feature + ".html";
            $("#"+feature).after($("<div class=feature><img src=\""+loadingImage+"\" /></div>").load(href, ajaxCallback));

        } else {
            //Is nav item
            $("html, body").animate({scrollTop: 0}, scrollTime);
            var href = "/" + feature + ".html";
            $("#tiles").prepend($("<div class=feature><img src=\""+loadingImage+"\" /></div>").load(href, ajaxCallback));
        }

        function ajaxCallback(response, status, xhr) {
            if (status !== "success") {
                console.log("Error: "+xhr.status+" "+xhr.statusText+": "+href);
                // The browser will give a familiar error message if we do
                // it the old fashioned way.
                // However, after this, back is broken in IE and Chrome.
                window.location.href = feature;
                return;
            }
        }
    };

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

    function clearColorClasses(element) {
        var i,
            classes = (element.attr("class") || "").split(" ");
        for (i = 0; i < classes.length; i++) {
            if (classes[i].substring(0, "color-".length) === "color-") {
            element.removeClass(classes[i]);
            }
        }
    }



    /*
       * Runs when the rest of the document has loaded, this is like an init() function
    */

    $(function(){
        randomizeHeaderColor();

        $("#tiles > a").on("click", function(event) {
			if (!historySupport) {
				// let the browser treat it like a regular link
				return;
			}
			event.preventDefault();

			history.pushState(null, null, $(this).attr("href"));
			updateFeature();
		});

        $("nav li a").click(function(event) {

			event.preventDefault();

			$("nav li a").removeClass("current");

			// addClass on header item
			var destination = this.href;
			$("nav li a").filter(function() {
				return this.href === destination;
			}).addClass("current");

			randomizeHeaderColor();

           if (!historySupport) {
				// let the browser treat it like a regular link
				return;
			}

			event.preventDefault();

			history.pushState(null, null, $(this).attr("href"));
			updateFeature();
		});

		$("<img />").attr("src", loadingImage);



        /*
            * With permission, perhaps we can delete this function? Or place these comments somewhere else
        */
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



        }());


        /*
        function imgFadeInAfterLoad(jqImgTagObj){
            jqImgTagObj.animate({opacity: 100}, imgFadeInSpeed);
        }
        */
    });
}());
