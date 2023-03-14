import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Chat: { conversation: ConversationPreviewType };
  CreateNewChat: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Conversation {
  id: string;
  messages: Message[];
  users: string[];
  name: string;
  createdAt: string;
  randomProfilePicture: number;
  participants: User[];
}
export interface ConversationPreviewType {
  id: string;
  name: string;
  created_at: string;
  updated_at:string;
  last_message:string | null;
}

export interface Message {
  id: string;
  message: string;
  time: string;
  userID: string;
  conversationID: string;
  isRead: boolean;
}

export interface MessageData {
  message: Message;
}

export interface User {
  id: string;
  display_name: string;
}

export interface SupabaseMessage {
  id: string;
  conversation_id: string;
  users: {
    id: string;
    username: string;
  };
  message: string;
  created_at: string;
}
// export interface SupabaseConversation {
//   id: string;
//   name: string;
//   messages: SupabaseMessage[];
//   owner_user_id: string;
//   created_at: string;
//   participants: User[];
// }

export interface MyResponse {
  data: ConversationPreviewType[] | null;
  status: number;
  message: string;
}
