const { MongoClient, ServerApiVersion } = require('mongodb');

const username = 'sample';
const password = 'sample';
const database = 'sample-mflix';
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
        const movies = db.collection("movies");

        // the estimate of the number of documents in the "movies" collection
        const estimate = await movies.estimatedDocumentCount();

        // the number of documents in the "movies" collection that match the specified query
        const query = { countries: "Canada" };
        const countCanada = await movies.countDocuments(query);

        // print result
        console.log(`estimated number of documents in the movies collection: ${estimate}`);
        console.log(`number of movies from canada: ${countCanada}`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

