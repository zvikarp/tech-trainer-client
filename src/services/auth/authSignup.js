const PROXY = "http://localhost:5000";

async function authSignup(name, email, password) {
    const newUserData = {
        name: name,
        email: email,
        password: password
    };
    let res = { success: false, message: "unknowen error" };
    res = await fetch(PROXY + '/api/auth/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
    }).then(response => response.json()).then(data => {
        if (data._id) {
            res.success = true;
            res.message = "successfuly created new account";
            console.log(res.message + " with id: " + data._id);
            return res;
        }
        else {
            res.message = "errors creating account: " + JSON.stringify(data);
            return res;
        }
    }).catch(error => {
        res.success = false;
        console.log(res.message + ": " + error);
        return res;
    });
    return res;
}

export default authSignup;
