import { calculateERC721MechAddress } from "mech-sdk"
import { useEffect, useState } from "react"
import { useProvider } from "wagmi"

import { nxyzNFT, nxyzSupportedChains } from "../types/nxyzApiTypes"
import { MechNFT } from "./useNFTsByOwner"

interface NFTProps {
  contractAddress: string
  blockchain: nxyzSupportedChains
  tokenId: string
}

interface NFTResult {
  data: MechNFT
  isLoading: boolean
  error: any
}

type useNFTType = (props: NFTProps) => NFTResult

const useNFT: useNFTType = ({ contractAddress, blockchain, tokenId }) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const provider = useProvider()

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = `https://nxyz-api-wrapper.vercel.app/api/v1/nfts/${contractAddress}/${tokenId}?chainID=gor&limit=20&filterSpam=false`
      try {
        setIsLoading(true)
        const res = await fetch(apiUrl)
        const data: nxyzNFT[] = await res.json()
        const mechData = data[0] as MechNFT

        try {
          if (!mechData) throw new Error("No metadata")

          const hasMech =
            (await provider.getCode(
              calculateERC721MechAddress(
                mechData.contractAddress,
                mechData.nft.tokenID
              )
            )) !== "0x"
          mechData.hasMech = hasMech
        } catch (error) {
          console.log(error)
          mechData.hasMech = false
        }
        setData(mechData)
        setIsLoading(false)
      } catch (e) {
        setError(e)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [contractAddress, blockchain, tokenId, provider])

  return { data, isLoading, error }
}

export default useNFT
