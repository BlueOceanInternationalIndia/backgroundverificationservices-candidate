import user from "./services/user_Services.js";

window.addEventListener('load', async () => {
    const urlParams = new URLSearchParams(window.location.search),
        activeUser = await user.validate(),
        reqUser = {
            uid: urlParams.get('uid'),
            id: urlParams.get('id'),
            name: urlParams.get('name'),
            email: urlParams.get('email'),
            username: urlParams.get('user'),
        }

    //Validating Request
    if( !activeUser.valid ||
        reqUser.uid != activeUser.user.uid ||
        reqUser.id != activeUser.user.id ||
        reqUser.name != activeUser.user.name ||
        reqUser.email != activeUser.user.email ||
        reqUser.username != activeUser.user.username 
    ) {
        console.log('Invalid Request');
        window.location.href = ('../index.html?valid=false');
    }

    const userLog = await user.getLogs(activeUser.user);
    window.location.href = `landing_.html?uid=${userLog.uid}&id=${userLog.id}&name=${userLog.name}&user=${userLog.username}&e0=${userLog.form0.enabled}&a0=${!userLog.form0.submitted}&e1=${userLog.form1.enabled}&a1=${!userLog.form1.submitted}&1f1=${userLog.form1.file1}&e2=${userLog.form2.enabled}&a2=${!userLog.form2.submitted}&e3=${userLog.form3.enabled}&a3=${!userLog.form3.submitted}&e4=${userLog.form4.enabled}&a4=${!userLog.form4.submitted}&e5=${userLog.form5.enabled}&a5=${!userLog.form5.submitted}&e6=${userLog.form6.enabled}&a6=${!userLog.form6.submitted}&e7=${userLog.form7.enabled}&a7=${!userLog.form7.submitted}&e8=${userLog.form8.enabled}&a8=${!userLog.form8.submitted}`




})