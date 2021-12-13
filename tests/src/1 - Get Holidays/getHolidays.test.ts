import { Holiday } from "../../../backend/entities/Holiday";
import { makeFeriadoRequest } from "../../utils/requests";
import { assertResponseError } from "../../utils/response";

describe("Get Holiday", () => {
  test("Should return peace day holiday", async () => {
    const response = await makeFeriadoRequest("2021-01-01");
    const holiday: Holiday = response.data;

    expect(response.status).toBe(200);
    expect(holiday).toStrictEqual({
      date: "2021-01-01",
      name: "Dia Mundial da Paz",
      type: "Feriado Nacional",
    });
  });

  test("Should return 404 when data is not a holiday", async () => {
    try {
      const response = await makeFeriadoRequest("2021-01-15");
      const errorMessage: { message: string } = response.data;

      expect(response.status).toBe(404);
      expect(errorMessage.message).toBe("Data não encontrada");

      throw Error();
    } catch (error) {
      assertResponseError(error, {
        status: 404,
        message: "Data não encontrada",
      });
    }
  });
});
