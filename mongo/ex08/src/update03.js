const { MongoClient, ServerApiVersion } = require('mongodb');

const username = 'mydb';
const password = 'mydb';
const database = 'mydb';
const server = 'localhost';
const port = 27017;

const options = ``;

const uri = `mongodb://${username}:${password}@${server}:${port}/${database}?&${options}`;

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
        const accounts = database.collection("account");

        // query selector
        const query = { name: { $regex: 'dooly' } }

        // update doc
        const replaceDoc = {
            name: 'dully',
            email: 'dully@gmail.com',
            status: 'full-stack developer'
        };

        // execute
        const result = await accounts.replaceOne(query, replaceDoc);

        // print result
        console.log(`modified ${result.modifiedCount} document(s)`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

