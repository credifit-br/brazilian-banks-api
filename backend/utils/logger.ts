import { getCurrentTimeFormated } from "./date";

export function logger(message: string) {
  console.log(`> ${getCurrentTimeFormated()}: ${message}`);
}
