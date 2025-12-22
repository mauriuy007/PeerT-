class Longitude {
  constructor(private readonly value: number) {
    if (value < -180 || value > 180) {
      throw new Error("Longitude must be between -180 and 180");
    }
  }

  getValue(): number {
    return this.value;
  }
}
