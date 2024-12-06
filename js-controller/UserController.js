$(document).ready(function () {
    $(window).on("hashchange", function () {
        const hash = window.location.hash;

        if (hash === "#login-section") {
            $("#dashboard-section").css("display", "none");
            $("#login-section").css("display", "block");
        } else if (hash === "#dashboard-section") {
            $("#login-section").css({display:'none'});
            $("#signup-section").css({display:'none'});
            $("#dashboard-section").css({display: 'block'});
            $("#home").css({display:'none'});
            $("#navLink-section").show();
            $('#field-section').css({display: 'none'});
            $('#crop-section').css({display: 'none'});
            $('#staff-section').css({display: 'none'});
            $('#vehicle-section').css({display: 'none'});
            $('#equipment-section').css({display: 'none'});
            $('#monitoring-section').css({display: 'none'});
        }
    });
});

function signUp() {
    event.preventDefault();
    var email = $("#signupEmail").val();
    var password = $("#signupPassword").val();
    var role = $("#login-role").val();

    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/auth/signup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password,
            role: role,
        }),
        success: (response) => {
            Swal.fire({
                title: "Welcome",
                text: "You have successfully Signed Up",
                icon: "success",
            });
            console.log("Signup successful:", response);
            localStorage.setItem("token", response.token);
            window.location.href = "#dashboard-section";
        },
        error: (error) => {
            Swal.fire({
                title: "Welcome",
                text: "Sign Up Unsuccessfully",
                icon: "error",
            });
            console.error("Signup failed:", error);
            console.error("Token is missing in the response");
        },
    });
}
function signIn() {
    event.preventDefault();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/auth/signIn",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password,
        }),
        success: (response) => {
            Swal.fire({
                title: "Welcome to Green Shadow",
                text: "You have successfully Logged In",
                icon: "success",
            });
            console.log("Signup successful:", response);
            localStorage.setItem("token", response.token);
            window.location.href = "#dashboard-section";
            console.log("Hash after login:", window.location.hash);
        },
        error: (error) => {
            Swal.fire({
                title: "Welcome to Green Shadow",
                text: "Login unsuccessfull",
                icon: "error",
            });
            console.error("Signup failed:", error);
        },
    });
}