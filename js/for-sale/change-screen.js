var GRADIENTS = [
	{ start: [37, 117, 252], stop: [106, 17, 203] },
	{ start: [246, 211, 101], stop: [253, 160, 133] },
	{ start: [196, 113, 245], stop: [250, 113, 205] },
];

var HEADINGS = [
	'Tiny house for sale',
	'Tiny house 2 for sale',
	'Tiny house 3 for sale'
];

var DESCRIPTIONS = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget est turpis. Duis ultricies odio id neque dignissim, non lacinia mi laoreet. Vestibulum a finibus leo.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget est turpis. Duis ultricies odio id neque dignissim, non lacinia mi laoreet. Vestibulum a finibus leo.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget est turpis. Duis ultricies odio id neque dignissim, non lacinia mi laoreet. Vestibulum a finibus leo.'
];

var PRCIES = [
	'$48,000',
	'$150,000',
	'$350,000'
];

var IMAGE_URLS = [
	'../images/for-sale/3d-house-1.svg',
	'../images/for-sale/3d-house-1.svg',
	'../images/for-sale/3d-house-1.svg'
];

var IMAGE_SIDES = [
	'right',
	'left',
	'right'
];

var previousScreenId = 0;
var nextScreenId = 0;
var forSaleBackground = {};

$(document).ready(function () {
	forSaleBackground = $('#for-sale').gradientify({
		transitionTime: 0.8,
		iterations: 1
	});

	$('#for-sale .controls .circle').click(function () {
		if ($('#for-sale').hasClass('done') === true) {
			var controlCircles = $('#for-sale .controls .circle');
			nextScreenId = $(controlCircles).index(this);
			if (previousScreenId !== nextScreenId) {
				switchScreen(this);
			}
		}
	});
	
	var debounceScroll = _.debounce(function (event) {
		switchOnScroll(event);
	}, 250);

	$(window).on('mousewheel', debounceScroll);
});

function switchActiveCircle () {
	var nextCircle = $('#for-sale .controls .circle')[nextScreenId];
	$('#for-sale .controls .circle').removeClass('active');

	$(nextCircle).addClass('active');
}

function switchOnScroll (scrollEvent) {
	if ($('#for-sale').hasClass('done') === true) {
		var deltaY = scrollEvent.deltaY;
		if (deltaY === -1) {
			nextScreenId += 1;
		} else if (deltaY === 1) {
			nextScreenId -= 1;
		}
		
		if (nextScreenId >= $('#for-sale .controls .circle').length) {
			nextScreenId = 0;
		} else if (nextScreenId < 0) {
			nextScreenId = $('#for-sale .controls .circle').length - 1;
		}

		switchActiveCircle();
		switchScreen();
	}
}

function switchScreen (element) {
	$('#for-sale').removeClass('done');

	switchActiveCircle();
	
	var previousGradient = GRADIENTS[previousScreenId];
	var nextGradient = GRADIENTS[nextScreenId];
	forSaleBackground.updateSettings({
		gradients: [
			previousGradient,
			nextGradient
		],
		angle: '-29.54deg'
	});

	var heading = $('#for-sale .content .heading');
	var description = $('#for-sale .content .description');
	var button = $('#for-sale .content .btn');
	var image = $('#for-sale .content .image');

	if (nextScreenId > previousScreenId) {
		heading.addClass('fade-up');
		description.addClass('fade-up');
		button.addClass('fade-up');
		image.addClass('fade-up');
	} else {
		heading.addClass('fade-down');
		description.addClass('fade-down');
		button.addClass('fade-down');
		image.addClass('fade-down');
	}
	
	window.setTimeout(function () {
		var contentWrapper = $('#for-sale .content .content-wrapper');
		var imageWrapper = $('#for-sale .content .image-wrapper');
		var container = contentWrapper.parent().parent();
		switch (IMAGE_SIDES[nextScreenId]) {
			case 'left':
				container
					.removeClass('pr-0')
					.addClass('pl-0');
				imageWrapper
					.insertBefore(contentWrapper)
					.removeClass('offset-1')
					.addClass('text-left')
					.removeClass('text-right');

				contentWrapper.addClass('offset-1');
				container.css('padding-right', '105px');

				break;
			case 'right':
				container
					.removeClass('pl-0')
					.addClass('pr-0');
				imageWrapper
					.insertAfter(contentWrapper)
					.addClass('offset-1')
					.removeClass('text-left')
					.addClass('text-right');

				contentWrapper.removeClass('offset-1');
				container.css('padding-right', '70px');

				break;
		}

		heading.text(HEADINGS[nextScreenId]);
		description.text(DESCRIPTIONS[nextScreenId]);
		button.find('.normal').text(PRCIES[nextScreenId]);
		image.attr('src', IMAGE_URLS[nextScreenId]);

		if (nextScreenId > previousScreenId) {
			heading.addClass('scroll-up');
			description.addClass('scroll-up');
			button.addClass('scroll-up');
			image.addClass('scroll-up');
		} else {
			heading.addClass('scroll-down');
			description.addClass('scroll-down');
			button.addClass('scroll-down');
			image.addClass('scroll-down');
		}

		window.setTimeout(function () {
			heading
				.removeClass('fade-down')
				.removeClass('fade-up')
				.removeClass('scroll-down')
				.removeClass('scroll-up');
			description
				.removeClass('fade-down')
				.removeClass('fade-up')
				.removeClass('scroll-down')
				.removeClass('scroll-up');
			button
				.removeClass('fade-down')
				.removeClass('fade-up')
				.removeClass('scroll-down')
				.removeClass('scroll-up');
			image
				.removeClass('fade-down')
				.removeClass('fade-up')
				.removeClass('scroll-down')
				.removeClass('scroll-up');
			
			$('#for-sale').addClass('done');
			previousScreenId = nextScreenId;
		}, 500);
	}, 500);
}