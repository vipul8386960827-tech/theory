/*
Real Time messaging means that message should appear on all clients instatnly without any delay.
and the order should be correct i mean the order in which messages are being sent.


1.Communication Channel
-------------------------------------
To achieve this we can use Websockets or long polling techniques.

Websockets is a protocol that provides full-duplex communication channels over a single TCP connection.
It allows the server to send messages to the client without the client requesting it.

Polling is a technique where the client repeatedly requests the server for new messages at regular intervals.

For real time messaging Websockets is preferred over polling because polling make unnecessary requests to the server
even when there are no new messages which can lead to increased latency and server load.
and it is not scalable as number of clients increases, unnecessary network traffic is generated.
Long-polling improves things because the server holds the request open
until an event occurs,
but the connection still closes after each response
and has to be re-opened.
This adds overhead and latency compared to WebSockets.

WebSocket gives a single persistent connection
where both server and client can send messages anytime.


2.Sending Flow
--------------------------------------
As soon as a user sends a message from client, I will create a temporary message with a cliend-generated ID
and display it in the chat UI with a "sending" status. It is called optimistic UI and makes the chat feel more responsive.

3.Server Acknowledgment
--------------------------------------
The client sends the message to the server via WebSocket.
it sends back an acknowledgment with a server-generated ID and timestamp once the message is successfully stored.
and i replace the temporary client id with server id and update the status to "sent".

5) Receiving flow:
--------------------------------
"When another user sends a message,
the server pushes it instantly through the WebSocket.
I insert it into the message list using the server timestamp
to maintain proper ordering."

7) Deduplication:
I keep track of message IDs in memory,
so if I receive a message twice because of reconnection,
I simply ignore the duplicate. so if we are keeping track of the message ids and if somehow we clear the memory than there is 
a chance that duplicate message can appear again. what we can do is that server can send us last seen id and than server can 
send us all the messages after that id.

8.Reconnection Handling:
/* 
---------------------------------------------------------
CONCISE EXPLANATION OF RECONNECTION
---------------------------------------------------------

1) Problem:
"Users can go offline or refresh and miss messages."

2) Detect & reconnect:
"WebSocket 'onclose' triggers reconnection with exponential backoff."

3) Sync missed messages:
"After reconnect, client sends last seen message ID to `/sync` API.
Server returns only new messages, avoiding gaps and duplicates."

4) Optional in-memory dedupe:
"A small recent ID set prevents duplicate rendering during live session."

5) Closing line:
"This ensures messages are never lost,
duplicates are avoided,
and order stays consistent."

---------------------------------------------------------
END OF CONCISE RECONNECTION EXPLANATION
---------------------------------------------------------

*/ 