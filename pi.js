let piUser = null;
let accessToken = null;

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
        accessToken = auth.accessToken;

        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                accessToken: accessToken
            })
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error("Pi verification failed");
        }

        localStorage.setItem("piUser", piUser.username);
        localStorage.setItem("piUid", result.user.uid);

        const user = document.getElementById("piUser");

        if (user) {
            user.textContent = "مرحباً " + piUser.username;
        }

        enterApp();

    } catch (error) {
        console.error(error);
        alert("فشل التحقق من حساب Pi");
    }
};

window.getPiUser = function () {
    return piUser;
};

window.getAccessToken = function () {
    return accessToken;
};
