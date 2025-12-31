export class CreateUserResponseDto {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
  ) {}
}
