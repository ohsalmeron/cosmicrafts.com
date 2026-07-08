export const JsonRpcProvider = function() { return { getBalance: () => Promise.resolve(BigInt(0)), getTransactionCount: () => Promise.resolve(0) } }
export const Wallet = function() { return { getAddress: () => '', signMessage: () => Promise.resolve(''), connect: () => null } }
export function formatEther(_) { return '0.0' }
export function parseEther(_) { return BigInt(0) }
