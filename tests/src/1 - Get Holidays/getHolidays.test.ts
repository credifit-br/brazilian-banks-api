import { Holiday } from "../../../src/entities/Holiday";
import { makeFeriadoRequest } from "../../utils/requests";

describe("Get Holiday", () => {
  test("Should return peace day holiday", async () => {
    const response = await makeFeriadoRequest("2021-01-01");
    const holiday: Holiday = response.body;

    expect(response.statusCode).toBe(200);
    expect(holiday).toStrictEqual({
      date: "2021-01-01",
      name: "Dia Mundial da Paz",
      type: "Nacional",
    });
  });

  test("Should return null when data is not a holiday", async () => {
    const response = await makeFeriadoRequest("2021-01-15");
    const errorMessage: { message: string } = response.body;

    expect(response.statusCode).toBe(404);
    expect(errorMessage.message).toBe("Data não encontrada");
  });
});
