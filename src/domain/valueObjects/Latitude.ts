class Latitude {
  constructor(private readonly value: number) {
    if (value < -90 || value > 90) {
      throw new Error("Latitude must be between -90 and 90");
    }
  }

  getValue(): number {
    return this.value;
  }
}
