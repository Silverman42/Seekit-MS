$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
     $('body').scrollspy({
        target: ".navbar",
        offset: 10
    });
    // Add smooth scrolling to all links inside a navbar
    $("#scroll-top a").on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash (#)
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
    //Submit product creation form
    $("#productSubmit").submit(function (e) { 
        e.preventDefault();
        var method = $(this).attr('method');
        var action = $(this).attr('action');
        var data = $(this).serialize();
        var form = $(this);
        $.ajax({
            type: method,
            url: action,
            data: data,
            success: function (response) {
                form[0].reset();
            },
            error: function () { 
                console.log('Could not connect with back-end');
            }
        });
    });
});