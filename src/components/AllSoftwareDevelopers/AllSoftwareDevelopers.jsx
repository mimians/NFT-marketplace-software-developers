import React, { useState, useEffect } from "react";
import SoftwareDeveloperNFTImage from "../SoftwareDeveloperNFTImage/SoftwareDeveloperNFTImage";
import SoftwareDeveloperNFTDetails from "../SoftwareDeveloperNFTDetails/SoftwareDeveloperNFTDetails";
import Loading from "../Loading/Loading";

const AllSoftwareDevelopers = ({
  cryptoBoys,
  accountAddress,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buySoftwareDeveloper,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cryptoBoys.length !== 0) {
      if (cryptoBoys[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
  }, [cryptoBoys]);

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>
            Total No. of Software Developer's Minted On The Platform:{" "}
            {totalTokensMinted}
          </h5>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-2">
        {cryptoBoys.map((softwaredeveloper) => {
          return (
            <div
              key={softwaredeveloper.tokenId.toNumber()}
              className="w-50 p-4 mt-1 border"
            >
              {!loading ? (
                <SoftwareDeveloperNFTImage
                  colors={
                    softwaredeveloper.metaData !== undefined
                      ? softwaredeveloper.metaData.metaData.colors
                      : ""
                  }
                />
              ) : (
                <Loading />
              )}
              <SoftwareDeveloperNFTDetails
                softwaredeveloper={softwaredeveloper}
                accountAddress={accountAddress}
                changeTokenPrice={changeTokenPrice}
                toggleForSale={toggleForSale}
                buySoftwareDeveloper={buySoftwareDeveloper}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllSoftwareDevelopers;
