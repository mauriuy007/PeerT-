import { Request, Response } from "express";
import { CreateUser } from "../../../../application/useCases/users/CreateUser";
import { NullEmailException } from "../../../../domain/exceptions/NullEmailException";
import { NullNameException } from "../../../../domain/exceptions/NullNameException";
import { InvalidPasswordException } from "../../../../domain/exceptions/InvalidPasswordException";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUser) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userId = await this.createUserUseCase.execute(req.body);
      return res.status(201).json({ userId });
    } catch (error) {
      if (error instanceof NullNameException || error instanceof NullEmailException) {
        return res.status(400).json({ message: "Email cannot be null" });
      } else if (error instanceof InvalidPasswordException) {
        return res.status(422).json({ message: "Password does not meet complexity requirements" });
      } else {
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}