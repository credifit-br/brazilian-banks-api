import { Holiday } from "../entities/Holiday";

export interface IHolidayRepository {
  findByDate(date: string): Promise<Holiday>;
  saveHolidays(holidays: Holiday[]): Promise<void>;
}
