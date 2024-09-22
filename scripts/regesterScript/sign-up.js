
import axios from 'axios';
let username
let email
let action
let messageid
let premitivecookie

// Use axios to send a POST request to the server
export async function sighUpReq(dataToSend){
    axios.post('https://localhost:3000/signup', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data;  // Axios automatically parses JSON
        if (data.result=='Username or mail no exits.'){
            // sendverifymail(dataToSend)
            return('Contuning to verify email.')
        }else {
        return(data.result)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

export async function sendverifymail(dataToSend){
    axios.post('https://localhost:3000/signup', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        if (response.result=="messege sent"){
            messageid=response.messageid
            premitivecookie=response.premitivecookie
            return("Message sent, look in your email.")
            
        }else if (response.result=="messege not sent"){
            return("Failed semd message.Try another time.")
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}