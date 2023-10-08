const { MongoClient } = require('mongodb');

const username = 'sample';
const password = 'sample';
const database = 'sample-mflix';
const server = 'localhost';
const port = 27017;
const options = ``;

const uri = `mongodb://${username}:${password}@${server}:${port}/${database}?${options}`;
const client = new MongoClient(uri); // Not Stable API Version

async function test() {
    try {
        // get database
        const db = client.db();

        // get collection
        const movies = db.collection("movies");

        // specify the field to make values distinct 
        const fieldName = "year";

        // query
        const query = { directors: "Barbra Streisand" };

        // execute
        const distinctValues = await movies.distinct(fieldName, query);

        // print result
        console.log(distinctValues);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

