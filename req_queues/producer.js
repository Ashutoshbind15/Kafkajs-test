import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});

const topic = "geo-locations";
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const produceMessages = async () => {
  await producer.connect();

  await producer.send({ topic, messages: [{ value: "Hello KafkaJS user!" }] });

  //   setInterval(async () => {
  //     const latitude = (Math.random() * 180 - 90).toFixed(5); // Random latitude
  //     const longitude = (Math.random() * 360 - 180).toFixed(5); // Random longitude
  //     await producer.send({
  //       topic,
  //       messages: [
  //         {
  //           value: JSON.stringify({
  //             latitude,
  //             longitude,
  //             timestamp: new Date().toISOString(),
  //           }),
  //         },
  //       ],
  //     });
  //     console.log(`Produced: ${latitude}, ${longitude}`);
  //   }, 100); // Adjust speed as necessary
};

produceMessages().catch(console.error);
