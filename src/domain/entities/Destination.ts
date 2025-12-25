class Destination {
  constructor(
    public readonly id: number,
    public readonly city: City,
    public readonly country: Country,
    public readonly countryCode: CountryCode,
    public readonly latitude: Latitude,
    public readonly longitude: Longitude,
    public readonly timezone: Timezone
  ) {}
}
