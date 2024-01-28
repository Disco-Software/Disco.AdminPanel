export interface Status {
  lastStatus?: string | undefined;
  followersCount?: number | undefined;
  nextStatusId?: number | undefined;
  userTarget?: number | undefined;
  id?: number | undefined;
}

export interface Post {
  description?: string | undefined;
  postImages?: any[] | undefined;
  postSongs?: any[] | undefined;
  postVideos?: any[] | undefined;
  likes?: any[] | undefined;
  comments?: any[] | undefined;
  dateOfCreation?: Date | undefined;
  accountId?: number | undefined;
  id?: number | undefined;
}

export interface Account {
  status?: Status | undefined;
  cread?: string | undefined;
  photo?: any | undefined;
  posts?: Post[] | undefined;
  comments?: any | undefined;
  likes?: any[] | undefined;
  followers?: any[] | undefined;
  following?: any[] | undefined;
  stories?: any[] | undefined;
  userId?: number | undefined;
  id?: number | undefined;
}

export interface User {
  roleName?: string | undefined;
  refreshToken?: string | undefined;
  refreshTokenExpiress?: Date | undefined;
  created?: Date | undefined;
  accountId?: number | undefined;
  account?: Account | undefined;
  id?: number | undefined;
  userName?: string | undefined;
  normalizedUserName?: string | undefined;
  email?: string | undefined;
  normalizedEmail?: string | undefined;
  emailConfirmed?: boolean | undefined;
  passwordHash?: string | undefined;
  securityStamp?: string | undefined;
  concurrencyStamp?: string | undefined;
  phoneNumber?: any | undefined;
  phoneNumberConfirmed?: boolean | undefined;
  twoFactorEnabled?: boolean | undefined;
  lockoutEnd?: any | undefined;
  lockoutEnabled?: boolean | undefined;
  accessFailedCount?: number | undefined;
}

export interface UserResponseModel {
  user?: User | undefined;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  accessTokenExpirce?: number | undefined;
}
