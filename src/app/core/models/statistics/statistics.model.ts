export interface StatisticsResponseModel {
  usersCount: number
  newUsersCount: number
  postsCount: number
  users: User[]
  registeredUsers: User[]
  posts: any[]
}

export interface User {
  roleName: string
  refreshToken: string
  refreshTokenExpiress: string
  dateOfRegister: string
  accountId: number
  account: any
  id: number
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: string
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: any
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: any
  lockoutEnabled: boolean
  accessFailedCount: number
}
