const isOnlineJob = require('./isOnlineJob');

const runJobs = () => {
  isOnlineJob();
};

module.exports = {
  runJobs,
};
