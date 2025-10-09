export declare class UserDTO {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    constructor(id: string, email: string, username: string, createdAt: Date);
    toString(): string;
    static fromPrisma(data: any): UserDTO;
}
//# sourceMappingURL=userDTO.d.ts.map