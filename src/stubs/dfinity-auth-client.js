export class AuthClient {
  isAuthenticated() { return Promise.resolve(false) }
  getIdentity() { return { getPrincipal: () => ({ toText: () => 'aaaaa-aa', isAnonymous: () => true }) } }
  login() { return Promise.resolve() }
  logout() { return Promise.resolve() }
  static create() { return Promise.resolve(new AuthClient()) }
}
