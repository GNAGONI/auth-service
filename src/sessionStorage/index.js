const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const { promisify } = require('util');

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const mgetAsync = promisify(redisClient.mget).bind(redisClient);
const keysAsync = promisify(redisClient.keys).bind(redisClient);

redisClient.on('error', err => {
  console.log(`Could not establish a connection with redis. ${err}`);
});
redisClient.on('connect', err => {
  console.log('Connected to redis successfully');
});

const sessionStorage = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_STORAGE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.COOKIE_SECURE === 'true',
    httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
    maxAge: Number(process.env.COOKIE_MAX_AGE),
  },
});

const getAllSessions = async () => {
  const getAllSessionsPromise = new Promise((resolve, reject) => {
    keysAsync('sess:*')
      .then(keys => {
        if (keys.length) {
          mgetAsync(keys)
            .then(sessions => {
              resolve(sessions);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          resolve([]);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
  const sessions = await getAllSessionsPromise;
  return sessions;
};

module.exports = {
  sessionStorage,
  getAllSessions,
};
