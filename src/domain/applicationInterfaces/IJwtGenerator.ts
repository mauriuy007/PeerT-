export interface IJwtGenerator<T> {
    generateToken(user: T): string
}