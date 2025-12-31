import {CreateUserDto} from "../dtos/user/CreateUserDto"
import {CreateUserResponseDto} from "../dtos/user/CreateUserResponseDto"
import { User } from "../../domain/entities/User";

export class UserMapper {
  static mapDtoToEntity(dto: CreateUserDto): User {
    return {
      id: 1, // Temporary ID, should be set by the database
      password: { value: dto.password },
      lastName: { value: dto.lastName },
      name: { value: dto.name },
      email: { value: dto.email },
    };
  }

   static mapEntityToCreateResponse(user: User): CreateUserResponseDto {
    return {
      id: user.id,
      name: user.name.value,
      lastName: user.lastName.value,
      email: user.email.value,
    }
     
  }

}
