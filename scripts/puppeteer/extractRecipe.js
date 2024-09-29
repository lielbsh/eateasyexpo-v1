import api from '../axioscookie';

export async function extractRecipe(dataToSend){
    console.log(dataToSend.recipeURL)
    return api.post('/search/extractrecipes', dataToSend, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true  // Ensure this is set to send cookies
    })
    .then(res => {
        let {outputRecipe}= res.data
        console.log(res.data)
        console.log(outputRecipe)
        return(outputRecipe)  
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
  }