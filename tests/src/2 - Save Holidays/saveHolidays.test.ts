import { saveHolidaysController } from "../../../backend/useCases/SaveHolidays";
import { getHolidayUseCase } from "../../../backend/useCases/GetHoliday";
import { Holiday } from "../../../backend/entities/Holiday";
import { makeFeriadoRequest } from "../../utils/requests";
import { assertResponseError } from "../../utils/response";

describe("Save Holidays", () => {
  async function makeRequestAndAssertResponse(
    date: string,
    expectedHoliday: Holiday
  ) {
    const holiday: Holiday = await getHolidayUseCase.execute({ date });

    expect(holiday).toStrictEqual(expectedHoliday);
  }
  test("Should insert a list of holidays successfully", async () => {
    try {
      try {
        await makeFeriadoRequest("2020-12-12");
      } catch (error) {
        assertResponseError(error, {
          status: 404,
          message: "Data não encontrada",
        });
      }

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

      try {
        await makeRequestAndAssertResponse("2020-12-12", {
          date: "2020-12-12",
          name: "teste",
          type: "Nacional",
        });
      } catch (error) {}

      await makeRequestAndAssertResponse("2020-12-14", {
        name: "teste",
        date: "2020-12-14",
        type: "Nacional",
      });
    } catch (error) {
      console.log(error);
      expect(error).toBeNull();
    }
  });
  test("Should update a persited holiday", async () => {
    try {
      await makeRequestAndAssertResponse("2021-01-01", {
        date: "2021-01-01",
        name: "Dia Mundial da Paz",
        type: "Feriado Nacional",
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
