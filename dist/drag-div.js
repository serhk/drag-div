'use strict';

var dragDiv = (function() {

	var el, diffx, startx;
	
	function mouseDown(e) {
		if (!e) { e = window.event; }
		el = this;
		diffx = 0;
		startx = e.clientX + el.scrollLeft;
		addEventHandlers();
	}
	
	function mouseMove(e) {
		if (!e) { e = window.event; }
		diffx = (startx - (e.clientX + el.scrollLeft));
		el.scrollLeft += diffx;
	}
	
	function mouseUp() {
		var start = 1,
			animate = function() {
				var step = Math.sin(start);
				if (step <= 0) {
					window.cancelAnimationFrame(animate);
				} else {
					el.scrollLeft += diffx * step;
					start -= 0.02;
					window.requestAnimationFrame(animate);
				}
			};
		animate();
		removeEventHandlers();
	}

	function addEventHandlers() {
		el.onmousemove = mouseMove;
		el.onmouseup = mouseUp;
		el.ondragstart = el.onselectstart = function() { return false; }
		document.onmouseup = removeEventHandlers; // mouseUp over target div
    }
	
    function removeEventHandlers() {
        el.onmousemove = el.onmouseup = el.ondragstart = el.onselectstart = null;
    }

	return {
		makeEvents: function(element){
			element.onmousedown = mouseDown;
			//element.scrollLeft = element.scrollWidth; // move to right div
		}
	}

})();