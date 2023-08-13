const connect = require('connect');
const serveStatic = require('serve-static');

const port = 7070;
const app = connect();
app.use(serveStatic(__dirname + '/public'));
app.listen(port, function(){
    console.log(`Http Server running on port ${port}`);
});