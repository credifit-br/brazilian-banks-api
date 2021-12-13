import express, { Request, Response } from "express";
import next from "next";
require("dotenv").config();
import { cronManager } from "../backend/jobs/CronManager";
import { updateHolidays } from "../backend/jobs/UpdateHolidays/UpdateHolidays";

const dev = process.env.NODE_ENV !== "production";
const isTesting = process.env.NODE_ENV == "test";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.APP_PORT || 3000;

(async () => {
  try {
    if (!isTesting) {
      // await updateHolidays();
    }

    await app.prepare();
    const server = express();
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) {
        throw err;
      }
      console.log(`> Listening on port ${port} - env ${process.env.NODE_ENV}`);
      cronManager.run();
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
