
export interface UserOnline {
    uid     : string | undefined,
    username: string,
    name    : string,
    sex     : string,
    email   : string,
    role : {
      uid : string,
      name: string
    }
  }