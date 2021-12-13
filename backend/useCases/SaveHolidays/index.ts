import { SaveHolidaysController } from "./SaveHolidaysController";
import { SaveHolidaysUseCase } from "./SaveHolidaysUseCase";
import { LocalHolidaysRepository } from "../../repositories/implementations/local/LocalHolidaysRepository";

const localHolidaysRepository = new LocalHolidaysRepository();

const saveHolidaysUseCase = new SaveHolidaysUseCase(localHolidaysRepository);

const saveHolidaysController = new SaveHolidaysController(saveHolidaysUseCase);

export { saveHolidaysUseCase, saveHolidaysController };
