const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
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

module.exports = {
  sessionStorage,
};
