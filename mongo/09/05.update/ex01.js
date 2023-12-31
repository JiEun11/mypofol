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

        // filter
        const filter = { name: 'bella' }

        // options
        const options =  {
            upsert: true    // to insert a document if no documents match
        }

        // update doc
        const updateDoc = {
            $set: {
              status: 'fullstack developer' 
            },
          };        

        // execute
        const result = await accounts.updateOne(filter, updateDoc, options);

        // print result
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s), upserted ${result.upsertedCount} document(s)`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

