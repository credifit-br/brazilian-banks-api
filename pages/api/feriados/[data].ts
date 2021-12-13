import type { NextApiRequest, NextApiResponse } from "next";
import { getHolidayController } from "../../../backend/useCases/GetHoliday";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<{ data: string }>
) {
  return getHolidayController.handle(request, response);
}
