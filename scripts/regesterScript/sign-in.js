
import axios from 'axios';
import { retreiveData } from './cloud';

//https://eateasyserver.onrender.com
// Use axios to send a POST request to the server
export async function sighInReq(dataToSend,updateData){
    return axios.post('http://10.100.102.151:3000/trytologin', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data;  // Axios automatically parses JSON
        // Handle the response 
        if (data.result === 'login sucessful. Retrieving your data') {
            retreiveData(dataToSend,updateData)
            
            return(data.result)
            
        } else {
            
            return(data.result)
            // Optionally, you can add a timeout here if needed
            // setTimeout(() => console.log('Reset message'), 3000);
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });

}