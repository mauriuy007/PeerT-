// src/application/useCases/users/CreateUser.ts
import { ICuAdd } from "../../../domain/applicationInterfaces/ICuAdd";
import { IUserRepo } from "../../../domain/repoInterfaces/IUserRepo";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { UserMapper } from "../../mappers/UserMapper";

export class CreateUser implements ICuAdd<CreateUserDto> {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: CreateUserDto): Promise<number> {
    const user = UserMapper.mapDtoToEntity(input);
    return this.userRepo.add(user);
  }
}
