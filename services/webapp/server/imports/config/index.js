ServiceConfiguration.configurations.remove({
  service: 'google'
})
ServiceConfiguration.configurations.insert({
  service: 'google',
  clientId: '7453122244-88q62our9mp0j73p9v3bkmnrlrqdpfhn.apps.googleusercontent.com',
  secret: 'CKd-vE0RAgTywIcURQtwYbGr'
})


if (!process.env.ELASTICSEARCH_URL) {
  process.env.ELASTICSEARCH_URL = "localhost:9200";
}

if (!process.env.DB_NAME) {
  process.env.DB_NAME = "meteor";
}


process.env.PYTHONWARNINGS = "ignore";

console.log("Root URL: ", process.env.ROOT_URL);
console.log("Port: ", process.env.PORT);
console.log("Mongo URL: ", process.env.MONGO_URL);
console.log("Database Name: ", process.env.DB_NAME);
console.log("Elasticsearch URL: ", process.env.ELASTICSEARCH_URL);
