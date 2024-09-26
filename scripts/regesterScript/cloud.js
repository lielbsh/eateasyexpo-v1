
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

export function updaterecipescloud(changes,updateData){
    axios.post('http://localhost:3000/recipes/updatedata', {changes}, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true  // Ensure this is set to send cookies
        })
    .then(response => {
        updateData('changes',[])
        
    })
    .catch(error => {
        console.error('Error:', error);
    });    
}

export function updategroceriesandcartcloud(groceries,cart,updateData){
    axios.post('http://localhost:3000/recipes/updategroceries', {groceries,cart}, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true  // Ensure this is set to send cookies
        })
    .then(response => {
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });    
}