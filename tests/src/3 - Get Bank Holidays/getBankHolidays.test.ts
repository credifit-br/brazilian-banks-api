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
  test("Should when year doesnt has holiday", async () => {
    try {
      const year = "-2022";

      const holidays = await getBankHolidaysController.handle(year);

      expect(holidays).toBeTruthy();
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
