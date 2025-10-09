export class UserDTO {
    constructor(
        public id: string,
        public email: string,
        public username: string,
        public createdAt: Date
    ) {
    }


    public toString(): string {
        return `${this.id},${this.email},${this.username},${this.createdAt}`
    }

    static fromPrisma(data: any): UserDTO {
        return new UserDTO(data.id, data.email, data.username, data.createdAt);
    }
}
