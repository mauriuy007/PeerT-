class Status {
  private constructor(private readonly value: string) {}

  static CONFIRMED = new Status("CONFIRMED");
  static PENDING = new Status("PENDING");
  static CANCELLED = new Status("CANCELLED");

  getValue(): string {
    return this.value;
  }
}
