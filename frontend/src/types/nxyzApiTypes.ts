export interface nxyzBlockchain {
  name: string
  shortName: string
  chainId: string
  shortChainId: string
}

export interface nxyzTokenSymbol {
  uri?: string
  duration?: string
  format?: string
  height?: number
  width?: number
  kind?: string
}

export interface nxyzFiat {
  decimals: number
  name?: string
  percentChange24hour?: number
  pretty: string
  symbol?: string
  symbolLogos?: nxyzTokenSymbol[]
  tokenValue: number
  updateTime?: string
  value: string
}

export interface nxyzFungibleBalance {
  value: string
  tokenValue: number
  pretty: string
  decimals: number
  symbol: string
  contractAddress: string
  name: string
  blockchain: nxyzBlockchain
  fiat?: nxyzFiat[]
  historicalFiat?: nxyzFiat[]
  symbolLogos?: nxyzTokenSymbol[]
}

export interface nxyzNFT {
  balance?: number
  blockchain: nxyzBlockchain
  contractAddress: string
  isSpam?: boolean
  nft: nxyzNFTDetail
  openSeaContract?: any
  symbol?: string
  tokenStandard?: string
}

export interface nxyzNFTDetail {
  attributes?: any[]
  collection?: any
  contractTitle?: string
  creatorAddress?: string
  description?: string
  durability?: "On-Chain" | "Decentralized" | "Web" | "Unknown"
  hidden?: boolean
  lastSoldPrice?: any
  lastSoldTime?: string
  media?: {
    key?: string
    URI?: string
    version: any[]
  }
  owner?: any
  previews?: {
    URI?: string
    duration?: string
    format?: string
    height?: number
    width?: number
    kind?: "video" | "image" | "raw" | "audio"
  }[]
  projectName?: string
  purchase?: any
  title?: string
  tokenID: string
}

export type nxyzSupportedChains =
  | "ethereum"
  | "polygon"
  | "bnb"
  | "arbitrumone"
  | "optimism"
  | "avalanche"
  | "gor"
  | "mubai"
