import { AUTH_SERVER_URI, DATA_SERVER_URI } from "../config/config.js";

const user = {
    getCookie: (cookie) => {
        const escape = (s) => { 
            return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); 
        }

        var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(cookie) + '=([^;]*)'));
        return (match == null)? null : match[1];
    },

    setCookie: (value, expiresIn_min, name) => {
        const expiry = new Date();
        expiry.setTime(expiry.getTime() + (expiresIn_min * 60000));
        document.cookie = `${name}=${value}; expires=${expiry.toUTCString()}; path=/`
        // console.log(`Cookie ${name} Set`);
        return true
    },

    validate: async () => {
        const rTa = user.getCookie('rTa'),
                activeUser = { valid: false, user: { uid: null } }

        //Validating cookie
        if(rTa == null || rTa == 'null' || rTa == '') console.log("No Active Session");
        else {
            const session = { token: `Bearer ${rTa}` }
            await axios.post(`${AUTH_SERVER_URI}/candidate/valid`, session).then((resp) => {
                if(resp.data.valid) {
                    activeUser.valid = true;
                    activeUser.user.uid = resp.data.user.uid;
                    activeUser.user.id = resp.data.user.id;
                    activeUser.user.name = resp.data.user.name;
                    activeUser.user.email = resp.data.user.email;
                    activeUser.user.username = resp.data.user.username;
                    activeUser.user.log1 = resp.data.user.log1;
                    activeUser.user.log2 = resp.data.user.log2;
                    activeUser.user.log3 = resp.data.user.log3;
                } else console.log("Invalid User, ", resp.data.message);
            }).catch((err) => console.log("Auth Server Connection Failed, Cannot Validate User. Error: ", err)) 
        }
        return activeUser;
    },

    loginValidate: async () => {
        const validUser = await user.validate();
        if(!validUser.valid) window.location.href = ("../index.html?valid=false");
        return validUser
    },

    getLogs: async (user) => {
        const userLog = await axios.get(`${DATA_SERVER_URI}/candidate/logs/${user.uid}`).then((resp) => {
            // console.log(`Logs Of ${user.username} Retrieved`);
            return resp.data.log
        }).catch((err) => {
            console.log('Data Server Connection failed. Error:', err);
            return false
        })
        return userLog
    },

    login: async (e) => {
        e.preventDefault();

        //Enabling Loading Pop Up
        const PopUp = document.querySelector('.popUp')
        PopUp.style.display = 'grid';

        //Clearing Displayed Messages
        const Input = Array.from(e.target.querySelectorAll('input')),
            Message = document.querySelector('.message');
            
        (Message.style.visibility == 'visible')? Message.style.visibility == 'hidden' : null;

        //Validating Input
        const fieldsValid = Input.forEach((elem) => {
            if(elem.value == '' || elem.value == null) {
                PopUp.style.display = 'none';
                Message.innerText = 'Enter Username and Password';
                Message.style.color = 'red';
                Message.style.visibility = 'visible'
                return false
            }
            return true
        })

        if (fieldsValid == false) return false;

        //Extracting user data
        const userData = {
            user_name__: Input[0].value,
            pass_word__: Input[1].value
        }

        //Calling Server to validate user
        const activeUser = await axios.post(`${AUTH_SERVER_URI}/candidate/auth`, userData).then((resp) => {
            //Setting Cookies Passed from Server
            if( user.setCookie(resp.data.user.rTa, resp.data.user.rTa_exp * 60, 'rTa') && 
                user.setCookie(resp.data.user.aTr, resp.data.user.aTr_exp, 'aTr')
            ) window.location.href = (`landing.html?uid=${resp.data.user.uid}&id=${resp.data.user.id}&name=${resp.data.user.name}&email=${resp.data.user.email}&user=${resp.data.user.username}`);
            else {
                console.log('Cookie Not Set');
                PopUp.style.display = 'none';
                Message.innerText = 'Bad request';
                Message.style.color = 'red';
                Message.style.visibility = 'visible'
                return false
            }

        }).catch((err) => {
            console.log("Cannot Connect to Auth Server. Error:", err);
            PopUp.style.display = 'none';
            Message.innerText = 'Bad request';
            Message.style.color = 'red';
            Message.style.visibility = 'visible'
            return false
        })

        //Disabling Loading Pop Up
        PopUp.style.display = 'none';
        return activeUser;
    },

    logout: async () => {
        const rTa = user.getCookie('rTa'),
            session = { token: `Bearer ${rTa}` };

        const resp = await axios.post(`${AUTH_SERVER_URI}/candidate/logout`, session).catch((err) => {
            console.log('Auth Server Connection Failed. Error:', err)
            return false
        });
        if(resp.data.logout) {
            try {
                document.cookie = "rTa=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "aTr=null; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                // console.log('Session Terminated');
            } catch(err) {
                console.log('Cannot Delete Cookies. Error:', err);
                return false
            }
            console.log('User Logged Out');
            const currLoc = window.location.href.split('/');
            const currDir = currLoc[currLoc.length - 2];
            (currDir == 'pages')? window.location.href = '../index.html?valid=true' : window.location.href = './index.html?valid=true';
        } else console.log('Error Logging Out, Try again');     
    }
}

export default user