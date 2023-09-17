(() => {
    const http = require('http');
    const path = require('path');
    const dotenv = require('dotenv');    
    const express = require('express');
    const session = require('express-session');
    const multer = require('multer');
    const {appRouter} = require('./routes');

    // 1. application environment variables
    dotenv.config({path: path.join(__dirname, 'config/app.env')})

    // 2. application setup
    const app = express()    
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))  // 2-1. static    
    .set('views', path.join(__dirname, 'views'))                                        // 2-2. view(template) engine
    .set('view engine', 'ejs')                                                          //
    .use(express.json())                                                                // 2-3. body parsers
    .use(express.urlencoded({extended: true}))                                          //
    .use(multer({dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE)}).single('file')) // multipart
    /*
      세션 처리 추가
    */    
    .use(session({ 
        secret: 'mypofol-session',
        resave: false,
        saveUninitialized: false  
    }));

    // 3. swagger setup
    if(process.env.NODE_ENV === 'development') {
        const swaggerUi = require('swagger-ui-express');
        const swaggerJSDoc = require('swagger-jsdoc');

        app.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'MyPortfolio APIs',
                    version: '1.0.0',
                    description: '',
                    license: {
                        name: 'Licensed Under MIT',
                        url: 'https://spdx.org/licenses/MIT.html',
                    },
                    contact: {
                        name: 'MyPortfolio',
                        url: 'https://myportfolio.kickscar.me',
                    }                    
                },
                servers: [{
                    url: `http://localhost:${process.env.PORT}`,
                    description: 'development server',
                }]                
            },
            apis: ['./routes/*.js', './routes/swagger-components/*']
        })));
    }   
    
    // 4. build app router 
    appRouter(app);
    
    // 5. server startup
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