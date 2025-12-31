import {CreateUserDto} from "../dtos/user/CreateUserDto"
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
}
