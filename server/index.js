import express from 'express'
import fetch,{Headers} from 'node-fetch'
const app = express()

const port = 3002
const API_KEY = 'b8f9feba-be7f-4a35-8883-cd82d0606675'
const APP_ID = "0338dae0-0b2a-4582-8244-292aef3996d0"

app.use(express.json()) 

app.get('/user-token', async (req, res) => {
    const userID = req.body.user_id
    console.log({userID})
    
    const token = await getToken()

    console.log(token)
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
      "user_id": userID
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // turn the below fetch into try await
  try {
      const res = await fetch("localhost:3001/users/token", requestOptions)
      const json = await res.json()
      return json
  } catch(err){
      console.log(err)
      return err
  }
}