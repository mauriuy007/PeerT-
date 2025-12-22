class CountryCode {
  constructor(private readonly value: string) {
    if (!/^[A-Z]{2}$/.test(value)) {
      throw new Error("CountryCode must be ISO-2 format");
    }
  }

  getValue(): string {
    return this.value;
  }
}
