import { SaveHolidaysDTO } from "./SaveHolidaysDTO";
import { SaveHolidaysUseCase } from "./SaveHolidaysUseCase";

export class SaveHolidaysController {
  constructor(private readonly saveHolidaysUseCase: SaveHolidaysUseCase) {}

  async handle(holidays: SaveHolidaysDTO[]) {
    await this.saveHolidaysUseCase.execute(holidays);
  }
}
