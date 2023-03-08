import { View, ImageBackground, Text } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { Conversation, ConversationPreview } from "../../types";
import { RootState } from "../../redux/store";
import getConversation from "../../api/getConversation";
import getMessagesByChannel from "../../api/getMessagesByChannel";

import styles from "./Chat.styles";
interface ChatProps {
  route: RouteProp<
    {
      params: {
        conversation: ConversationPreview;
      };
    },
    "params"
  >;
}

export default function Chat(props: ChatProps) {
  const { conversation } = props.route.params;
  const [messages, setMessages] = useState([])
  const token = useSelector((state: RootState) => state.users.token);
  useEffect(()=> {
    console.log({conversation})
    if (token && conversation) {
      getConversation(conversation.id,token).then((conversation) => {
        console.log("conversation returned ")
        console.log(conversation)
      })
    }
    if (token && conversation) {
      getMessagesByChannel(conversation.id,token).then((_messages) => {
        console.log("_messages")
        console.log(_messages)
        setMessages(_messages)
      })
    }

  },[conversation])

  // const conversation = useSelector(
  //   (state: RootState) => state.conversations.currentConversation
  // );
  // const messages = conversation ? conversation.messages : [];

  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const [isTyping, setIsTyping] = useState(false);
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);

  return conversation ? (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        {/* <ChatMessages
          heightOfMessageBox={heightOfMessageBox}
          messages={messages}
        />
        <SendButton
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          setHeightOfMessageBox={setHeightOfMessageBox}
          heightOfMessageBox={heightOfMessageBox}
          thisConversation={conversation}
        /> */}
      </ImageBackground>
    </View>
  ) : (
    <Text>Loading</Text>
  );
}
