import axios from "axios";

export async function makeFeriadoRequest(date: string) {
  const requestUrl = `${global.SERVER_URL}/api/feriados/${date}`;
  return axios.get(requestUrl);
}
