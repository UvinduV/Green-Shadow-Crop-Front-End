$("#login-section").css({display:'none'});
$("#signup-section").css({display:'none'});
$("#home").show();
$("#navbar-color").css({display:'block'});
$("#dashboard-section").css({display: 'none'});
$('#field-section').css({display: 'none'});


$('#btn-login-home').on('click', () => {
    $("#login-section").css({display:'block'});
    $("#signup-section").css({display:'none'});
    $("#dashboard-section").css({display: 'none'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'none'});
    $('#field-section').css({display: 'none'});

});

$('#show-signup').on('click', () => {
    $("#login-section").css({display:'none'});
    $("#signup-section").css({display:'block'});
    $("#dashboard-section").css({display: 'none'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'none'});
    $('#field-section').css({display: 'none'});

});

$('#show-login').on('click', () => {
    $("#login-section").css({display:'block'});
    $("#signup-section").css({display:'none'});
    $("#dashboard-section").css({display: 'none'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'none'});
    $('#field-section').css({display: 'none'});

});

$('#btn-login').on('click', () => {
    $("#login-section").css({display:'none'});
    $("#signup-section").css({display:'none'});
    $("#dashboard-section").css({display: 'block'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'block'});
    $('#field-section').css({display: 'none'});

});

$('#nav-dashboard').on('click', () => {
    $('#field-section').css({display: 'none'});
    $("#login-section").css({display:'none'});
    $("#signup-section").css({display:'none'});
    $("#dashboard-section").css({display: 'block'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'block'});

});

$('#nav-field').on('click', () => {
    $('#field-section').css({display: 'block'});
    $("#login-section").css({display:'none'});
    $("#signup-section").css({display:'none'});
    $("#dashboard-section").css({display: 'none'});
    $("#home").css({display:'none'});
    $("#navbar-color").css({display:'block'});
});






