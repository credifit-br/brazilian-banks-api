import cron from "node-cron";
import { getCurrentYear, getCurrentTimeFormated } from "../../utils/date";
import { getBankHolidaysController } from "../../useCases/GetBankHolidays";
import { saveHolidaysController } from "../../useCases/SaveHolidays";

const getCurrentAndNextYearHolidays = async () => {
  const currentYear = getCurrentYear();

  const currentAndNextYearHolidays = await Promise.all([
    getBankHolidaysController.handle(currentYear.toString()),
    getBankHolidaysController.handle((currentYear + 1).toString()),
  ]);

  return currentAndNextYearHolidays;
};

const updateHolidays = async () => {
  console.log(
    `${getCurrentTimeFormated()}: Atualizando a lista de emails utilizando os dados da febraban`
  );

  const [holidaysCurrentYear, holidaysNextYear] =
    await getCurrentAndNextYearHolidays();

  await saveHolidaysController.handle(
    holidaysCurrentYear.concat(holidaysNextYear)
  );

  console.log(`${getCurrentTimeFormated()}: Feriados atualizados com sucesso`);
};

export default cron.schedule("0 2 * * *", updateHolidays, {
  scheduled: false,
});
