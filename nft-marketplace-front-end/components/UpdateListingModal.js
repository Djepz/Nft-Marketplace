import { Modal, Input, useNotification, Button } from "web3uikit";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import { ethers } from "ethers";

export default function UpdateListingModal({
  nftAddress,
  tokenId,
  isVisible,
  marketplaceAddress,
  onClose,
}) {
  const dispatch = useNotification();

  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);

  const handleUpdateListingSuccess = () => {
    dispatch({
      type: "success",
      message: "listing updated",
      title: "Listing updated - please refresh (and move blocks)",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdateListingWith("0");
  };

  const handleCancelListingSuccess = () => {
    dispatch({
      type: "success",
      message: "listing canceled",
      title: "Listing canceled - please refresh (and move blocks)",
      position: "topR",
    });
    onClose && onClose();
  };

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
    },
  });

  const { runContractFunction: cancelListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "cancelListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
  });

  async function cancel() {
    await cancelListing();
  }

  return (
    <Modal
      Button={isVisible}
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        updateListing({
          onError: (error) => {
            console.log(error);
          },
          onSuccess: () => handleUpdateListingSuccess(),
        });
      }}
    >
      <Button
        text="Cancel Item"
        onClick={() => {
          cancelListing({
            onError: (error) => {
              console.log(error);
            },
            onSuccess: () => handleCancelListingSuccess(),
          });
        }}
      ></Button>
      <Input
        label="Update listing price in L1 Currency (ETH)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value);
        }}
      />
    </Modal>
  );
}
