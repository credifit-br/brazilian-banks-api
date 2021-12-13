import { Request, Response } from "express";
import { GetHolidayUseCase } from "./GetHolidayUseCase";

export class GetHolidayController {
  constructor(private getHolidayUseCase: GetHolidayUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.params;

    try {
      const holiday = await this.getHolidayUseCase.execute({
        date: data,
      });

      if (holiday) {
        return response.status(200).json(holiday);
      }

      return response.status(404).json({ message: "Data não encontrada" });
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
