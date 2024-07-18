// import SockJS from 'sockjs-client';
// import { CompatClient, Stomp } from '@stomp/stompjs';

// let stompClient: CompatClient | null = null;

// export const connect = (onMessageReceived: (message: any) => void): void => {
//   const socket = new SockJS('http://172.16.1.58:8086/chat');
//   stompClient = Stomp.over(socket);

//   stompClient.connect({}, (frame: any) => {
//     console.log('Connected: ' + frame);
//     stompClient?.subscribe('/user/queue/messages', (message) => {
//       onMessageReceived(JSON.parse(message.body));
//     });
//   });
// };

// export const sendMessage = (message: any): void => {
//   if (stompClient) {
//     stompClient.send('/app/chat', {}, JSON.stringify(message));
//   }
// };

// export const disconnect = (): void => {
//   if (stompClient) {
//     stompClient.disconnect(() => {
//       console.log('Disconnected');
//     });
//   }
// };
// import SockJS from 'sockjs-client';
// import { CompatClient, Stomp } from '@stomp/stompjs';

// let stompClient: CompatClient | null = null;

// export const connect = (onMessageReceived: (message: any) => void): void => {
//   const socket = new SockJS('http://localhost:8086/chat');
//   stompClient = Stomp.over(socket);

//   stompClient.connect({}, (frame: any) => {
//     console.log('Connected: ' + frame);
//     stompClient?.subscribe('/user/queue/messages', (message) => {
//       onMessageReceived(JSON.parse(message.body));
//     });
//   });
// };

// export const sendMessage = (message: any): void => {
//   if (stompClient) {
//     stompClient.send('/app/chat', {}, JSON.stringify(message));
//   }
// };

// export const disconnect = (): void => {
//   if (stompClient) {
//     stompClient.disconnect(() => {
//       console.log('Disconnected');
//     });
//   }
// };
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

let stompClient: CompatClient | null = null;
const connectedClients: Array<(message: any) => void> = [];

export const connect = (onMessageReceived: (message: any) => void): void => {
  if (stompClient && stompClient.connected) {
    connectedClients.push(onMessageReceived);
    return;
  }

  const socket = new SockJS('http://localhost:8086/chat');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame: any) => {
    console.log('Connected: ' + frame);
    stompClient?.subscribe('/user/queue/messages', (message) => {
      console.log('Message received: ', message);
      const parsedMessage = JSON.parse(message.body);
      connectedClients.forEach(callback => callback(parsedMessage));
    });
    connectedClients.push(onMessageReceived);
  }, (error: any) => {
    console.error('Connection error: ', error);
    setTimeout(() => connect(onMessageReceived), 5000); // Reconnect after a delay
  });
};

export const sendMessage = (message: any): void => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat', {}, JSON.stringify(message));
    console.log('Message sent: ', message);
  } else {
    console.error('Unable to send message, stompClient not connected');
  }
};

export const disconnect = (): void => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('Disconnected');
    });
  }
};
