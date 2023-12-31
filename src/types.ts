export interface IUser {
  googleId?: string;
  twitterId?: string;
  githubId?: string;
  username: string;
}

export interface IMongoDBUser {
  googleId?: string;
  twitterId?: string;
  githubId?: string;
  username: string;
  __v: number;
  _id: string;
}
