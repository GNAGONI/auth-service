const cron = require('node-cron');
const { EventBusPublisher } = require('@microservices-inc/common');
const { getAllSessions } = require('../sessionStorage');

const isOnlineJob = () => {
  cron.schedule(process.env.IS_ONLINE_JOB_SCHEDULE, async () => {
    const sessions = await getAllSessions();
    const publisher = new EventBusPublisher(
      process.env.RABBITMQ_URI,
      'isOnline',
    );
    await publisher.init();
    sessions.forEach(session => {
      const { userEmail, userId } = JSON.parse(session);
      if (userEmail && userId) {
        publisher.publish({
          userEmail,
          userId,
        });
      }
    });
  });
};

module.exports = isOnlineJob;
