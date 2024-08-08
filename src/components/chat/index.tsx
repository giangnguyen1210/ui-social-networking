// 'use client';
// import React, { useState, useEffect, FormEvent } from 'react';
// import { connect, sendMessage, disconnect } from './sock';
// import axiosInstance from '@/http/axiosInstance';

// const fetchMessages = async (senderId: string, recipientId: string) => {
//   try {
//     const response = await axiosInstance.get(`/api/chat-message/messages/${senderId}/${recipientId}`);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch messages:', error);
//     return [];
//   }
// };

// const ChatForm: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     const initializeMessages = async () => {
//       const initialMessages = await fetchMessages('user1', 'user2');
//       setMessages(initialMessages);
//     };

//     initializeMessages();

//     connect((msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       disconnect();
//     };
//   }, []);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const newMessage = { senderId: 'user1', recipientId: 'user2', content: message };
//     sendMessage(newMessage);

//     // Update the state immediately to reflect the new message on the UI
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>SockJS Chat</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter your message"
//         />
//         <button type="submit">Send</button>
//       </form>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg.content}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ChatForm;
// 'use client';
// import React, { useState, useEffect, FormEvent } from 'react';
// import { connect, sendMessage, disconnect } from './sock';
// import axiosInstance from '@/http/axiosInstance';

// const fetchMessages = async (senderId: string, recipientId: string) => {
//   try {
//     const response = await axiosInstance.get(`/chat-message/messages/${senderId}/${recipientId}`);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch messages:', error);
//     return [];
//   }
// };

// const ChatForm: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     const initializeMessages = async () => {
//       const initialMessages = await fetchMessages('user1', 'user2');
//       setMessages(initialMessages);
//     };

//     initializeMessages();

//     connect((msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       disconnect();
//     };
//   }, []);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const newMessage = { senderId: 'user1', recipientId: 'user2', content: message };
//     sendMessage(newMessage);

//     // Update the state immediately to reflect the new message on the UI
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>SockJS Chat</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter your message"
//         />
//         <button type="submit">Send</button>
//       </form>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg.content}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ChatForm;
'use client';
// import React, { useState, useEffect, FormEvent } from 'react';
// import { connect, sendMessage, disconnect } from './sock';
// import axiosInstance from '@/http/axiosInstance';

// const fetchMessages = async (senderId: string, recipientId: string) => {
//   try {
//     const response = await axiosInstance.get(`/chat-message/messages/${senderId}/${recipientId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch messages:', error);
//     return [];
//   }
// };

// const ChatForm: React.FC = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<any[]>([]);

//   useEffect(() => {
//     const initializeMessages = async () => {
//       const initialMessages = await fetchMessages('user1', 'user2');
//       setMessages(initialMessages);
//     };

//     initializeMessages();

//     const onMessageReceived = (msg: any) => {
//       console.log('Received new message: ', msg);
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     };

//     connect(onMessageReceived);

//     return () => {
//       disconnect();
//     };
//   }, []);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const newMessage = { senderId: 'user1', recipientId: 'user2', content: message };
//     sendMessage(newMessage);

//     // Update the state immediately to reflect the new message on the UI
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessage('');
//   };

//   return (
//     <div>
//       <h1>SockJS Chat</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter your message"
//         />
//         <button type="submit">Send</button>
//       </form>
//       <div>
//         <h2>Messages</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg.content}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ChatForm;
import React, { useEffect, useState } from 'react';
// import { Client, Frame, over } from 'stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';

import SockJS from 'sockjs-client';

interface UserData {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
}

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message: string;
  status: string;
}

let stompClient: Client | null = null;

const ChatRoom: React.FC = () => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(new Map());
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>('CHATROOM');
  const [userData, setUserData] = useState<UserData>({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  });

  useEffect(() => {
  }, [userData]);

  const connect = () => {
    const Sock = new SockJS('http://localhost:8086/chat');
    stompClient = Stomp.over(Sock) as CompatClient;
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    if (stompClient) {
      // stompClient.subscribe('/chatroom/public', onMessageReceived);
      stompClient.subscribe(`/user/${userData.username}`, onMessageReceived);
      userJoin();
    }
  };

  const userJoin = () => {
    const chatMessage: ChatMessage = {
      senderName: userData.username,
      status: 'JOIN'
    };
    if (stompClient) {
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    }
  };

  const onMessageReceived = (payload: any) => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.has(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload: any) => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    if (privateChats.has(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)?.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err: string) => {
    console.log(err);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      const chatMessage: ChatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE'
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      const chatMessage: ChatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE'
      };

      if (userData.username !== tab) {
        privateChats.get(tab)?.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => setTab('CHATROOM')}
                className={`member ${tab === 'CHATROOM' && 'active'}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => setTab(name)}
                  className={`member ${tab === name && 'active'}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${chat.senderName === userData.username && 'self'}`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="Enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendValue}>
                  Send
                </button>
              </div>
            </div>
          )}
          {tab !== 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...privateChats.get(tab) ?? []].map((chat, index) => (
                  <li
                    className={`message ${chat.senderName === userData.username && 'self'}`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="Enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendPrivateValue}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
