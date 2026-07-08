export class Ed25519KeyIdentity {
  getPrincipal() { return { toText: () => 'aaaaa-aa', isAnonymous: () => true } }
  toJSON() { return [] }
  static fromParsedJson(_) { return new Ed25519KeyIdentity() }
  static fromKeyPair(_) { return new Ed25519KeyIdentity() }
}
