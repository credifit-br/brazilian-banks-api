import { IHolidayRepository } from "../../repositories/IHolidaysRepository";
import { SaveHolidaysDTO } from "./SaveHolidaysDTO";

export class SaveHolidaysUseCase {
  constructor(private readonly holidaysRepository: IHolidayRepository) {}

  async execute(holidays: SaveHolidaysDTO[]) {
    await this.holidaysRepository.saveHolidays(holidays);
  }
}
