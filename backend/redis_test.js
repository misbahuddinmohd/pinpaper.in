const redis = require('redis');

(async () => {
    const client = redis.createClient({
        url: 'redis://localhost:6379',
        // password: 'your_redis_password', // Uncomment if you have a password
    });

    try {
        await client.connect();
        console.log('Connected to Redis!');

        const data = {
            key1: "val1",
            key2: {
                subkey1: "val2"
            }
        }

        await client.set('testKey', 'testValue');
        // there is a limitation with redis json, it can only store upto 128 nested objects
        // so better to convert json to string and vice versa
        // await client.json.set("expjson", "$", data);
        await client.set("expjson", JSON.stringify(data));
    
        const value1 = await client.get('testKey');
        let value2 = await client.get("expjson");
        value2 = JSON.parse(value2);

        console.log('Value from Redis:', value1);
        console.log('Value from Redis:', value2.key1);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.quit();
    }
})();
