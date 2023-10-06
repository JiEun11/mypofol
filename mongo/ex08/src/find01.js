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
        const query = { name: 'dooly' }

        // options
        const options = {
            projection: { _id: 0, name: 1, email: 1 }   // _id(x) name(o) email(o) 
        }

        // execute
        const account = await accounts.findOne(query, options);

        // print document
        console.log(account);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

