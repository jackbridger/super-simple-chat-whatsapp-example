import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fetch,{Headers} from 'node-fetch'
import express from 'express'

const baseURL = "http://api.supersimplechat.com";
const app = express()
dotenv.config()


console.log(baseURL)

const port = 3002
const API_KEY = process.env.CHAT_API_KEY
console.log({API_KEY})

const APP_ID = process.env.CHAT_APP_ID
console.log({APP_ID })
app.use(express.json()) 

app.post('/user-token', async (req, res) => {
    const userID = req.body.user_id
    console.log("User id ",userID)
    
    const token = await getToken(userID)
    res.send(token)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const getToken = async (userID) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "app_id": APP_ID,
      "user_id": userID,
      "display_name":userID
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // turn the below fetch into try await
  try {
      const res = await fetch(`${baseURL}/users/token`, requestOptions)
      console.log(res)
      const token = await res.text()
      console.log(token)
      return token
  } catch(err){
      console.log(err)
      return err
  }
}