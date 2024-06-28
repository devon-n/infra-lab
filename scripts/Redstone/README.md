# Redstone Scripts

The script `consumeData.ts` tests the Redstone price oracles on etherlink and etherlink testnet
## Test the oracles

```bash
npx hardhat run scripts/Redstone/consumeData.ts --network etherlinkTestnet
```
OR
```bash
npx hardhat run scripts/Redstone/consumeData.ts --network etherlink
```

Example output
```bash
ETH Price: 3388.63 USD
BTC Price: 60721.62 USD
XTZ Price: 0.77 USD
```