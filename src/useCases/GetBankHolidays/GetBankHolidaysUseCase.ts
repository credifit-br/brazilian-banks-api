import { IBankHolidaysProvider } from "../../providers/IBankHolidaysProvider";

export class GetBankHolidaysUseCase {
  constructor(private readonly bankHolidaysProvider: IBankHolidaysProvider) {}

  async execute(year: string) {
    return await this.bankHolidaysProvider.getHolidays(year);
  }
}
