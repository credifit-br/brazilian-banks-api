import { Holiday } from "../../../entities/Holiday";
import febrabanHolidays from "./holidays";

export class HolidaysData {
  private holidays: Holiday[];
  private static instance: HolidaysData;

  constructor() {
    this.holidays = febrabanHolidays;
  }

  getAll() {
    return this.holidays;
  }

  get(date: string) {
    return this.holidays.find((holiday) => holiday.date === date);
  }

  insert(holiday: Holiday) {
    this.holidays = [...this.holidays, holiday];
  }

  insertList(holidays: Holiday[]) {
    this.holidays = [...this.holidays, ...holidays];
  }

  delete(date: string) {
    this.holidays = this.holidays.filter((holiday) => holiday.date !== date);
  }

  deleteAll() {
    this.holidays = [];
  }

  public static getInstance(): HolidaysData {
    if (!this.instance) {
      this.instance = new HolidaysData();
    }

    return this.instance;
  }
}
