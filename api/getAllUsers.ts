import { SupabaseUser, User } from "../types";
import ngrokURL from "../constants/ngrokURL";

export default async function (userID: string): Promise<User[]> {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const baseURL = ngrokURL;
    const getUsersURL: string = `${baseURL}/users/search?user_id=${userID}`;
    const response = await fetch(getUsersURL, requestOptions);
    const data = await response.json();
    const formattedData: User[] = data.map((user: SupabaseUser) => {
      return {
        id: user.id,
        username: user.username,
        createdAt: user.created_at,
      };
    });

    return formattedData;
  } catch (err) {
    console.log(err);
    return [];
  }
}
