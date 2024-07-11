export interface User {
    userId: number,
    username: string,
    password: string,
    roleId: number,
    role: {
        roleId: number,
        type: string
    }
}
