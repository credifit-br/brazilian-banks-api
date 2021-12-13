import { holidaysRepository } from "../../factories/holidaysRepository";
import { GetHolidayController } from "./GetHolidayController";
import { GetHolidayUseCase } from "./GetHolidayUseCase";

const getHolidayUseCase = new GetHolidayUseCase(holidaysRepository);

const getHolidayController = new GetHolidayController(getHolidayUseCase);

export { getHolidayUseCase, getHolidayController };
