class Currency {
  constructor(private readonly code: string) {
    if (!/^[A-Z]{3}$/.test(code)) {
      throw new Error("Currency code must follow ISO-4217 format");
    }
  }

  getCode(): string {
    return this.code;
  }

  equals(other: Currency): boolean {
    return this.code === other.code;
  }
}
