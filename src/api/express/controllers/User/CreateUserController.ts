import { Request, Response } from "express";
import { CreateUser } from "../../application/useCases/users/CreateUser";
import {
  NullNameException,
  NullEmailException,
  InvalidPasswordException
} from "../../domain/exceptions";