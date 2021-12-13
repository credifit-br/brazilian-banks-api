import UpdateHolidays from "./UpdateHolidays/UpdateHolidays";

interface Job {
  start: () => Promise<void>;
}

class CronManeger {
  private jobs: Job[];

  constructor() {
    this.jobs = [UpdateHolidays];
  }

  run() {
    this.jobs.forEach((job) => job.start());
  }
}

export const cronManager = new CronManeger();
