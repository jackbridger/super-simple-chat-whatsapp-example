import { View, ImageBackground, Text } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";

import SendButton from "../../components/SendButton/SendButton";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import { Conversation, ConversationPreviewType } from "../../types";
import { RootState } from "../../redux/store";
import getConversation from "../../api/getConversation";
import getMessagesByChannel from "../../api/getMessagesByChannel";

import styles from "./Chat.styles";
interface ChatProps {
  route: RouteProp<
    {
      params: {
        conversation: ConversationPreviewType;
      };
    },
    "params"
  >;
}

export default function Chat(props: ChatProps) {
  const { conversation: receivedConvo } = props.route.params;
  const [thisChannel,setThisChannel] = useState<Conversation | null>(null)

  const [messages, setMessages] = useState([])
  const token = useSelector((state: RootState) => state.users.token);
  useEffect(()=> {
    if (token && receivedConvo) {
      getConversation(receivedConvo.id,token).then((conversation) => {
        if (conversation.data) {
          setThisChannel(conversation.data)
        }
      })
    }
    if (token && receivedConvo) {
      getMessagesByChannel(receivedConvo.id,token).then((_messages) => {
        setMessages(_messages.data)
      })
    }

  },[receivedConvo])

  // const conversation = useSelector(
  //   (state: RootState) => state.conversations.currentConversation
  // );
  // const messages = conversation ? conversation.messages : [];

  const whatsappBackgroundImg = "../../assets/images/whatsapp.png";
  const [isTyping, setIsTyping] = useState(false);
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);

  return receivedConvo ? (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require(whatsappBackgroundImg)}
        resizeMode="cover"
      >
        <ChatMessages
          heightOfMessageBox={heightOfMessageBox}
          messages={messages}
        />
        {thisChannel
          && <SendButton
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          setHeightOfMessageBox={setHeightOfMessageBox}
          heightOfMessageBox={heightOfMessageBox}
          thisConversation={thisChannel}
          messages={messages}
        />
      }
        
      </ImageBackground>
    </View>
  ) : (
    <Text>Loading</Text>
  );
}
