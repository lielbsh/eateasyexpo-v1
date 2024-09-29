import axios from 'axios';

export const stringFormat = (originalString) => {
  let formattedString = originalString.replace(/ /g, "+");
  return formattedString
}

export async function searchScript(dataToSend){
  dataToSend.stringInput = stringFormat(dataToSend.stringInput)
  console.log(dataToSend.stringInput)
  return axios.post('http://localhost:3000/search/searchrecipes', dataToSend, {
  headers: {
      'Content-Type': 'application/json'
  },
  withCredentials: true  // Ensure this is set to send cookies
  })
  .then(res => {
      let {searchResults}= res.data
      console.log(res.data)
      console.log(searchResults)
      return(searchResults)  
  })
  .catch(error => {
      console.error('Error:', error);
  });

}



