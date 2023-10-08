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
        const accounts = db.collection("accounts");

        // document to insert
        const doc = { name: 'kickscar', email: 'kickscar@gmail.com', passsword: '1234'}

        // execute
        const result = await accounts.insertOne(doc);

        // print result
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

