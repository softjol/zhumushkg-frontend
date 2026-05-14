import { ChatPage } from "@/page/chat/ui/ChatPage";

export default function ChatDetail({ params }: { params: { id: string } }) {
  return <ChatPage chatId={params.id} />;
}