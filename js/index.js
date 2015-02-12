/* global $, document, console, window, colorboxOptions, location, history */
(function() {
    "use strict";
    var revealTime = 500,
		motionRateCap = 1000, // pixels per second
		scrollTime = 500,
		loadingImage = "img/spiffygif_30x30_360.gif",
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

	/*
		Use setMotion to add new motions. Use scroll to set the scroll
		motion.

		startTime:     usually set by setMotion
		startLocation: value at motion start
		rate:          amount value changes per ms. May be negative. Calculate
					   using motionRate.
		endLocation:   function returning value at motion end
		move:          function taking a number argument giving the location
		               to move to
		next:          optional: function to call after animation completes

		Why reimplement animation? Because both jQuery animation and
		Velocity end animations after a set time, speeding their rate
		as needed to do so. Here, the destination may be changing in
		unpredictable ways, causing the rate to change similarly. In
		contrast to others, these animations pick their rate when created
		and continue chugging along until they reach the target value, no
		matter how it has changed in the meantime. The scroll animation
		has even weirder end conditions.
	*/
	var motions = {};
	// scrollMotion is separate because it must run last. It also has weird
	// termination requirements and it is the only one like that.
	var scrollMotion;
	// inMotion is used to prevent duplicate calls to requestAnimationFrame.
	var inMotion = false;

	// motionRate calculates the value for the rate property of a motion.
	// Duration is in ms.
	var motionRate = function(from, to/*, duration*/) {
		if (from < to) {
			return motionRateCap / 1000;
		} else {
			return -(motionRateCap / 1000);
		}
		// return (to - from) / duration;
	};

	// move is shared between all motions, including the scroll motion.
	var move = function(motion, now) {
		var done = false;
		var elapsedTime = now - motion.startTime;
		var elapsedLocation = motion.startLocation + elapsedTime * motion.rate;

		// cap motion
		var endLocation = motion.endLocation();
		var intendedDistance = Math.abs(motion.startLocation - endLocation);
		var currentDistance = Math.abs(motion.startLocation - elapsedLocation);
		if (currentDistance >= intendedDistance) {
			elapsedLocation = endLocation;
			done = true;
		}

		motion.move(elapsedLocation);
		return done;
	};

	var areFeaturesClosing = function() {
		for (var name in motions) {
			if (!motions.hasOwnProperty(name)) {
				continue;
			}
			if (!isFeatureName(name)) {
				continue;
			}
			if (motions[name].rate >= 0) {
				continue;
			}
			return true;
		}
		return false;
	};

	// scrollCurrent returns the current scroll value (pixel distance between
	// document top and viewport top.
	var scrollCurrent = function() {
		return $(document).scrollTop();
	};

	// animate is the animation loop.
	var animate = function() {
		var nMotions = 0;
		var now = $.now();
		for (var name in motions) {
			if (!motions.hasOwnProperty(name)) {
				continue;
			}
			var motion = motions[name];
			var done = move(motion, now);

			if (done) {
				delete motions[name];
				if (motion.next) {
					motion.next();
				}
			} else {
				nMotions++;
			}
		}

		if (scrollMotion) {
			var onTarget = move(scrollMotion, now);
			if (onTarget && !areFeaturesClosing()) {
				scrollMotion = undefined;
			}
		}

		if (nMotions > 0 || scrollMotion) {
			window.requestAnimationFrame(animate);
		} else {
			inMotion = false;
		}
	};

	var kickAnimation = function() {
		if (!inMotion) {
			inMotion = true;
			window.requestAnimationFrame(animate);
		}
	};

	// setMotion sets the motion for name.
	//
	// isFeatureName(name) should be true if the motion is for a feature
	// opening or closing, however, this feature (heh) is not currently
	// used. It remains to save work should it prove useful in future.
	var setMotion = function(name, motion) {
		motion.startTime = $.now();
		motions[name] = motion;
		kickAnimation();
	};

	// scroll sets the scroll motion.
	var scroll = function(to) {
		// this animates the distance between viewport top and to(). That
		// is subtly and critically different from animating the scroll
		// position.
		var distance = to() - scrollCurrent();
		scrollMotion = {
			startTime: $.now(),
			startLocation: distance,
			rate: motionRate(distance, 0, scrollTime),
			endLocation: newZero(),
			move: function(distance) {
				$("html, body").scrollTop(to() - distance);
			}
		};
		kickAnimation();
	};

	var isFeatureName = function(name) {
		return name.slice(0, "feature:".length) === "feature:";
	};

	var featureName = function(slider) {
		var cs = $(slider.children()[0]).attr("class").split(" ");
		for (var i = 0; i < cs.length; i++) {
			if (cs[i] !== "feature") {
				return cs[i];
			}
		}
		return "";
	};

	var newZero = function() {
		return function() {
			return 0;
		};
	};

	var newRemover = function(element) {
		return function() {
			element.remove();
		};
	};

	var newCorrectHeightGetter = function(slider) {
		var feature = $(slider.children()[0]);
		return function() {
			return feature.height();
		};
	};

	var newHeightSetter = function(element) {
		return function(height) {
			element.height(height);
		};
	};

	var newScrollEndLocation = function(feature) {
		var scrollEndLocation;
		if (feature === "index") {
			scrollEndLocation = function() {
				return 0;
			};
		} else if ($("#tiles #"+feature).length > 0) {
			// feature
			var tile = $("#"+feature);
			scrollEndLocation = function() {
				// The bottom of the element is inside the visible color
				// due to padding.
				return tile.offset().top + tile.height();
			};
		} else {
			// nav
			// this won't move
			var location = $("header nav").offset().top;
			scrollEndLocation = function() {
				return location;
			};
		}
		return scrollEndLocation;
	};

	var currentFeatureName = function() {
		var path = location.pathname;
		var name = path.slice(path.lastIndexOf("/")+1);
		if (name.length === 0 || name === "index.html") {
			name = "index";
		}
		return name;
	};

	// groomFeatures should be called whenever something has happened that
	// might cause a feature to be out of whack (perhaps an image loaded in).
	// It may be called when the user has not initiated an action.
	var groomFeatures = function(current) {
		if (current === undefined) {
			current = currentFeatureName();
		}

		var sliders = $("div.slide");
		for (var i = 0; i < sliders.length; i++) {
			var slider = $(sliders[i]);
			var name = featureName(slider);
			var motionName = "feature:"+name;
			var motion = motions[motionName];
			var from;
			if (name === current) {
				// make sure it is open or opening
				if (motion !== undefined && motion.rate > 0) {
					continue;
				}
				var correctHeight = $(slider.children()[0]).height();
				if (slider.height() === correctHeight) {
					continue;
				}
				var to = newCorrectHeightGetter(slider);
				from = slider.height();
				setMotion(motionName, {
					startLocation: from,
					rate: motionRate(from, to(), revealTime),
					endLocation: to,
					move: newHeightSetter(slider)
				});
			} else {
				// make sure it is closing
				if (motion !== undefined && motion.rate < 0) {
					continue;
				}
				from = slider.height();
				setMotion(motionName, {
					startLocation: from,
					rate: motionRate(from, 0, revealTime),
					endLocation: newZero(),
					move: newHeightSetter(slider),
					next: newRemover(slider)
				});
			}
		}
	};

	// updateFeature should be called when the user has initiated an action
	// that might have changed the state of the features, including when
	// loading the page for the first time.
    var updateFeature = function() {
		var current = currentFeatureName();

		// This appears to ignore clicks if the feature is already loaded
		// and the page is still scrolled to it. A fix for that could be
		// invented, but maybe later.

		$("nav a").removeClass("current");
		$("nav a[href='"+current+"']").addClass("current");

		scroll(newScrollEndLocation(current));

		if (current !== "index" && $("div."+current).length === 0) {
			var spinner = $("<div class=spinner><img src=\""+loadingImage+"\" /></div>")
				.hide()
				.insertAfter("#insert-"+current)
				.fadeIn(loadingRevealTime);

			var href = "features/" + current + ".html";
			$.ajax({
				url: href,
				dataType: "html",
				error: function(xhr) {
					// BUG(sk): test error message with 404
					console.log("Error: "+xhr.status+" "+xhr.statusText+": "+href);

					// The browser will give a familiar error message if we do
					// it the old fashioned way.
					// However, after this, back is broken in IE and Chrome.
					window.location.href = current;
					return;
				},
				success: function(data) {
					spinner.fadeOut({
						duration: loadingRevealTime,
						queue: false,
						complete: function() {
							$(this).remove();
						}
					});
					$(data)
						.height(0)
						.insertAfter(spinner)
						.find("img.work").each(function() {
							if (this.complete) {
								return;
							}
							$(this).on("load", function() {
								groomFeatures();
							});
						});
					$("div.feature-images a").colorbox(colorboxOptions);
					groomFeatures();
				}
			});
		}
		groomFeatures(current);
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
        randomizeHeaderColor();

		// If this is a fallback, this will scroll to its location.
		updateFeature();

        $("#backToTopBtnContainer").on("click", function(){
			// This is slow. It could be fixed. It's not worth it right now.
			scroll(newZero());
        });

		if (historySupport) {
			$("<img />").attr("src", loadingImage);

			$("#tiles a, nav a, footer a, #logo").on("click", function(event) {
				event.preventDefault();
				randomizeHeaderColor();
				history.pushState(null, null, $(this).attr("href"));
				updateFeature(0);
			});
		}
	});
}());
