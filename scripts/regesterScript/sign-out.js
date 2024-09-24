
import axios from 'axios';


//https://eateasyserver.onrender.com
// Use axios to send a POST request to the server
export async function sighOutReq(dataToSend,resetData){
    return axios.post('http://localhost:3000/recipes/logoutfromuser', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        resetData()
        return("signed out.")

    })
    .catch(error => {
        console.error('Error:', error);
    });

}