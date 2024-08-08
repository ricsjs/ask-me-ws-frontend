import { useParams } from "react-router-dom";
import { Message } from "./message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRoomMessages } from "../http/get-room-messages";

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error("Messages component must be used within a room page");
  }

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  console.log(data);

  return (
    <ol className="list-decimal list-inside px-3 space-y-8">
      {data?.messages.length > 0 ? (
        data.messages.map((message) => (
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
