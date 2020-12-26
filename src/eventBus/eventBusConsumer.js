const { EventBus } = require('./eventBus.js');

class EventBusConsumer extends EventBus {
  consume() {
    this.channel.consume(
      this.queue,
      msg => {
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      },
    );
  }
}

module.exports = { EventBusConsumer };
