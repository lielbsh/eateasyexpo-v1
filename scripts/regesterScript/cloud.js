
import api from '../axioscookie';
import {storeObject} from '../data/asyncstorage' 

export async function retreiveData(dataToSend,updateData){
    
    api.post('/recipes/retrieverecipe', dataToSend, {
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
        let today=Date.now()
        storeObject('lastUpdate',today)
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

export async function updaterecipescloud(changes){
    api.post('/recipes/updatedata', {changes}, {
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

export async function updategroceriesandcartcloud(groceries,cart){
    api.post('/recipes/updategroceries', {groceries,cart}, {
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