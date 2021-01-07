const cron = require('node-cron');
const { eventBus } = require('@microservices-inc/common');
const { getAllSessions } = require('../sessionStorage');

const isOnlineJob = () => {
  cron.schedule(process.env.IS_ONLINE_JOB_SCHEDULE, async () => {
    try {
      const sessions = await getAllSessions();
      sessions.forEach(session => {
        try {
          const { userEmail, userId, authenticated } = JSON.parse(session);
          if (userEmail && userId && authenticated) {
            eventBus.publish('isOnline', {
              userEmail,
              userId,
              isOnline: true,
            });
          }
        } catch (e) {
          console.error(`Invalid session. ${e}`);
        }
      });
    } catch (e) {
      console.error(`Unexpected error. ${e}`);
    }
  });
};

module.exports = isOnlineJob;
