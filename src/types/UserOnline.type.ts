
export default interface UserOnline {
    uid       : string,
    username  : string,
    name      : string,
    sex       : string,
    email     : string,
    created_at: string,
    role      : {
      uid            : string,
      name           : string,
      display_name   : string,
      permission_role: {
        permissions: {
          name        : string;
          uid         : string;
          display_name: string;
        };
      }[]
    }
  }