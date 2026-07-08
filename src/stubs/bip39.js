export function mnemonicToSeedSync(_) { return new Uint8Array(64) }
export function generateMnemonic() { return 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' }
export function validateMnemonic(_) { return true }
export function entropyToMnemonic(_) { return generateMnemonic() }
export const wordlists = { english: ['abandon', 'about', 'above', 'abuse'] }
export default { mnemonicToSeedSync, generateMnemonic, validateMnemonic, entropyToMnemonic, wordlists }
