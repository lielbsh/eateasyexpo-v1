import axios from 'axios';
import { stringFormat } from './searchScript';

export async function groceries(dataToSend){
    dataToSend.stringInput= stringFormat(dataToSend.stringInput)
    console.log(dataToSend.stringInput)
    return axios.post('http://localhost:3000/groceries/searchgroceries', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(res => {
        let {groceriesSearchResults}= res.data
        console.log(res.data)
        console.log(groceriesSearchResults)
        return(groceriesSearchResults)  
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
  }