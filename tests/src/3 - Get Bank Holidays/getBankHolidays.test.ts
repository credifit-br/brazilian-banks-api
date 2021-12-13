import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getBankHolidaysController } from "../../../backend/useCases/GetBankHolidays";

describe("Get Febraban holidays", () => {
  test("Should get 2021 holidays successfully", async () => {
    try {
      const year = "2021";

      const holidays = await getBankHolidaysController.handle(year);

      expect(holidays).toBeTruthy();
      expect(holidays.length).toBeGreaterThanOrEqual(14);

      expect(holidays[0].date.includes(year)).toBeTruthy();
      expect(holidays[0].name).toBeTruthy();
      expect(holidays[0].type).toBe("Feriado Nacional");
    } catch (error) {
      expect(error).toBeNull();
    }
  });
  test("Should get 2022 holidays successfully", async () => {
    try {
      const year = "2022";

      const holidays = await getBankHolidaysController.handle(year);

      expect(holidays).toBeTruthy();
      expect(holidays.length).toBeGreaterThanOrEqual(14);

      expect(holidays[0].date.includes(year)).toBeTruthy();
      expect(holidays[0].name).toBeTruthy();
      expect(holidays[0].type).toBe("Feriado Nacional");
    } catch (error) {
      expect(error).toBeNull();
    }
  });
  test("Should return empty array when bad request", async () => {
    try {
      const year = "-2022";

      const holidays = await getBankHolidaysController.handle(year);

      expect(holidays.length).toBe(0);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
  describe("Mocked axios", () => {
    let mock;
    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    test("Should return empty array when febraban request fail", async () => {
      try {
        const year = "2022";

        mock
          .onGet(
            `https://feriadosbancarios.febraban.org.br/Home/ObterFeriadosFederaisF?ano=${year}`
          )
          .networkError();

        const holidays = await getBankHolidaysController.handle(year);

        expect(holidays).toBeTruthy();
      } catch (error) {
        console.log(error);
        expect(error).toBeNull();
      }
    });
  });
});
