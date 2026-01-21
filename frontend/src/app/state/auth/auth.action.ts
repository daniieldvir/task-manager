export namespace AuthActions {
  export class BootstrapAuth {
    static readonly type = '[Auth] Bootstrap Auth';
  }

  export class LoginUser {
    static readonly type = '[Auth] Login User';
    constructor(public readonly loginData: { email: string; password: string }) {}
  }

  export class OAuthLoginSuccess {
    static readonly type = '[Auth] OAuth Login Success';
    constructor(public readonly data: { user: { id: string; email: string }; token: string }) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }
}
