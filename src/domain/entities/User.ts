export class User {
  constructor(
    public readonly id: number,
    public readonly email: Email,
    public readonly password: Password,
    public readonly name: Name,
    public readonly lastName: Name
  ) {}
}
