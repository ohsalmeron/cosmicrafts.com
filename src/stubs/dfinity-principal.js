export class Principal {
  static fromText(_) { return new Principal() }
  static fromUint8Array(_) { return new Principal() }
  static anonymous() { return new Principal() }
  toText() { return 'aaaaa-aa' }
  toUint8Array() { return new Uint8Array(29) }
  isAnonymous() { return true }
}
