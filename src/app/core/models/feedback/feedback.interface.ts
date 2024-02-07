export interface FeedbackInterface {
  id: number,
  owner: FeedbackOwnerInterface,
  createdDate: string,
  priority: string,
  status: string,
  name: string
}

export interface FeedbackOwnerInterface {
  photo: string,
  username: string,
}
