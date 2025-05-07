/**
 * Creates a WebSocket connection to the backend
 * Ensures the correct protocol and path is used
 */
export function createWebSocketConnection() {
    try {
      // Use the correct protocol based on whether the page is served over HTTPS or HTTP
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  
      // Dynamically get the WebSocket host and port from the environment variables or default to localhost
      const host = import.meta.env.VITE_WS_HOST || "localhost"; // Using environment variable
      // Make sure port is always a number or valid string
      const rawPort = import.meta.env.VITE_WS_PORT;
      const port = rawPort && rawPort !== "undefined" ? rawPort : "5000";

      const path = "/ws";  // WebSocket path
  
      // Use a placeholder token (replace with real token after implementing authentication)
      const token = localStorage.getItem("authToken") || '';
      

  
      // Construct the full WebSocket URL with the placeholder token
      const wsUrl = `${protocol}//${host}:${port}${path}?token=${token}`;
      console.log(`Connecting to WebSocket at: ${wsUrl}`);
      
      // Create the WebSocket connection
      const socket = new WebSocket(wsUrl);
  
      // Setup event handlers
      socket.addEventListener("open", () => {
        console.log("WebSocket connection established");
      });
  
      socket.addEventListener("error", (error) => {
        console.error("WebSocket connection error:", error);
      });
  
      socket.addEventListener("close", (event) => {
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
      });
  
      return socket;
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      return null;
    }
  }
  
  /**
   * WebSocket singleton instance
   */
  let socketInstance: WebSocket | null = null;
  
  /**
   * Gets the WebSocket instance, creating it if it doesn't exist
   */
  export function getWebSocket(): WebSocket | null {
    if (!socketInstance || socketInstance.readyState === WebSocket.CLOSED) {
      socketInstance = createWebSocketConnection();
    }
    return socketInstance;
  }
  
  /**
   * Sends a message through the WebSocket
   */
  export function sendWebSocketMessage(type: string, data: any = {}) {
    const socket = getWebSocket();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type,
          ...data,
        })
      );
      return true;
    }
    return false;
  }
  
  /**
   * Adds a message listener to the WebSocket
   */
  export function addWebSocketListener(callback: (data: any) => void): (() => void) {
    const socket = getWebSocket();
    if (!socket) return () => {};
  
    const messageHandler = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        callback(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  
    socket.addEventListener("message", messageHandler);
  
    // Return a function to remove the listener
    return () => {
      socket?.removeEventListener("message", messageHandler);
    };
  }
  