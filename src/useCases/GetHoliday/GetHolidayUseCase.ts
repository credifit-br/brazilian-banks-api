import { IGetHolidayRequestDTO } from "./GetHolidayDTO";
import { IHolidayRepository } from "../../repositories/IHolidaysRepository";

export class GetHolidayUseCase {
  constructor(private readonly holidayRepository: IHolidayRepository) {}

  async execute({ date }: IGetHolidayRequestDTO) {
    const holiday = await this.holidayRepository.findByDate(date);

    return holiday;
  }
}
