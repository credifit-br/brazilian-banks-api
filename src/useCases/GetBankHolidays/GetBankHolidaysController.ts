import { GetBankHolidaysUseCase } from "./GetBankHolidaysUseCase";

export class GetBankHolidaysController {
  constructor(
    private readonly getBankHolidaysUseCase: GetBankHolidaysUseCase
  ) {}

  async handle(year: string) {
    return await this.getBankHolidaysUseCase.execute(year);
  }
}
