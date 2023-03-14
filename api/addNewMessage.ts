import { Conversation, Message } from "../types";
import baseURL from "../constants/baseURL";

export default async function addNewMessage(message: Message,token:string):Promise<string> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const addNewMessageURL: string = `${baseURL}/messages`;

  const raw = JSON.stringify({
    channel_id: message.conversationID,
    message: message.message,
  });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(addNewMessageURL, requestOptions);
  const res1 = await response.text();
  return res1;
}

// use /messages and pass in the channel_id and message