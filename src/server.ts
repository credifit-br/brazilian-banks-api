import { app } from "./app";
require("dotenv").config();
import { cronManager } from "./jobs/CronManager";

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}! 😎`);
  cronManager.run();
});
