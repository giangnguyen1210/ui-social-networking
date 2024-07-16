// hooks/useWebSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const socket = io('ws://172.16.1.58:8086:8086/ws');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('message', (msg) => {
            setMessage(msg);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.close();
        };
    }, []);

    return message;
};

export default useWebSocket;
