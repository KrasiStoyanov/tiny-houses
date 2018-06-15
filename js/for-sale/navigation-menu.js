// Get the modal
var modal = $('#navigation-menu');

// Get the button that opens the modal
var btn = $('#logo');

// Get the <span> element that closes the modal
var span = $('.close');

// When the user clicks on the button, open the modal
btn.on('click', function(e) {
	e.preventDefault();
    modal.css('display', 'block');
});

// When the user clicks on <span> (x), close the modal
span.on('click', function() {
    modal.css('display', 'none');
});

// When the user clicks anywhere outside of the modal, close it
$(window).on('click', function(event) {
    if (event.target == modal) {
    	modal.css('display', 'none');
    }
});
