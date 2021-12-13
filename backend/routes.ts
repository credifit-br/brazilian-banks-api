import { Router } from "express";
import { getHolidayController } from "./useCases/GetHoliday";

const router = Router();

router.get("/feriado/:data", (request, response) => {
  return getHolidayController.handle(request, response);
});

export { router };
