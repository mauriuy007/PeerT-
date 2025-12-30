import { ICuAdd } from "../../../domain/applicationInterfaces/ICuAdd";
import { IUserRepo } from "../../../domain/repoInterfaces/IUserRepo";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";

export class CreateUser implements ICuAdd<CreateUserDto> {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: CreateUserDto): Promise<number> {
    return this.userRepo.add(input);
  }
}
