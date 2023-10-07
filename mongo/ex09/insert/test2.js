const { MongoClient, ServerApiVersion } = require('mongodb');

const username = 'mydb';
const password = 'mydb';
const database = 'mydb';
const server = 'localhost';
const port = 27017;

const options = ``;

const uri = `mongodb://${username}:${password}@${server}:${port}/${database}?${options}`;

// create MongoClient object from connection
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function test() {
    try {
        await client.connect();
        const database = client.db();

        // get collection
        const accounts = database.collection('accounts');

        // an array of document to insert
        const docs = [
            { name: 'dounu', email: 'dounu@gmail.com', password: '1234' },
            { name: 'ddochi', email: 'ddochi@gmail.com', password: '1234' },
            { name: 'michol', email: 'michol@gmail.com', password: '1234' }
        ];

        // if one fails, prevent additional documents from being inserted
        const options = { ordered: true };

        // execute
        const result = await accounts.insertMany(docs, options);

        // print result
        console.log(`${result.insertedCount} documents were inserted`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

