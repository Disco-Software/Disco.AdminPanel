export interface Account {
  photo: string
  postsCount: number
  storiesCount: number
  followersCount: number
  followingsCount: number
  user: User
}

export interface User {
  id: string
  roleName : string
  userName: string
  password: string
  email: string
}
