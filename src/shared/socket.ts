import { Injectable } from "@nestjs/common";
import { 
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer
 } from "@nestjs/websockets";
 import {Server } from 'socket.io'

@WebSocketGateway(
    88,
    {
        cors:{
            origin:'*'
        }
    }
)
@Injectable()
export class Socket implements OnGatewayConnection,OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    handleConnection(client: any, ...args: any[]) {
        //console.log("estamos conectados ",client)
    }
    handleDisconnect(client: any) {
        //console.log("Adios",client)
    }

    updatePartido(){
        console.log('indicando a todos que actualice');
                          //actualizar-producto
        this.server.emit('actualizar-partido',{estado:true})
    }
}