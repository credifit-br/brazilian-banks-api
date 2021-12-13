export class Holiday {
  public date: string;
  public name: string;
  public type: string;

  constructor(props: Omit<Holiday, "id">, id?: string) {
    Object.assign(this, props);
  }
}
