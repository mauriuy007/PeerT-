export class CreateUserDto {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
  ) {}
}
