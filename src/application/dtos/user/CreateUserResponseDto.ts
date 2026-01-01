export class CreateUserResponseDto {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public email: string,
  ) {}
}
