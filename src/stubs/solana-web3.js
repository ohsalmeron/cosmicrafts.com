export class Connection {
  constructor() {}
  getBalance() { return Promise.resolve(0) }
}
export function clusterApiUrl(_) { return 'https://api.mainnet-beta.solana.com' }
