import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form8 = {
    onLoad: async () => {
        const aTr = await user.accessValidate();

        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/professionalreferences/${activeUser.uid}`, { token: aTr }).then(async (res) => {
            const resData = res.data.data,
                empTable = elements.Form.querySelector('.empTable');
            
            for(let i = 3; empTable.children[i] !== undefined;) empTable.children[i].remove();

            Object.values(resData).forEach((entry) => {
                const newList = document.createElement('li');

                newList.innerHTML = `
                <div class="wrapper fontM">
                    <ul class="listHori">
                        <li>
                            <div class="wrapper">
                                <p>${entry.company}</p>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <p>${entry.name}, ${entry.designation} (${entry.relation})</p>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <p>${entry.from.split('T')[0]} - ${entry.till.split('T')[0]}</p>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper" >
                                <p class="actionButton" id="DeleteEntry" data-id="${entry._id}" style="cursor: pointer;">&#10060</p>
                            </div>
                        </li>
                    </ul>
                </div>
            `

            empTable.appendChild(newList)
            empTable.appendChild(document.createElement('hr'))
            })  
            
            if(Object.keys(resData).length == 1) empTable.querySelector(".actionButton").style.display = 'none';

            empTable.appendChild(document.createElement('br'))
            return res.data.data
        }).catch((err) => console.log('Cannot Connect To Consent Database. Error: ', err))
    },

    onAction: async (e) => {
        if(e.target.id == 'DeleteEntry') {
            const entryId = e.target.dataset.id
            const aTr = await user.accessValidate();

            const resp = await axios.delete(`${DATA_SERVER_URI}/candidate/professionalreferences/${entryId}`, { data: { token: aTr } }).catch((err) => console.log('Failed To Delete Entry. Error: ', err))
            return true
        }
    },

    onSubmit: async () => {
        const aTr = await user.accessValidate();
        const userData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            company: elements.FormData.company,
            name: elements.FormData.name,
            designation: elements.FormData.designation,
            relation: elements.FormData.relation,
            from: new Date(elements.FormData.from),
            till: new Date(elements.FormData.till),
            email: elements.FormData.email,
            contact: `${elements.FormData.contactCode} ${elements.FormData.contact}`,
            altContact: `${elements.FormData.altContactCode} ${elements.FormData.altContact}`,
            token: aTr
        }
        
        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/professionalreferences`, userData).then((res) => {
            activeUser.log.form8.submitted = true;
            return true;
        }).catch((err) => console.log('Database Connection Failed', err));
        
        return resp;
    }
}

export default form8