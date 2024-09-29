import api from "../axioscookie";

// Use axios to send a POST request to the server
//data to send = {username,email,action="create user"}
export async function signUpReq(dataToSend,updateData){
    dataToSend.action="create user"
    return api.post('/signup', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        const data = response.data;  // Axios automatically parses JSON
        if (data.result=='Username or mail no exits.'){
            sendverifymail(dataToSend)
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
    console.log("ver",dataToSend)
    return api.post('/signup/verifymail', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        let data=response.data
        if (data.result=="messege sent"){
            return("Message sent, look in your email.")
            
        }else if (data.result=="messege not sent"){
            return("Failed semd message.Try another time.")
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}