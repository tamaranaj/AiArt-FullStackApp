export interface RegisteredUser{

        id: string,
        email: string,
        password: string,
        role: string,
        refreshTokens: [
          string
        ],
        createdAt: string,
        createdBy: string,
        updatedAt: string,
        updatedBy: string
}
