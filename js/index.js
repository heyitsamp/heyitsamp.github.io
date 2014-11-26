/* global $, document, console, window, colorboxOptions, location, history */
(function() {
    "use strict";
    var scrollTime = 500,
		revealTime = 500,
		loadingImage = "img/colorbox/loading.gif",
		loadingRevealTime = 50,
        colorList = [
			"color-cyan",
			"color-green",
			"color-magenta",
			"color-pink",
			"color-orange",
			"color-yellow"
		];

	var historySupport = !!(window.history && history.pushState);

	// updateFeature should be called whenever the URL might have changed,
	// including when loading this page for the first time.
	// It should make the document match the URL and scroll to whichever
	// feature may be loaded.
    var updateFeature = function(scrollLocation) {
		var path = location.pathname,
		    feature = path.slice(path.lastIndexOf("/")+1);

		// BUG: this reloads an existing feature. That's good if the user
		// clicked the same feature (because then the page doesn't seem to
		// have ignored the click), but bad if this is a newly loaded fallback.
		$("div.feature").slideUp({
			duration: revealTime,
			queue: false,
			complete: function() {
				$(this).remove();
			}
		});

        $("nav a").removeClass("current");

		if (feature.length === 0 || feature === "index.html") {
			return;
		}

        $("nav a[href='"+feature+"']").addClass("current");

		// Create a function to calculate the scroll destination because
		// it will be moving if there is an old feature higher on the page
		// animating closed while the scroll is happening.
		var scrollF,
		    square = $("#"+feature);
		if (scrollLocation !== undefined) {
			scrollF = function() { return scrollLocation; };
		} else {
			scrollF = function() {
				// The bottom of the element is inside the visible color
				// due to padding.
				return square.offset().top + square.height();
			};
		}
		$("html, body").animate({scrollTop: scrollF()}, {
			duration: scrollTime,
			step: function(_, fx) {
				fx.end = scrollF();
			}
		});

		var spinner = $("<div class=spinner><img src=\""+loadingImage+"\" /></div>")
			.hide()
			.insertAfter("#insert-"+feature)
			.slideDown(loadingRevealTime);

		var href = "features/" + feature + ".html";
		$.ajax({
			url: href,
			dataType: "html",
			error: function(xhr) {
				// BUG(sk): test error message with 404
				console.log("Error: "+xhr.status+" "+xhr.statusText+": "+href);

				// The browser will give a familiar error message if we do
				// it the old fashioned way.
				// However, after this, back is broken in IE and Chrome.
				window.location.href = feature;
				return;
			},
			success: function(data) {
				spinner.slideUp({
					duration: loadingRevealTime,
					queue: false,
					complete: function() {
						$(this).remove();
					}
				});
				$(data)
					.hide()
					.insertAfter(spinner)
					.slideDown(revealTime);
				$("div.feature-images > a").colorbox(colorboxOptions);
			}
		});
    };
    
	if (historySupport) {
		$(window).on("popstate", function() {
			updateFeature();
		});
	}

    var clearColorClasses = function(element) {
		var i,
			classes = (element.attr("class") || "").split(" ");
		for (i = 0; i < classes.length; i++) {
			if (classes[i].substring(0, "color-".length) === "color-") {
			element.removeClass(classes[i]);
			}
		}
    };
    
    var currentHeaderColor;
    var randomizeHeaderColor = function() {
		var body = $("body"),
			randColor = colorList[Math.floor(Math.random()*colorList.length)];
		clearColorClasses(body);
		if (currentHeaderColor === randColor) {
			randomizeHeaderColor();
			return;
		}
		currentHeaderColor = randColor;
		body.addClass(randColor);
    };

	$(document).ready(function() {
		$("#tiles > a").on("click", function(event) {
			if (!historySupport) {
				// let the browser treat it like a regular link
				return;
			}
			event.preventDefault();

			history.pushState(null, null, $(this).attr("href"));
			updateFeature();
		});
		$("nav a, footer a").on("click", function(event) {
			if (!historySupport) {
				// let the browser treat it like a regular link
				return;
			}
			event.preventDefault();

			randomizeHeaderColor();

			history.pushState(null, null, $(this).attr("href"));
			// BUG: scrolling to page top on nav click might not be ideal
			updateFeature(0);
		});

        $("#backToTopBtnContainer").on("click", function(){
            $("html, body").animate({ scrollTop: 0 }, scrollTime);
        });

		$("<img />").attr("src", loadingImage);

        randomizeHeaderColor();

		// If this is a fallback, this will scroll to its location.
		updateFeature();
	});
}());
