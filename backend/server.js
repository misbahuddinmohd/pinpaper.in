const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const redisClient = require('./config/redisClient');
const monitorChangeStream = require('./services/mongoDbStreams');

dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 4000;

// DB connection
mongoose
    .connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => {
        console.log('DB connection successful');

        // Start monitoring Change Streams after DB connection
        monitorChangeStream();
    });


// Redis connection
// const redisClient = redis.createClient({
//     url: process.env.REDIS_URL || 'redis://localhost:6379', // Use environment variable or default to localhost
//     // password: process.env.REDIS_PASSWORD, // Include password if set in the environment variables
// });

// redisClient
//     .connect()
//     .then(() => console.log('Redis connection successful'))
//     .catch((err) => console.error('Redis connection error:', err));

// server initialization (listen)
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});