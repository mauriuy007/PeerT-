class User {
  private readonly id: number;
  private email: Email;
  private password: Password; 
  constructor(id: number, email: Email, password: Password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}