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
        const query = { runtime: { $lt: 15 } };

        // options
        const options = {
            sort: { runtime: 1 },                                   // ascending
            projection: { _id: 0, title: 1, runtime: 1, imdb: 1 }   // _id(x) title(o) runtime(o) imdb(o) 
        }

        // execute
        const cursor = await movies.find(query, options);

        // if no documents were found
        if ((await movies.countDocuments(query)) === 0) {
            console.log("No documents found!");
        }

        // print documents
        for await (const movie of cursor) {
            console.log(movie);
        }

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

test();

