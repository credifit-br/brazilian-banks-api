import { holidaysRepository } from "../../factories/holidaysRepository";
import { SaveHolidaysController } from "./SaveHolidaysController";
import { SaveHolidaysUseCase } from "./SaveHolidaysUseCase";

const saveHolidaysUseCase = new SaveHolidaysUseCase(holidaysRepository);

const saveHolidaysController = new SaveHolidaysController(saveHolidaysUseCase);

export { saveHolidaysUseCase, saveHolidaysController };
