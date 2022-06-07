import express, { Express } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import routes from './router';

class App {
  server: Express;

  constructor() {
    // Init var express
    this.server = express();

    // Insert middlewares (cors, sessions...)
    this.middlewares();

    // Insert routes
    this.routes();
  };

  routes() {
    this.server.use(routes);
  };

  middlewares() {
    this.server.use(cors());

    // Add headers
    this.server.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'false');

      // Pass to next layer of middleware
      next();
    });

    this.server.use(bodyParser.json({ limit: '50mb' }));
    this.server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  };
};

export default new App().server;