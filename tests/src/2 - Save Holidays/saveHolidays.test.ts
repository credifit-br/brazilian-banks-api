import { saveHolidaysController } from "../../../src/useCases/SaveHolidays";
import { Holiday } from "../../../src/entities/Holiday";
import { makeFeriadoRequest } from "../../utils/requests";

describe("Save Holidays", () => {
  async function makeRequestAndAssertResponse(
    date: string,
    expectedHoliday: Holiday
  ) {
    const response = await makeFeriadoRequest(date);
    const holiday: Holiday = response.body;

    expect(response.statusCode).toBe(200);
    expect(holiday).toStrictEqual(expectedHoliday);
  }
  test("Should insert a list of holidays successfully", async () => {
    try {
      const responseBeforeUpdate = await makeFeriadoRequest("2020-12-12");
      expect(responseBeforeUpdate.statusCode).toBe(404);

      const newHolidaysList: Holiday[] = [
        {
          name: "teste",
          date: "2020-12-12",
          type: "Nacional",
        },
        {
          name: "teste",
          date: "2020-12-14",
          type: "Nacional",
        },
      ];

      await saveHolidaysController.handle(newHolidaysList);

      await makeRequestAndAssertResponse("2020-12-12", {
        date: "2020-12-12",
        name: "teste",
        type: "Nacional",
      });

      await makeRequestAndAssertResponse("2020-12-14", {
        name: "teste",
        date: "2020-12-14",
        type: "Nacional",
      });
    } catch (error) {
      expect(error).toBeNull();
    }
  });
  test("Should update a persited holiday", async () => {
    try {
      await makeRequestAndAssertResponse("2021-01-01", {
        date: "2021-01-01",
        name: "Dia Mundial da Paz",
        type: "Nacional",
      });

      const newHolidaysList: Holiday[] = [
        {
          name: "Atualizei o dia da paz",
          date: "2021-01-01",
          type: "Nacional",
        },
      ];

      await saveHolidaysController.handle(newHolidaysList);

      await makeRequestAndAssertResponse("2021-01-01", {
        date: "2021-01-01",
        name: "Atualizei o dia da paz",
        type: "Nacional",
      });
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
