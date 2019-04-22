import "reflect-metadata";
// import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {Student} from "./entity/Student";
import { Teacher } from "./entity/Teacher";
import getConnection from './connection';
const PORT='3000';
getConnection().then(async connection => {

    // create express app
    const app = express();
   // this.app.use("/api", Routes);
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
    });

}).catch(error => console.log(error));
