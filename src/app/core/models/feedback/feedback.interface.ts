export interface FeedbackInterface {
  id: number,
  owner: FeedbackOwnerInterface,
  createdDate: string,
  priority: string,
  status: string
}

export interface FeedbackOwnerInterface {
  photo: string,
  username: string,
}
