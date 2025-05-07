import { useState, useEffect, useCallback } from 'react';
import { getWebSocket, sendWebSocketMessage, addWebSocketListener } from '@/lib/websocket';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const socket = getWebSocket();
    if (!socket) return;

    const handleOpen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    const handleClose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    const handleError = (error: Event) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    const removeMessageListener = addWebSocketListener((data) => {
      setLastMessage(data);
    });

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('close', handleClose);
    socket.addEventListener('error', handleError);

    if (socket.readyState === WebSocket.OPEN) {
      setIsConnected(true);
    }

    return () => {
      removeMessageListener();
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('close', handleClose);
      socket.removeEventListener('error', handleError);
    };
  }, []);

  const sendMessage = useCallback((type: string, data?: any) => {
    return sendWebSocketMessage(type, data);
  }, []);

  const subscribeToPatient = useCallback((patientId: number) => {
    return sendWebSocketMessage('subscribe', { patientId });
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage,
    subscribeToPatient
  };
}

export default useWebSocket;
