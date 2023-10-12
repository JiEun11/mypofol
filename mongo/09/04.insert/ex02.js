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
        // get document
        const db = client.db();

        // get collection
        const accounts = db.collection('accounts');

        // an array of document to insert
        const docs = [
            { name: 'loopy', email: 'loopy@gmail.com', password: '1234' },
            { name: 'luffy', email: 'luffy@gmail.com', password: '1234' },
            { name: 'bluepoet', email: 'bluepoet@gmail.com', password: '1234' }
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

