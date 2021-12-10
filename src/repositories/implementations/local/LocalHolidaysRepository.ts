import { Holiday } from "../../../entities/Holiday";
import { IHolidayRepository } from "../../IHolidaysRepository";
import { HolidaysData } from "./HolidaysData";

export class LocalHolidaysRepository implements IHolidayRepository {
  constructor() {}

  async findByDate(date: string): Promise<Holiday> {
    return HolidaysData.getInstance().get(date);
  }

  async saveHolidays(holidays: Holiday[]): Promise<void> {
    this.deleteHolidays(holidays);

    HolidaysData.getInstance().insertList(holidays);
  }

  private deleteHolidays(holidays: Holiday[]) {
    holidays.map((holiday) => {
      const holidayIsPersisted = this.findByDate(holiday.date);

      if (holidayIsPersisted) {
        HolidaysData.getInstance().delete(holiday.date);
      }
    });
  }
}
