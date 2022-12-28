export class Status {
  lastStatus: string;
  followersCount: number;
  nextStatusId: number;
  userTarget: number;
  id: number;

  constructor(lastStatus: string,
    followersCount: number,
    nextStatusId: number,
    userTarget: number,
    id: number){
      this.followersCount = followersCount;
      this.id = id;
      this.lastStatus = lastStatus;
      this.nextStatusId = nextStatusId;
      this.userTarget = userTarget;
    }
}

export class Post {
  description: string;
  postImages: any[];
  postSongs: any[];
  postVideos: any[];
  likes: any[];
  comments: any[];
  dateOfCreation: Date;
  accountId: number;
  id: number;

  constructor(description: string,
    postImages: any[],
    postSongs: any[],
    postVideos: any[],
    likes: any[],
    comments: any[],
    dateOfCreation: Date,
    accountId: number,
    id: number){
      this.postImages = postImages;
      this.postSongs = postSongs;
      this.postVideos = postVideos;
      this.likes = likes;
      this.accountId = accountId;
      this.comments = comments;
      this.description = description;
      this.dateOfCreation = dateOfCreation;
      this.id = id;
  }
}

export class Account {
  status?: Status;
  cread?: string;
  photo?: any;
  posts?: Post[];
  comments?: any;
  likes?: any[];
  followers?: any[];
  following?: any[];
  stories?: any[];
  userId?: number;
  id?: number;

  constructor(status?: Status,
    cread?: string,
    photo?: any,
    posts?: Post[],
    comments?: any,
    likes?: any[],
    followers?: any[],
    following?: any[],
    stories?: any[],
    userId?: number,
    id?: number,){
      this.status = status;
      this.cread = cread;
      this.comments = comments;
      this.followers = followers;
      this.following = following;
      this.id = id;
      this.likes = likes;
      this.photo = photo;
      this.posts = posts;
      this.stories = stories;
      this.userId = userId;
  }
}

export class User {
  roleName?: string;
  refreshToken?: string;
  refreshTokenExpiress?: Date;
  dateOfRegister?: Date;
  accountId?: number;
  account?: Account;
  id?: number;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: any;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: any;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;

  constructor(roleName?: string,
    refreshToken?: string,
    refreshTokenExpiress?: Date,
    dateOfRegister?: Date,
    accountId?: number,
    account?: Account,
    id?: number,
    userName?: string,
    normalizedUserName?: string,
    email?: string,
    normalizedEmail?: string,
    emailConfirmed?: boolean,
    passwordHash?: string,
    securityStamp?: string,
    concurrencyStamp?: string,
    phoneNumber?: any,
    phoneNumberConfirmed?: boolean,
    twoFactorEnabled?: boolean,
    lockoutEnd?: any,
    lockoutEnabled?: boolean,
    accessFailedCount?: number){
      this.accessFailedCount = accessFailedCount;
      this.account = account;
      this.accountId = accountId;
      this.concurrencyStamp = concurrencyStamp;
      this.dateOfRegister = dateOfRegister;
      this.email = email;
      this.emailConfirmed = emailConfirmed;
      this.id = id;
      this.lockoutEnabled = lockoutEnabled;
      this.lockoutEnd = lockoutEnd;
      this.normalizedEmail = normalizedEmail;
      this.normalizedUserName = normalizedUserName;
      this.passwordHash = passwordHash;
      this.phoneNumber = phoneNumber;
      this.phoneNumberConfirmed = phoneNumberConfirmed;
      this.refreshToken = refreshToken;
      this.refreshTokenExpiress = refreshTokenExpiress;
      this.roleName = roleName;
      this.securityStamp = securityStamp;
      this.twoFactorEnabled = twoFactorEnabled;
      this.userName = userName;
  }
}

export class UserResponseModel {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessTokenExpirce: number;

  constructor(user: User,
    accessToken: string,
    refreshToken: string,
    accessTokenExpirce: number,){
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.accessTokenExpirce = accessTokenExpirce;
      this.user = user;
  }
}
