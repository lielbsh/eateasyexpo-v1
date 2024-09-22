
import axios from 'axios';


// Use axios to send a POST request to the server
export async function retreiveData(dataToSend,updateData){
    axios.post('http://localhost:3000/recipes/retrieverecipe', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(response => {
        let {recipes,usercopy}=response.data
        updateData('recipes',recipes)
        updateData('groceries',usercopy.groceries)
        updateData('cart',usercopy.cart)
        updateData('username',usercopy.username)
        updateData('email',usercopy.email)
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

}
