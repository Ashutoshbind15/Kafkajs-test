const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-consumer",
  brokers: ["localhost:9092"],
});

const topic = "geo-locations";
const consumer = kafka.consumer({ groupId: "geo-group" });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const location = JSON.parse(message.value.toString());
      console.log(`Consumed: ${location.latitude}, ${location.longitude}`);
      // Further processing or WebSocket transmission can occur here
    },
  });
};

consumeMessages().catch(console.error);
