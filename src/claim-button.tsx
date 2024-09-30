import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { web3 } from "@coral-xyz/anchor"
import { Connection, PublicKey } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { envVar } from "./shared";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { connection as devnetConnection, program } from "./anchor/setup";

const createATA = async (
  connection: Connection,
  publicKey: web3.PublicKey,
  sendTransaction: WalletAdapterProps['sendTransaction'],
): Promise<web3.PublicKey> => {
  const mint = new PublicKey(envVar.mint);
  console.log('mint', mint.toBase58())
  console.log('publicKey', publicKey.toBase58())
  const ata = await splToken.getAssociatedTokenAddress(mint, publicKey);
  const accountInfo = await connection.getAccountInfo(ata);
  console.log('accountInfo', accountInfo)
  if (accountInfo && accountInfo.owner.equals(splToken.TOKEN_PROGRAM_ID)) {
    return ata;
  }

  const tx = new web3.Transaction();
  tx.add(
    splToken.createAssociatedTokenAccountInstruction(
      publicKey,
      ata,
      publicKey,
      mint
    )
  )

  const txSignature = await sendTransaction(tx, connection);
  console.log('txSignature', txSignature);

  return ata;
}

export default function ClaimButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [pdaSigner, pdaSignerBump] = web3.PublicKey.findProgramAddressSync(
    [(new PublicKey(envVar.airdropAccount)).toBuffer()], program.programId
  )

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    console.log('connection', connection)
    const merkleReq = await fetch(`${envVar.api}/airdrop-user/merkle-proof?address=${publicKey.toBase58()}`);
    if (!merkleReq.ok) {
      setIsLoading(false);
      console.log('Failed to fetch merkle proof');
      setIsLoading(false);
      return;
    }
    const { data: proof } = await merkleReq.json();
    console.log('proof', proof);

    try {
      const claimerTokenAccount = await createATA(connection, publicKey, sendTransaction);
      console.log('claimerTokenAccount', claimerTokenAccount.toBase58())
      const account = {
        signer: publicKey,
        airdropAccount: new PublicKey(envVar.airdropAccount),
        airdropTokenAccount: new PublicKey(envVar.airdropTokenAccount),
        claimerTokenAccount: claimerTokenAccount,
        pdaSigner: pdaSigner
      }
      console.log('account', account)

      const tx = await program.methods
        .claim(proof)
        .accounts(account)
        .transaction();

      const transactionSignature = await sendTransaction(tx, connection);

      console.log(
        `View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`,
      );
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button className="w-24" onClick={onClick} disabled={!publicKey}>
      {isLoading ? "Loading" : "Claim"}
    </button>
  )
}