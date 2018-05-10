import logger from '/both/imports/logger';
ServiceConfiguration.configurations.remove({
  service: 'google',
});
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  });
} else {
  logger.warn(
    "Config: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set, Google login won't work"
  );
}

if (!process.env.ELASTICSEARCH_URL) {
  process.env.ELASTICSEARCH_URL = 'localhost:9200';
}

if (!process.env.DB_NAME) {
  process.env.DB_NAME = 'meteor';
}

process.env.PYTHONWARNINGS = 'ignore';

console.log('Root URL: ', process.env.ROOT_URL);
console.log('Port: ', process.env.PORT);
console.log('Mongo URL: ', process.env.MONGO_URL);
console.log('Database Name: ', process.env.DB_NAME);
console.log('Elasticsearch URL: ', process.env.ELASTICSEARCH_URL);
