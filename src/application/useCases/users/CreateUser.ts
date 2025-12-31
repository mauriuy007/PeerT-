// src/application/useCases/users/CreateUser.ts
import { ICuAdd } from "../../../domain/applicationInterfaces/ICuAdd";
import { NullEmailException } from "../../../domain/exceptions/NullEmailException";
import { NullNameException } from "../../../domain/exceptions/NullNameException";
import { InvalidPasswordException } from "../../../domain/exceptions/InvalidPasswordException";
import { IUserRepo } from "../../../domain/repoInterfaces/IUserRepo";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { CreateUserResponseDto } from "../../dtos/user/CreateUserResponseDto";
import { UserMapper } from "../../mappers/UserMapper";
import { User } from "../../../domain/entities/User";

export class CreateUser
  implements ICuAdd<CreateUserDto, CreateUserResponseDto> {

    constructor(
    private readonly userRepo: IUserRepo
  ) {}
  async execute(
    input: CreateUserDto
  ): Promise<CreateUserResponseDto> {

    const user = UserMapper.mapDtoToEntity(input);

    if (user.name.value === null) {
      throw new NullNameException("Name cannot be null");
    }

    if (user.email.value === null) {
      throw new NullEmailException("Email cannot be null");
    }

    if (!this.validPassword(user.password.value)) {
      throw new InvalidPasswordException(
        "Password does not meet complexity requirements"
      );
    }

    const createdUser = await this.userRepo.add(user);

    return UserMapper.mapEntityToCreateResponse(createdUser);
  }

  validPassword(password: string): boolean {
    const minLength = password.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[%\-_?$&*/]/.test(password);
    
    return minLength && hasLetters && hasNumbers && hasSpecialChar;
  }
}




