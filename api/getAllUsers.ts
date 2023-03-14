import { User } from "../types";
import baseURL from "../constants/baseURL";

export default async function (token:string): Promise<User[]> {
  try {
    const users = await getAllUsers(token)

    const formattedData: User[] = users.map((user: {display_name:string,id:string}) => {
      return {
        id: user.id,
        display_name: user.display_name,
      };
    });

    return formattedData;
  } catch (err) {
    console.log(err);
    return [];
  }
}

const getAllUsers =  async (token:string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions:RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };
  try{
    const res = await fetch(`${baseURL}/users`, requestOptions)
    return res.json()
  }catch(err){
    console.log(err)
    return []
  }
  
}
