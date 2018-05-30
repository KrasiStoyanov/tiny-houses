$(document).ready(function () {
	$('#for-sale .controls .circle').click(function () {
		$('#for-sale .controls .circle').removeClass('active');

		$(this).addClass('active');

		$('#for-sale').gradientify({
			gradients: [
				{ start: [37, 117, 252, 1], stop: [106, 17, 203, 1] },
				{ start: [255,103,69], stop: [240,154,241] },
				{ start: [37, 117, 252, 1], stop: [106, 17, 203, 1] },
			],
			angle: '-29.54deg',
			transitionTime: 0.3,
			iterations: 1
		});
	});
});