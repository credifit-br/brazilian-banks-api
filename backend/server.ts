import { app } from "./app";
require("dotenv").config();
import { cronManager } from "./jobs/CronManager";

const PORT = process.env.APP_PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! 😎`);
  cronManager.run();
});
