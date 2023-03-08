import baseURL from "../constants/baseURL";
import { MyResponse } from "../types";

export default async function getMessagesByChannel(
  channelID: string,
  token:string
): Promise<any> {
  try {
    const channels = await _getMessagesByChannel(channelID,token)
    return {
      data: channels,
      status: 200,
      message: "success",
    };
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return {
      data: null,
      status: 400,
      message,
    };
  }
}


const _getMessagesByChannel = async (channelID:string,token:string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions:RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const res = await fetch(`${baseURL}/channels/${channelID}/messages`, requestOptions)
    const json = await res.json()
    return json
  }catch(err){
    console.log(err);
    return null
  }
}