
export interface UserOnline {
    uid     : string,
    username: string,
    name    : string,
    sex     : string,
    email   : string,
    role : {
      uid : string,
      name: string
    }
  }