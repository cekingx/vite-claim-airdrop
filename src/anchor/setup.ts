import { Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { OtterAirdrop as OtterAirdropType } from "./otter_airdrop";
import OtterAirdrop from "./otter_airdrop.json"

export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// export const program = new Program(OtterAirdrop as unknown as OtterAirdropType, {connection});
export const program = new Program<OtterAirdropType>(OtterAirdrop as OtterAirdropType, {connection})