class Timezone {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Timezone cannot be empty");
    }
  }

  getValue(): string {
    return this.value;
  }
}
