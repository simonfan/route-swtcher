define(['route-swtcher', 'lowercase-backbone', 'jquery', 'lodash'], function (routeSwtcher, backbone, $, _) {

	// instantiate new route swtcher
	var rswtcher = window.rswtcher = routeSwtcher();


	var $div1 = $('#div1'),
		$div2 = $('#div2'),
		$div3 = $('#div3');


	function animateOpacity($el, opacity) {
		return $el.animate({ opacity: opacity });
	}



	rswtcher.swtch({
		'route1': _.partial(animateOpacity, $div1, 1),
		'route1/:opacity': _.partial(animateOpacity, $div1),

		'route-all/:opacity': _.partial(animateOpacity, $div1),

		'default': _.partial(animateOpacity, $div1, 0)
	});


	rswtcher.swtch({
		'route-all/:opacity': _.partial(animateOpacity, $div2),

		'default': _.partial(animateOpacity, $div2, 0)
	});

	rswtcher.swtch({
		'route-all/:opacity': _.partial(animateOpacity, $div3),

		'default': _.partial(animateOpacity, $div3, 0)
	});

	backbone.history.start({ pushState: false });
});
