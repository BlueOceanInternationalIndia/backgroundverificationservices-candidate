import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form7 = {
    onLoad: async () => {
        const aTr = await user.accessValidate();

        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/employmentdetails/${activeUser.uid}`, { token: aTr }).then(async (res) => {
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
                                <p>${entry.joining.split('T')[0]} - ${entry.leaving.split('T')[0]}</p>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <p>${entry.ctc} Lakhs</p>
                            </div>
                        </li>
                        <li>
                            <div class="wrapper">
                                <p>${Object.keys(entry.contacts).length}</p>
                            </div>
                        </li>
                        <li >
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

            const resp = await axios.delete(`${DATA_SERVER_URI}/candidate/employmentdetails/${entryId}`, { data: { token: aTr } }).catch((err) => console.log('Failed To Delete Entry. Error: ', err))
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
            designation: elements.FormData.designation,
            department: elements.FormData.department,
            location: elements.FormData.location,
            joining: new Date(elements.FormData.joining),
            leaving: new Date(elements.FormData.leaving),
            manager: elements.FormData.manager,
            managerDesignation: elements.FormData.managerDesignation,
            ctc: elements.FormData.ctc,
            contacts: {},
            token: aTr
        }

        let i = 1;
        while(elements.FormData[`contactName${i}`] !== undefined) {
            userData.contacts[i] = {
                name: elements.FormData[`contactName${i}`],
                designation: elements.FormData[`contactDesig${i}`],
                email: elements.FormData[`contactEmail${i}`],
                contact: `${elements.FormData[`contactNumCode${i}`]} ${elements.FormData[`contactNum${i}`]}`,
                altContact: `${elements.FormData[`contactAltNumCode${i}`]} ${elements.FormData[`contactAltNum${i}`]}`,
                landline: elements.FormData[`contactLandline${i}`]
            }
            i++;
        }
        
        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/employmentdetails`, userData).then((res) => {
            activeUser.log.form7.submitted = true;
            return true;
        }).catch((err) => console.log('Database Connection Failed', err));
        
        return resp;
    }
}

export default form7