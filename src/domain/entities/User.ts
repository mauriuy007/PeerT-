import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";
import { Name } from "../valueObjects/Name";
import { LastName } from "../valueObjects/LastName";  

export class User {
  constructor(
    public readonly id: number,
    public readonly email: Email,
    public readonly password: Password,
    public readonly name: Name,
    public readonly lastName: LastName
  ) {}
}
