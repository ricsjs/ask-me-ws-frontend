import { api } from "./api"

interface RemoveMessageReactionRequest {
    roomId: string
    messageId: string
  }
  
  export async function removeMessageReaction({ messageId, roomId }: RemoveMessageReactionRequest) {
    await fetch(`${api}/rooms/${roomId}/messages/${messageId}/react`, {
      method: 'DELETE',
    })
  }