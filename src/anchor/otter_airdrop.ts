/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/otter_airdrop.json`.
 */
export type OtterAirdrop = {
  "address": "8kng46KuDhHgt7X1YLmkdz5yFCX7zfYDPbB4WXKSNXQ6",
  "metadata": {
    "name": "otterAirdrop",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claim",
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "airdropAccount"
        },
        {
          "name": "airdropTokenAccount",
          "writable": true
        },
        {
          "name": "claimerTokenAccount",
          "writable": true
        },
        {
          "name": "pdaSigner"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "proof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdropAccount"
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "airdropTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "airdropAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "pdaSigner"
        },
        {
          "name": "airdropTokenAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setAirdropState",
      "discriminator": [
        151,
        120,
        23,
        82,
        211,
        15,
        15,
        59
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdropAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "isClaimEnabled",
          "type": "bool"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setMerkleRoot",
      "discriminator": [
        43,
        24,
        91,
        60,
        240,
        137,
        28,
        102
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdropAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "merkleRoot",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "airdropAccount"
        },
        {
          "name": "pdaSigner"
        },
        {
          "name": "signerTokenAccount",
          "writable": true
        },
        {
          "name": "airdropTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "airdrop",
      "discriminator": [
        31,
        112,
        159,
        158,
        124,
        237,
        9,
        241
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "notAuthorized",
      "msg": "Not Authorized"
    },
    {
      "code": 6001,
      "name": "exceedMaxLimit",
      "msg": "Length exceeds max limit"
    },
    {
      "code": 6002,
      "name": "lengthNotMatch",
      "msg": "Length not match"
    },
    {
      "code": 6003,
      "name": "invalidMerkleProof",
      "msg": "Invalid Merkle Proof"
    }
  ],
  "types": [
    {
      "name": "airdrop",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "airdropTokenAccount",
            "type": "pubkey"
          },
          {
            "name": "isClaimEnabled",
            "type": "bool"
          },
          {
            "name": "claimAmount",
            "type": "u64"
          },
          {
            "name": "merkleRoot",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    }
  ]
};
