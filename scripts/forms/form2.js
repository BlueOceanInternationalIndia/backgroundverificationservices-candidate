import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form2 = {
    onSubmit: async () => {
        const aTr = await user.accessValidate();
        const userData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            fullName: elements.FormData.fullName,
            fatherName: elements.FormData.fatherName,
            motherName: elements.FormData.motherName,
            spouseName: elements.FormData.spouseName,
            gender: elements.FormData.gender,
            dob: new Date(elements.FormData.dob),
            contact: `${elements.FormData.contactCode} ${elements.FormData.contact}`,
            whatsapp: `${elements.FormData.whatsappCode} ${elements.FormData.whatsapp}`,
            email: elements.FormData.email,
            altEmail: elements.FormData.altEmail,
            stateResi: elements.FormData.stateResi,
            placeResi: elements.FormData.placeResi,
            nationality: elements.FormData.nationality,
            highestQual: elements.FormData.highestQual,
            aadhaar: elements.FormData.aadhaar,
            pan: elements.FormData.pan,
            token: aTr
        }
        
        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/personaldetails`, userData).then((res) => {
            activeUser.log.form2.submitted = true;
            return true;
        }).catch((err) => console.log('Database Connection Failed', err));
        
        return resp;
    }
}

export default form2