  const http = require("http");
  const path = require("path");
  const dotenv = require("dotenv");
  const express = require("express");
  const multer = require("multer");
  const cookieParser = require("cookie-parser");
  const morgan = require('morgan');

  // 1. application environment variables
  dotenv.config({ path: path.join(__dirname, "config/app.env") });

  // 2. application setup
  const app = express();

  // 3. logger(winston)
const logger = require('./logger');
logger.stream = { write: (message) => logger.http(message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')) };


  // 4. logger(morgan)
  if (process.env.NODE_ENV === 'production') {
    // custome
    app.use(morgan(':remote-addr - :remote-user] [:date[web]] :method :url HTTP/:http-version :status :response-time ms', { stream: logger.stream }));
  } else if (process.env.NODE_ENV === 'development') {
    // pre-defined formats
    //
    // 1. 'combined' :remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'
    // 2. 'common' :remote-addr - :remote-user [:date[clf]] ':method :url HTTP/:http-version' :status :res[content-length]
    // 3. 'dev' :method :url :status :response-time ms - :res[content-length]
    // 4. 'short' :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
    // 5. 'tiny' :method :url :status :res[content-length] - :response-time ms
    //
    app.use(morgan('dev', { stream: logger.stream }));
  }
  
  // 5. application setup
    app.use(
      express.static(
        path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)
      )
    ) // 2-1. static
    .set("views", path.join(__dirname, "views")) // 2-2. view(template) engine
    .set("view engine", "ejs") //
    .use(express.json()) // 2-3. body parsers
    .use(express.urlencoded({ extended: true })) //
    .use(
      multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE),
      }).single("file")
    ) // multipart
    /**
     * 쿠키 처리 추가
     */
    .use(cookieParser())
    ;

  // 6. swagger setup
  if (process.env.NODE_ENV === "development") {
    const swaggerUi = require("swagger-ui-express");
    const swaggerJSDoc = require("swagger-jsdoc");
    const swaggerConfig = require("./config/swagger.json");

    const handler = swaggerUi.setup(swaggerJSDoc(swaggerConfig));

    app.use(
      "/api/docs/",
      swaggerUi.serve,
      handler
    );
  }

  // 7. build app router
  const appRouter = require('./routes');
  appRouter(app);


  // 8. server startup
  http
    .createServer(app)
    .on("listening", () => {
      console.info("Listening on port " + process.env.PORT);
    })
    .on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      switch (error.code) {
        case "EACCES":
          console.error(
            "Port " + process.env.PORT + " requires elevated privileges"
          );
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error("Port " + process.env.PORT + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    })
    .listen(process.env.PORT);
