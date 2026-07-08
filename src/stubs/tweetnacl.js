export default {
  sign: {
    keyPair: () => ({ secretKey: new Uint8Array(64), publicKey: new Uint8Array(32) }),
    sign: () => new Uint8Array(64),
    open: () => new Uint8Array(32),
    detach: () => new Uint8Array(64),
  },
  box: {
    keyPair: () => ({ secretKey: new Uint8Array(32), publicKey: new Uint8Array(32) }),
    before: () => new Uint8Array(32),
    open: () => new Uint8Array(32),
  },
  randomBytes: (n) => new Uint8Array(n),
}
