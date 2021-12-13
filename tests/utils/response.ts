import { AxiosError } from "axios";

export function assertResponseError(
  error: unknown,
  expectedResponse: { status: number; message: string }
) {
  const axiosError = error as AxiosError;

  const response = axiosError.response;

  expect(response.status).toBe(expectedResponse.status);
  expect(response.data.message).toBe(expectedResponse.message);
}
