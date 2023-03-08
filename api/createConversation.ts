import baseURL from "../constants/baseURL";



export default async function createConversation(
  participantIDs: string[],
  name: string,
  ownerID: string,
  token:string
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const uniqueparticipantIDs = [...new Set([...participantIDs, ownerID])];

  const raw = JSON.stringify({
    owner_id: ownerID,
    name: "Test ",
    participant_ids: uniqueparticipantIDs,
  });
  const createConversationURL: string = `${baseURL}/channels`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const res = await fetch(createConversationURL, requestOptions);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}


// This one is quite straightforward.
// participant ids is passed but we don't need the owner id