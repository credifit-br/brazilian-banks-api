import { app } from "../../src/app";
import request from "supertest";

export async function makeFeriadoRequest(date: string) {
  return request(app).get(`/feriado/${date}`);
}
