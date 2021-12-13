import axios, { AxiosInstance } from "axios";
import https from "https";
import { Holiday } from "../../../entities/Holiday";
import { logger } from "../../../utils/logger";
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
  private axiosConf = {
    headers: {
      "Content-Type": "application/json",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

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

  constructor() {}

  async getHolidays(year: string): Promise<Holiday[]> {
    const [bankHolidays, nationalHolidays] = await Promise.all([
      this.getBankHolidaysRequest(year),
      this.getNationalHolidaysRequest(year),
    ]);

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
    try {
      const response = await axios.get(
        this.buildBankHolidaysRequest(year),
        this.axiosConf
      );

      this.validate(response.data);

      const bankHolidays: FebrabanHoliday[] = response.data;

      return bankHolidays;
    } catch (error) {
      logger("Failed to load bank holidays from febraban");
      return [];
    }
  }

  private buildBankHolidaysRequest(year: string): string {
    return `${this.baseUrl}/ObterFeriadosFederaisF?ano=${year}`;
  }

  private async getNationalHolidaysRequest(year: string) {
    try {
      const response = await axios.get(
        this.buildNationalHolidaysRequest(year),
        this.axiosConf
      );

      this.validate(response.data);

      const nationalHolidays: FebrabanHoliday[] = response.data;

      return nationalHolidays;
    } catch (error) {
      logger("Failed to load national holidays from febraban");
      return [];
    }
  }

  private buildNationalHolidaysRequest(year: string): string {
    return `${this.baseUrl}/ObterFeriadosFederais?ano=${year}`;
  }

  private validate(holidays: FebrabanHoliday[]) {
    const isNotValid = !holidays || !Array.isArray(holidays);

    if (isNotValid) {
      throw Error();
    }
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
