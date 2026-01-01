import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { CreateUserResponseDto } from "../dtos/user/CreateUserResponseDto";
import { User } from "../../domain/entities/User";

import { Email } from "../../domain/valueObjects/Email";
import { Name } from "../../domain/valueObjects/Name";
import { Password } from "../../domain/valueObjects/Password";

export class UserMapper {

  /**
   * DTO (API) -> Entity (Domain)
   */
  static mapDtoToEntity(dto: CreateUserDto): User {
    return new User(
      1, // temporary id, will be replaced by the database
      new Email(dto.email),
      new Password(dto.password),
      new Name(dto.name),
      new LastName(dto.lastName)
    );
  }

  /**
   * Entity (Domain) -> Response DTO (API)
   */
  static mapEntityToCreateResponse(
    user: User
  ): CreateUserResponseDto {
    return new CreateUserResponseDto(
      user.id!,
      user.name.value,
      user.lastName.value,
      user.email.value
    );
  }

}
