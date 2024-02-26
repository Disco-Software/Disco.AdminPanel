export interface FeedbackInterface {
  id: number,
  owner: FeedbackOwnerInterface,
  createdDate: string,
  priority: string,
  status: string,
  name: string,
  title: string,
  description: string,
}

export interface FeedbackOwnerInterface {
  photo: string,
  userName: string,
}
