const { EventBus } = require('./eventBus.js');

class EventBusConsumer extends EventBus {
  consume(handler) {
    this.channel.consume(this.queue, handler, {
      noAck: true,
    });
  }
}

module.exports = { EventBusConsumer };
