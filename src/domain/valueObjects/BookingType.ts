class BookingType {
  private constructor(private readonly value: string) {}

  static FLIGHT = new BookingType("FLIGHT");
  static HOTEL = new BookingType("HOTEL");
  static CAR = new BookingType("CAR");
  static EVENT = new BookingType("EVENT");

  getValue(): string {
    return this.value;
  }
}
