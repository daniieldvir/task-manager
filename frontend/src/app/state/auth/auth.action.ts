export namespace AuthActions {
  export class BootstrapAuth {
    static readonly type = '[Auth] Bootstrap Auth';
  }


  export class LoginUser {
    static readonly type = '[Auth] Login User';
    constructor(public readonly loginData: { email: string; password: string }) { }
  }
}
