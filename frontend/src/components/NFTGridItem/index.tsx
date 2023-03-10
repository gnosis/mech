import { calculateERC721MechAddress, deployERC721Mech } from "mech-sdk"
import { useState } from "react"
import { useSigner } from "wagmi"
import copy from "copy-to-clipboard"
import clsx from "clsx"
import { Link } from "react-router-dom"

import classes from "./NFTItem.module.css"
import Button from "../Button"
import { shortenAddress } from "../../utils/shortenAddress"
import { JsonRpcSigner } from "@ethersproject/providers"
import Spinner from "../Spinner"
import { MechNFT } from "../../hooks/useNFTsByOwner"
import ChainIcon from "../ChainIcon"

interface Props {
  nftData: MechNFT
}

const NFTGridItem: React.FC<Props> = ({ nftData }) => {
  const [imageError, setImageError] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const chainId = parseInt(nftData.blockchain.shortChainId)
  const { data: signer } = useSigner()
  const mechAddress = calculateERC721MechAddress(
    nftData.contractAddress,
    nftData.nft.tokenID
  )

  const handleDeploy = async () => {
    setDeploying(true)
    try {
      const deployTx = await deployERC721Mech(
        nftData.contractAddress,
        nftData.nft.tokenID,
        signer as JsonRpcSigner
      )
      console.log("deploy tx", deployTx)
      setDeploying(false)
    } catch (e) {
      console.error(e)
      setDeploying(false)
    }
  }
  console.log(
    nftData.nft.tokenID,
    nftData.contractAddress,
    nftData.nft.previews
  )
  return (
    <div className={classes.itemContainer}>
      <div className={classes.header}>
        <p className={classes.tokenName}>
          {nftData.nft.title || nftData.nft.contractTitle || "..."}
        </p>
        {nftData.nft.tokenID.length < 5 && (
          <p className={classes.tokenId}>{nftData.nft.tokenID || "..."}</p>
        )}
      </div>
      <div className={classes.main}>
        {(!nftData.nft.previews || imageError) && (
          <div className={classes.noImage}></div>
        )}
        {!imageError && nftData.nft.previews && (
          <div className={classes.imageContainer}>
            <img
              src={nftData.nft.previews[0].URI}
              alt={nftData.nft.contractTitle}
              className={classes.image}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <div className={classes.info}>
          <div
            className={clsx(classes.infoItem, classes.address)}
            onClick={() => copy(mechAddress)}
          >
            {shortenAddress(mechAddress)}
          </div>
          <div className={classes.infoItem}>
            <p>Chain:</p>
            <ChainIcon chainId={chainId} className={classes.chainIcon} />
          </div>
        </div>
      </div>
      {nftData.hasMech ? (
        <Link to={`mechs/${nftData.contractAddress}/${nftData.nft.tokenID}`}>
          <Button className={classes.useButton} onClick={() => {}}>
            Use Mech
          </Button>
        </Link>
      ) : (
        <>
          {deploying ? (
            <div className={classes.spinner}>
              <Spinner />
            </div>
          ) : (
            <Button onClick={handleDeploy} secondary>
              Deploy Mech
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default NFTGridItem
