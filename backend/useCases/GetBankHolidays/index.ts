import { GetBankHolidaysController } from "./GetBankHolidaysController";
import { GetBankHolidaysUseCase } from "./GetBankHolidaysUseCase";
import { WebserviceFebrabanHolidaysProvider } from "../../providers/implementations/webservice/WebserviceFebrabanHolidaysProvider";

const webserviceFebrabanHolidaysProvider =
  new WebserviceFebrabanHolidaysProvider();

const getBankHolidaysUseCase = new GetBankHolidaysUseCase(
  webserviceFebrabanHolidaysProvider
);

const getBankHolidaysController = new GetBankHolidaysController(
  getBankHolidaysUseCase
);

export { getBankHolidaysUseCase, getBankHolidaysController };
