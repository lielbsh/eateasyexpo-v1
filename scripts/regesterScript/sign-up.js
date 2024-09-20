
import axios from 'axios';


// Use axios to send a POST request to the server
export async function sighUpReq(dataToSend){
    axios.post('https://eateasyserver.onrender.com/trytologin', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data;  // Axios automatically parses JSON
        // Handle the response 
        if (data.result === 'login sucessful. Retrieving your data') {
            console.log('1');
            // Call retreevedata() or any other function if needed
        } else {
            console.log('2', data.result);
            // Optionally, you can add a timeout here if needed
            // setTimeout(() => console.log('Reset message'), 3000);
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });

}