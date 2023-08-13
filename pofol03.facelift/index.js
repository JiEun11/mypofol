(() => {
    const http = require('http');
    const path = require('path');
    const dotenv = require('dotenv');    
    const express = require('express');

    // 1. environment variables
    dotenv.config({path: path.join(__dirname, 'config/app.env')})
    // dotenv.config({path: path.join(__dirname, 'config/db.env')})

    // 2. application setup
    const app = express()
    
    // 2-1. static
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    // 2-2. view(template) engine
    // .set('views', path.join(__dirname, 'views'))
    // .set('view engine', 'ejs');
    
    // 3. router setup
    // appRouter.build(app);
    
    // 4. server startup
    http
    .createServer(app)
    .on('listening', () => {
        console.info('Listening on port ' + process.env.PORT);
    })
    .on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch (error.code) {
           case 'EACCES':
               console.error('Port ' + process.env.PORT + ' requires elevated privileges');
               process.exit(1);
               break;
           case 'EADDRINUSE':
               console.error('Port ' + process.env.PORT + ' is already in use');
               process.exit(1);
               break;
           default:
               throw error;
       }
   })
   .listen(process.env.PORT);    
})();