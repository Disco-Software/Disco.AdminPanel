export interface CreateUserResponseModel {
  user: User
  accessToken: string
  refreshToken: string
  accessTokenExpire: number
}

export interface User {
  roleName: string
  refreshToken: string
  refreshTokenExpiress: string
  created: string
  accountId: number
  account: Account
  id: number
  userName: string
  normalizedUserName: string
  email: string
  normalizedEmail: string
  emailConfirmed: boolean
  passwordHash: any
  securityStamp: string
  concurrencyStamp: string
  phoneNumber: any
  phoneNumberConfirmed: boolean
  twoFactorEnabled: boolean
  lockoutEnd: any
  lockoutEnabled: boolean
  accessFailedCount: number
}

export interface Account {
  accountStatus: AccountStatus
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
  id: number
}

export interface AccountStatus {
  lastStatus: string
  followersCount: number
  nextStatusId: number
  userTarget: number
  accountId: number
  id: number
}
