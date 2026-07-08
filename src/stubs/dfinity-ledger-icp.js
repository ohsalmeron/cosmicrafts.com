export class AccountIdentifier {
  static fromHex(_) { return new AccountIdentifier() }
  static fromPrincipal({ principal, subAccount }) { return new AccountIdentifier() }
  toHex() { return '0000000000000000000000000000000000000000000000000000000000000000' }
  toUint8Array() { return new Uint8Array(32) }
}
export const LedgerCanister = {
  create: () => ({
    accountBalance: () => Promise.resolve(BigInt(0)),
    transfer: () => Promise.resolve(BigInt(0)),
    transactionFee: () => Promise.resolve(BigInt(10000)),
  })
}
