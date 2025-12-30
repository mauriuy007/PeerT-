import {CreateUserDto} from "./"

export class UserMapper {
  static mapDtoToEntity(dto: CreateUserDto): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
    };
  }
}
