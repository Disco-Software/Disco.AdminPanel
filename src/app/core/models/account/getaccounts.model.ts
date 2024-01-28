export interface AccountModel {
  accountStatus: any
  cread: string
  photo: string
  accountGroups: any
  connections: any[]
  messages: any
  posts: any[]
  comments: any[]
  likes: any[]
  followers: any[]
  following: any[]
  stories: any[]
  userId: number
  user: User
  id: number
}

export interface User {
  roleName: string
  refreshToken: string
  refreshTokenExpiress: string
  created: string
  accountId: number
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
