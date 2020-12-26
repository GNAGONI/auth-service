const { EventBus } = require('./eventBus.js');

class EventBusPublisher extends EventBus {
  publish(msg) {
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(msg)));
  }
}

module.exports = { EventBusPublisher };
