import { useParams } from "react-router-dom";
import { Message } from "./message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoomMessages } from "../http/get-room-messages";
import { useMessagesWebSockets } from "../hooks/use-message-web-sockets";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within a room page");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebSockets({ roomId })

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions
  })

  return (
    <ol className="list-decimal list-inside px-3 space-y-8">
      {sortedMessages?.length > 0 ? (
        sortedMessages.map((message) => (
          <Message
            id={message.id}
            key={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        ))
      ) : (
        <p className="text-center text-zinc-500">No messages available</p>
      )}
    </ol>
  );
}
