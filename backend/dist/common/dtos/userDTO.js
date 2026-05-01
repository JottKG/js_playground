export class UserDTO {
    id;
    email;
    username;
    createdAt;
    constructor(id, email, username, createdAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.createdAt = createdAt;
    }
    toString() {
        return `${this.id},${this.email},${this.username},${this.createdAt}`;
    }
    static fromPrisma(data) {
        return new UserDTO(data.id, data.email, data.username, data.createdAt);
    }
}
//# sourceMappingURL=userDTO.js.map