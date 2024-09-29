
import api from "../axioscookie";


// Use axios to send a POST request to the server
//data to send = {username,email,action="create user"}
export async function VerifyCodeReq(dataToSend,updateData){
    
    dataToSend.action="create user"
    return api.post('/signup/checkcode', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data; 
        return(data.result)
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

export async function SetAccountReq(dataToSend,updateData){
    return api.post('/signup/setaccount', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data; 
        return(data.result)
    })
    .catch(error => {
        console.error('Error:', error);
    });

}