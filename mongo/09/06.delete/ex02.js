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
        // get database
        const db = client.db();

        // get collection
        const accounts = db.collection('accounts');

        // query
        const query = { name: {$ne: null}};

        // execute
        const result = await accounts.deleteMany(query);

        // print result
        console.log(`deleted ${result.deletedCount} documents`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

