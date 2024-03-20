import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private id = []

  // Server
  @WebSocketServer()
  private readonly server:Server

  // Lisenting chat
  @SubscribeMessage("chat")
  async chat(client: Socket, message:string){
    this.id
      .filter( i => i != client.id )
      .map( i => this.server.to( i ).emit("message", message ) )
  }

  // Connection handle
  handleConnection(client: any, ...args: any[]) {
      this.id.push(client.id)
  }
  // DisConnection handle
  handleDisconnect(client: any) {
      this.id = this.id.filter(i => i != client.id)
  }

}
