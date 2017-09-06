$(document).ready(function(){
    var frm = $('#Form1');

    frm.submit(function (e) {

        e.preventDefault();

        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(frm.serialize());
                $('#out').html(data);
            },
            error: function (data) {
                console.log('An error occurred.');
                $('#out').html(data);
            },
        });
    });
});