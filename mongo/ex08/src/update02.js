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

        // filter
        const filter = { status: { $eq: null } }

        // update doc
        const updateDoc = {
            $set: {
                status: 'frontend developer'
            },
        };

        // execute
        const result = await accounts.updateMany(filter, updateDoc);

        // print result
        console.log(`updated ${result.modifiedCount} documents`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

