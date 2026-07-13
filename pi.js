let piUser = null;

async function initPi() {
    try {
        await Pi.init({
            version: "2.0",
            sandbox: true
        });

        console.log("Pi SDK Ready");
    } catch (error) {
        console.error("Pi SDK Error:", error);
    }
}

window.addEventListener("load", initPi);

window.loginAndEnter = async function () {
    try {
        const auth = await Pi.authenticate(["username"]);

        piUser = auth.user;

        localStorage.setItem("piUser", piUser.username);

        const user = document.getElementById("piUser");
        if (user) {
            user.textContent = "مرحباً " + piUser.username;
        }

        enterApp();

    } catch (error) {
        console.error(error);
        alert("فشل تسجيل الدخول بواسطة Pi");
    }
};

window.getPiUser = function () {
    return piUser;
};
