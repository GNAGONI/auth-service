const amqp = require('amqplib');

class EventBus {
  constructor(brokerUrl, queue) {
    this.channel = null;
    this.connection = null;
    this.queue = queue;
    this.brokerUrl = brokerUrl;
  }

  async init() {
    await this.createConnection();
    await this.createChannel();
    await this.createQueue();
  }

  createConnection() {
    return amqp
      .connect(this.brokerUrl)
      .then(connection => {
        this.connection = connection;
      })
      .catch(e => {
        console.error(e);
      });
  }

  createChannel() {
    return this.connection
      .createChannel()
      .then(channel => {
        this.channel = channel;
      })
      .catch(e => {
        console.error(e);
      });
  }

  createQueue() {
    return this.channel.assertQueue(this.queue).catch(e => {
      console.error(e);
    });
  }
}

module.exports = { EventBus };
