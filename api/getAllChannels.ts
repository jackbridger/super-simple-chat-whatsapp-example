import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ConversationPreviewType, MyResponse } from "../types";
import baseURL from "../constants/baseURL";


export default async function getAllChannels(token:string
): Promise<MyResponse> {
  try {
    const channels = await _getAllChannels(token)
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


const _getAllChannels = async (token:string) => {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions:RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
    const res = await fetch(`${baseURL}/channels/`, requestOptions)
    const json:ConversationPreviewType[] = await res.json()
    return json
  }catch(err){
    console.log(err);
    return []
  }
}