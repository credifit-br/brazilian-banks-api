import { GetHolidayController } from "./GetHolidayController";
import { GetHolidayUseCase } from "./GetHolidayUseCase";
import { LocalHolidaysRepository } from "../../repositories/implementations/local/LocalHolidaysRepository";

const localHolidaysRepository = new LocalHolidaysRepository();

const getHolidayUseCase = new GetHolidayUseCase(localHolidaysRepository);

const getHolidayController = new GetHolidayController(getHolidayUseCase);

export { getHolidayUseCase, getHolidayController };
