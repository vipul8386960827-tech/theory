let socket;

function connect() {
  socket = new WebSocket("wss://your-server");

  socket.onopen = () => {
    console.log("Connected");
  };

  socket.onclose = () => {
    console.log("Disconnected. Reconnecting...");
    setTimeout(connect, 2000); // retry after 2 sec
  };
}
