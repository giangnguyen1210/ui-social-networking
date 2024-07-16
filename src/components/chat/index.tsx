// 'use client';
// import React, { useEffect, useState } from 'react';

// import useWebSocket from "./useWebSocket";

// function MyPage() {
//   const [ws, setWs] = useState<WebSocket>();

//   useEffect(() => {
//     const socket = new WebSocket('ws://172.16.1.58:8086/chat', [{"Connection": "Upgrate"}]); // Replace with your endpoint URL
//     socket.url
//     console.log("before onopen", socket);

//     socket.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     socket.onmessage = (event) => {
//       console.log('Received message:', event.data);
//       // Handle incoming data from the server
//     };

//     socket.onclose = (event) => {
//       console.log('WebSocket connection closed:', event.code, event.reason);
//       //setWs(null); // Clean up state when the connection closes
//     };

//     socket.onerror = (err) => {
//       console.log('WebSocket connection ERR:', err);

//     }

//     setWs(socket);

//     // return () => socket.close(); // Clean up the connection on unmount
//   }, []);

//   // ... rest of your component

//   return (
//     <div>
//       {ws && <p>Connected to WebSocket server!</p>}
//       {/* Add UI elements to send data to the server or display received messages */}
//     </div>
//   );
// }

// export default MyPage;
// 'use client';
// import React, { useEffect, useState } from 'react';

// const WebSocketPage = () => {
//   const [socket, setSocket] = useState<WebSocket>();
//   const [messages, setMessages] = useState<[] | any>([]);
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     const token = "your_generated_token"; // Replace with actual token generation logic
//     const ws = new WebSocket(`ws://172.16.1.58:8086/chat`);

//     ws.onopen = () => {
//       console.log('Connected to WebSocket server');
//     };

//     ws.onmessage = (event) => {
//       setMessages((prevMessages: any) => [...prevMessages, event.data]);
//     };

//     ws.onclose = () => {
//       console.log('Disconnected from WebSocket server');
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(inputValue);
//       setInputValue('');
//     }
//   };

//   return (
//     <div>
//       <h1>WebSocket Client</h1>
//       <div>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send Message</button>
//       </div>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WebSocketPage;
// pages/index.js
'use client';

import useWebSocket from "./useWebSocket";

export default function Home() {
    const message = useWebSocket();

    return (
        <div>
            <h1>WebSocket Message</h1>
            <p>{message}</p>
        </div>
    );
}
