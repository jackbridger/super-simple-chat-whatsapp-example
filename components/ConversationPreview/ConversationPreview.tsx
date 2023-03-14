import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import {
  setCurrentConversation,
  markConversationAsRead,
} from "../../redux/conversationsReducer";
import {  ConversationPreviewType } from "../../types";
import styles from "./ConversationPreview.styles";
import images from "../../assets/index";
import getRandomProfilePicture from "../../helpers/getRandomProfilePicture";
import Colors from "../../constants/Colors";

interface ConversationPreviewProps {
  conversation: ConversationPreviewType;
}

interface ChatRouteParams {
  conversation: ConversationPreviewType;
}

export default function ConversationPrev(props: ConversationPreviewProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { conversation } = props;
  const hasMessage = !!conversation.last_message;
  const lastMessage = conversation.last_message;
  const lastUpdateTime = conversation.updated_at;
  const hasUnreadMessages = true // to do: fix this

  const profileImg = images[1]; // to do: fix this

  const chatRouteParams: ChatRouteParams = {
    conversation,
  };

  const _onPress = () => {
    if (hasUnreadMessages) {
      dispatch(markConversationAsRead(conversation));
    }
    dispatch(setCurrentConversation(conversation));
    navigation.navigate("Chat", chatRouteParams);
  };

  return (
    <TouchableOpacity onPress={_onPress} style={styles.messageContainer}>
      <View style={styles.imgAndMsgSubContainer}>
        <Image style={styles.profileImg} source={profileImg} />
        <View style={{ width: "100%" }}>
          <Text style={styles.msgTitle}>{conversation.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.msgPreview}
          >
            {hasMessage ? lastMessage : ""}
          </Text>
        </View>
      </View>
      <View style={styles.msgDataContainer}>
        <View style={styles.msgDataSubContainer}>
          <Text
            style={{
              color: hasUnreadMessages
                ? Colors.light.brightGreen
                : Colors.light.offBlack,
            }}
          >
            {dayjs(lastUpdateTime).format("HH:mm")}
          </Text>
          {hasUnreadMessages && (
            <View style={styles.numberOfMsgsContainer}>
              <Text style={styles.numberOfMsgsText}>1</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
