import { ConversationPreviewType } from "../types";
import dayjs from "dayjs";

const sortConversations = (conversations: ConversationPreviewType[]): ConversationPreviewType[] => {
  if (conversations.length <= 1) {
    return conversations;
  }
  const sortedConversations = conversations
    .slice()
    .sort((a: ConversationPreviewType, b: ConversationPreviewType): number => {
      return dayjs(
        b.updated_at
      ).isAfter(
        a.updated_at
      )
        ? 1
        : -1;
    });
  return sortedConversations;
};

export default sortConversations;
