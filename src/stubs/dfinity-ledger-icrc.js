export const IcrcLedgerCanister = {
  create: () => ({
    balance: () => Promise.resolve(BigInt(0)),
    transfer: () => Promise.resolve(BigInt(0)),
    metadata: () => Promise.resolve([]),
    transactionFee: () => Promise.resolve(BigInt(0)),
  })
}
export function mapTokenMetadata(_) { return { name: '', symbol: '', decimals: 8, fee: BigInt(0) } }
