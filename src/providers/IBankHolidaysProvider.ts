import { Holiday } from "../entities/Holiday";

export interface IBankHolidaysProvider {
  getHolidays(year: string): Promise<Holiday[]>;
}
