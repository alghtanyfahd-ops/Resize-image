// Pi Network SDK

Pi.init({
    version: "2.0",
    sandbox: true
});


window.loginPi = function(){

    Pi.authenticate(
        ["username"],
        function(auth){

            console.log(
                "Pi user:",
                auth.user.username
            );


            const box =
            document.getElementById("piUser");


            if(box){

                box.textContent =
                "مرحباً " +
                auth.user.username;

            }


            localStorage.piUser =
            auth.user.username;


        },

        function(error){

            console.log(
                "Pi Login Error",
                error
            );

        }

    );

};
