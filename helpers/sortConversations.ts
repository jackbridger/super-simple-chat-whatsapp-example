import { ConversationPreview } from "../types";
import dayjs from "dayjs";

const sortConversations = (conversations: ConversationPreview[]): ConversationPreview[] => {
  if (conversations.length <= 1) {
    return conversations;
  }
  const sortedConversations = conversations
    .slice()
    .sort((a: ConversationPreview, b: ConversationPreview): number => {
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
