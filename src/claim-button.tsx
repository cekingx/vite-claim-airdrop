import { useConnection, useWallet, Wallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor"
import { OtterAirdrop as OtterAirdropType } from "./anchor/otter_airdrop";
import OtterAirdrop from "./anchor/otter_airdrop.json"
import { Connection, PublicKey } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { envVar } from "./shared";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";

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
  const program = new Program(OtterAirdrop as unknown as OtterAirdropType, {connection});
  const [pdaSigner, pdaSignerBump] = web3.PublicKey.findProgramAddressSync(
    [(new PublicKey(envVar.airdropAccount)).toBuffer()], program.programId
  )

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      const claimerTokenAccount = await createATA(connection, publicKey, sendTransaction);
      const account = {
        signer: publicKey.toBase58(),
        airdropAccount: envVar.airdropAccount,
        airdropTokenAccount: envVar.airdropTokenAccount,
        claimerTokenAccount: claimerTokenAccount.toBase58(),
        pdaSigner: pdaSigner.toBase58()
      }
      console.log('account', account)
    } catch (error) {
      console.log(error);
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