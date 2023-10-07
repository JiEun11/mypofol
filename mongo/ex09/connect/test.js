const { MongoClient, ServerApiVersion } = require('mongodb');

const username = 'mydb';
const password = 'mydb';
const database = 'mydb';
const server = 'localhost';
const port = 27017;
const option = {
    appname: 'mypofol-mongo-ex08',
    authMechanism: 'DEFAULT',
    minPoolSize: 0,
    maxPoolSize: 20,
    maxConnecting: 2,
    connectTimeoutMS: 20000,
    writeConcern: 'majority', 
    ssl: false,
    directConnection: true,
    serverSelectionTimeoutMS: 2000
}
const options = new URLSearchParams(option).toString();

const uri = `mongodb://${username}:${password}@${server}:${port}/${database}?${options}`;
        
// create MongoClient object from connection
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,   // specifies the version of the stable API.
        strict: true,                   // driver raises an exception if not declared API called 
        deprecationErrors: true         // driver raises an exception if deprected API called    
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