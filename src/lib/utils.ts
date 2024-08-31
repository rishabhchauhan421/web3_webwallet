import web3, { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';

export function generateMnemonic(): string {
  return bip39.generateMnemonic();
}

export function generateSolanaKeys(
  mnemonic: string,
  addressCount: number = 1
): { publicKey: string; secretKey: string } {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  //converted seed to hex from UInt8Array
  const seedBuffer = Buffer.from(seed).toString('hex');

  //defines a derivation path using the BIP44 standard. The path m/44'/501'/0'/0'` is specific to the Solana cryptocurrency
  const path44Change = `m/44'/501'/0'/${addressCount}'`;

  //uses an unspecified derivePath function to derive a new seed from the provided derivation path and the seed buffer. The key property of the returned object is assigned to derivedSeed
  const derivedSeed = derivePath(path44Change, seedBuffer).key;

  //KeyPair is generated from derived seed
  const kp = Keypair.fromSeed(derivedSeed);

  const publicKeyHex = kp.publicKey.toString();
  const privateKeyHex = Buffer.from(kp.secretKey).toString('hex');
  return {
    publicKey: publicKeyHex,
    secretKey: privateKeyHex,
  };
}
