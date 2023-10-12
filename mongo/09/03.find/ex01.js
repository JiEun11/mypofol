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

        // query
        const query = { title: "One Week" }

        // options
        const options = {
            projection: { _id: 0, title: 1, imdb: 1 }   // _id(x) title(o) imdb(o) 
        }

        // execute
        const movie = await movies.findOne(query, options);

        // print document
        console.log(movie);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

