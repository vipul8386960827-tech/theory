/* 17_message_queues.js

=====================================================
Message Queues
=====================================================

Definition (What I should say in the interview):
- "A **message queue** lets one service (the **producer**) send a message that another service
   (the **consumer**) processes **later and independently**. The queue sits in the middle, so
   services are **decoupled**: the producer does not wait, and if the consumer is slow or down,
   messages wait safely in the queue. It helps with **traffic spikes**, **retries** and scaling
   consumers separately. Common tools are **RabbitMQ**, **Kafka**, **AWS SQS**, and Redis-based
   queues like BullMQ."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Producer -> Queue/Broker -> Consumer(s).
2. **Acknowledgement (ack)**: consumer confirms processing; un-acked messages are redelivered.
3. **At-least-once delivery** is common -> consumers must be **idempotent**.
4. **Dead Letter Queue (DLQ)** for messages that keep failing.
5. Point-to-point (one consumer gets it) vs Pub/Sub (every subscriber gets a copy).

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Tool      | Model                     | Good for                                   |
|-----------|---------------------------|--------------------------------------------|
| RabbitMQ  | Broker with queues/routes | Task queues, flexible routing              |
| Kafka     | Distributed append log    | Event streaming, high throughput, replay   |
| AWS SQS   | Managed queue             | Simple, serverless-friendly, no ops        |
| BullMQ    | Redis-backed job queue    | Background jobs inside a Node stack        |

-----------------------------------------------------
Example (RabbitMQ with amqplib)
-----------------------------------------------------
const amqp = require('amqplib');

// Producer (order service)
const conn = await amqp.connect(process.env.AMQP_URL);
const ch = await conn.createChannel();
await ch.assertQueue('order_created', { durable: true });
ch.sendToQueue('order_created', Buffer.from(JSON.stringify({ orderId: 42 })), { persistent: true });

// Consumer (email service)
await ch.prefetch(10);                               // max 10 unacked at a time
ch.consume('order_created', async (msg) => {
  const { orderId } = JSON.parse(msg.content.toString());
  try {
    await sendConfirmationEmail(orderId);
    ch.ack(msg);
  } catch (err) {
    ch.nack(msg, false, false);                      // reject -> goes to DLQ if configured
  }
});

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Non-idempotent consumer + redelivery -> customer gets two emails or is charged twice.
- Auto-ack before processing -> message lost if the consumer crashes.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Kafka vs RabbitMQ in one line?
A1: Kafka is a durable event log you can replay; RabbitMQ is a broker that deletes messages after ack.

Q2: How do you make a consumer idempotent?
A2: Store a processed message/order ID and skip duplicates, or use DB unique constraints.
*/
