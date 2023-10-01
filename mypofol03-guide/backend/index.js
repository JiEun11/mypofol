
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const appRouter = require("./routes");

// application environment variables
dotenv.config({ path: path.join(__dirname, "config/app.env") });

// application setup
const app = express()
  .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(multer({ dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE), }).single("file"))
  .use(cookieParser());

// morgan setup
if (process.env.NODE_ENV === 'production') {
  // custom
  app.use(morgan(':remote-addr - :remote-user] [:date[web]] :method :url HTTP/:http-version :status :response-time ms'));
} else {
  //
  // 1. combined :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  // 2. common :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
  // 3. dev :method :url :status :response-time ms - :res[content-length]
  // 4. short :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
  // 5. tiny :method :url :status :res[content-length] - :response-time ms
  //
  app.use(morgan('dev'));
}

// swagger setup
if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerJSDoc = require("swagger-jsdoc");

  app.use(
    "/api/docs/",
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJSDoc({
        swaggerDefinition: {
          openapi: "3.0.0",
          info: {
            title: "MyPortfolio APIs",
            version: "1.0.0",
            description: "",
            license: {
              name: "Licensed Under MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "MyPortfolio",
              url: "https://myportfolio.kickscar.me",
            },
          },
          servers: [
            {
              url: `http://localhost:${process.env.PORT}`,
              description: "development server",
            },
          ],
        },
        apis: ["./routes/*.js", "./routes/swagger-components/*"],
      })
    )
  );
}

// build app router
appRouter(app);

// server startup
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