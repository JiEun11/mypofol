const { MongoClient } = require('mongodb');

const username = 'sample';
const password = 'sample';
const database = 'sample-mflix';
const server = 'localhost';
const port = 27017;
const options = ``;

const uri = `mongodb://${username}:${password}@${server}:${port}/${database}?${options}`;
const client = new MongoClient(uri); // Not Stable Version

async function test() {
    try {
        // get database
        const db = client.db();

        // using the 'dbStats' command
        const result = await db.command({
            dbStats: 1,
        });

        // print result
        console.log(result);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

