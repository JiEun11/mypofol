const { MongoClient, ServerApiVersion } = require('mongodb');

const username = 'mydb';
const password = 'mydb';
const database = 'mydb';
const server = 'localhost';
const port = 27017;

const authMechanism = 'DEFAULT';
const options = `authMechanism=${authMechanism}&`;

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
        // connect to the server
        await client.connect();

        // get the database
        const db = client.db();
        
        // send a ping to confirm a successful connection
        await db.command({ ping: 1 });

        // ok!
        console.log('successfully connected!');
    } catch (error) {
        console.error(error);
    } finally {
        // clean up
        await client.close();
    }
}

test();