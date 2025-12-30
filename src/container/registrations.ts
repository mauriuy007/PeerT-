// src/container/registrations.ts
import { TOKENS } from "./tokens";
import { UserRepo } from "../dataAccess/prisma/UserRepo";
import { CreateUser } from "../application/useCases/users/CreateUser";
import { Scope } from "./requestContainer";

export function registerScoped() {
  return {
    [TOKENS.UserRepo]: () => new UserRepo(),

    [TOKENS.CreateUser]: (scope: Scope) =>
      new CreateUser(
        scope.resolve(TOKENS.UserRepo)
      ),
  };
}
