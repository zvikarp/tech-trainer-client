const PROXY = "https://board2675.herokuapp.com";

async function authSignin(email, password) {
    const userData = {
        email: email,
        password: password
    };
    let res = { success: false, message: "unknowen error" };
    res = await fetch(PROXY + '/api/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => {
        if (data.success === true) {
            res.success = true;
            res.message = "successfuly signedin to the account";
            return res;
        }
        else {
            res.message = "errors signingin to account: " + JSON.stringify(data);
            return res;
        }
    }).catch(error => {
        res.success = false;
        console.log(res.message + ": " + error);
        return res;
    });
    return res;
}

export default authSignin;