import { api } from "./api"

interface CreateMessageReactionRequest {
    roomId: string
    messageId: string
  }
  
  export async function createMessageReaction({ messageId, roomId }: CreateMessageReactionRequest) {
    await fetch(`${api}/rooms/${roomId}/messages/${messageId}/react`, {
      method: 'PATCH',
    })
  }