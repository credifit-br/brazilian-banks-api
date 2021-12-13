import { Holiday } from "../../../entities/Holiday";
import { IHolidayRepository } from "../../IHolidaysRepository";
import { holidaysData } from "./HolidaysData";

export class LocalHolidaysRepository implements IHolidayRepository {
  constructor() {}

  async findByDate(date: string): Promise<Holiday> {
    return holidaysData.get(date);
  }

  async saveHolidays(holidays: Holiday[]): Promise<void> {
    this.deleteHolidays(holidays);

    holidaysData.insertList(holidays);
  }

  private deleteHolidays(holidays: Holiday[]) {
    holidays.map((holiday) => {
      const holidayIsPersisted = this.findByDate(holiday.date);

      if (holidayIsPersisted) {
        holidaysData.delete(holiday.date);
      }
    });
  }
}
