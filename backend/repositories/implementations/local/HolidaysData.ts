import { Holiday } from "../../../entities/Holiday";
import { GlobalRef } from "../../../helpers/GlobalRef";
import febrabanHolidays from "./holidays";

class HolidaysData {
  private holidays: Holiday[];

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
}

const databaseConn = new GlobalRef<HolidaysData>("myapp.database");

if (!databaseConn.value) {
  databaseConn.value = new HolidaysData();
}

export const holidaysData = databaseConn.value;
