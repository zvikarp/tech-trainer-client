import NewUser from "../models/NewUser"

const PROXY = "http://localhost:5000";

function authSignup(newUser) {
    let res = { success: false, message: "unknowen error" };
    fetch(PROXY + '/api/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(NewUser.toJson(newUser))
    }).then(response => response.json()).then(data => {
        if (data._id) {
            res.success = true;
            res.message = "successfuly created new account";
            console.log(res.message + " with id: " + data._id);
            return res;
        }
        else {
            res.message = "errors creating account: " + data;
            return res;
        }
    }).catch(error => {
        res.success = false;
        console.log(res.message + ": " + error);
        return res;
    });
}

export default authSignup;