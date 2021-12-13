import type { NextApiRequest, NextApiResponse } from "next";
import { GetHolidayUseCase } from "./GetHolidayUseCase";

export class GetHolidayController {
  constructor(private getHolidayUseCase: GetHolidayUseCase) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const { data } = request.query;

    try {
      const holiday = await this.getHolidayUseCase.execute({
        date: String(data),
      });

      if (holiday) {
        return response.status(200).json(holiday);
      }

      return response.status(404).json({ message: "Data não encontrada" });
    } catch (err) {
      const error = err as any;
      return response.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
