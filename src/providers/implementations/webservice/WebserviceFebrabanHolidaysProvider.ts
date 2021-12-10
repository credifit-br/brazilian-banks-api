import axios, { AxiosInstance } from "axios";
import https from "https";
import { Holiday } from "entities/Holiday";
import { IBankHolidaysProvider } from "../../IBankHolidaysProvider";

interface FebrabanHoliday {
  diaMes: string;
  diaSemana: string;
  nomeFeriado: string;
}

export class WebserviceFebrabanHolidaysProvider
  implements IBankHolidaysProvider
{
  private baseUrl = "https://feriadosbancarios.febraban.org.br/Home";
  private axiosInstance: AxiosInstance;

  private months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
  }

  async getHolidays(year: string): Promise<Holiday[]> {
    const [bankHolidays, nationalHolidays] = await Promise.all([
      this.getBankHolidaysRequest(year),
      this.getNationalHolidaysRequest(year),
    ]);

    if (this.hasError(bankHolidays) && this.hasError(nationalHolidays)) {
      return [];
    }

    const nationalHolidaysMaped = nationalHolidays.map((holiday) => {
      return this.mapFebrabanHolidaysToHolidaySettingType(
        holiday,
        year,
        "Feriado Nacional"
      );
    });

    const brankHolidaysMaped = bankHolidays.map((holiday) => {
      return this.mapFebrabanHolidaysToHolidaySettingType(
        holiday,
        year,
        "Recomendação Febraban"
      );
    });

    const holidays: Holiday[] =
      nationalHolidaysMaped.concat(brankHolidaysMaped);

    return holidays;
  }

  private async getBankHolidaysRequest(year: string) {
    const response = await this.axiosInstance.get(
      this.buildBankHolidaysRequest(year)
    );

    const bankHolidays: FebrabanHoliday[] = response.data;

    return bankHolidays;
  }

  private buildBankHolidaysRequest(year: string): string {
    return `${this.baseUrl}/ObterFeriadosFederaisF?ano=${year}`;
  }

  private async getNationalHolidaysRequest(year: string) {
    const response = await this.axiosInstance.get(
      this.buildNationalHolidaysRequest(year)
    );

    const nationalHolidays: FebrabanHoliday[] = response.data;

    return nationalHolidays;
  }

  private buildNationalHolidaysRequest(year: string): string {
    return `${this.baseUrl}/ObterFeriadosFederais?ano=${year}`;
  }

  private hasError(holidays: FebrabanHoliday[]) {
    return !holidays || !Array.isArray(holidays);
  }

  private mapFebrabanHolidaysToHolidaySettingType(
    holiday: FebrabanHoliday,
    year: string,
    type: string
  ): Holiday {
    return {
      name: holiday.nomeFeriado,
      date: this.parseFerbrabanDateToIso(holiday.diaMes, year),
      type,
    };
  }

  private parseFerbrabanDateToIso(ferbrabanDate, year) {
    const dateSplited = ferbrabanDate.split(" ");

    const dayIndex = 0;
    const day = dateSplited[dayIndex];

    const monthIndex = 2;
    const portugueseMonthLiteral = dateSplited[monthIndex];
    const monthNumber = this.months.indexOf(portugueseMonthLiteral) + 1;

    return `${year}-${this.completeWithTwoZero(monthNumber)}-${day}`;
  }

  private completeWithTwoZero(num: number) {
    return num.toString().padStart(2, "0");
  }
}
