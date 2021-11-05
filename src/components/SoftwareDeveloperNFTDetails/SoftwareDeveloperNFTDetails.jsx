import React, { Component } from "react";

class SoftwareDeveloperNFTDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSoftwareDeveloperPrice: "",
    };
  }

  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };

  render() {
    return (
      <div key={this.props.softwaredeveloper.tokenId.toNumber()} className="mt-4">
        <p>
          <span className="font-weight-bold">Token Id</span> :{" "}
          {this.props.softwaredeveloper.tokenId.toNumber()}
        </p>
        <p>
          <span className="font-weight-bold">Name</span> :{" "}
          {this.props.softwaredeveloper.tokenName}
        </p>
        <p>
          <span className="font-weight-bold">Minted By</span> :{" "}
          {this.props.softwaredeveloper.mintedBy.substr(0, 5) +
            "..." +
            this.props.softwaredeveloper.mintedBy.slice(
              this.props.softwaredeveloper.mintedBy.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Owned By</span> :{" "}
          {this.props.softwaredeveloper.currentOwner.substr(0, 5) +
            "..." +
            this.props.softwaredeveloper.currentOwner.slice(
              this.props.softwaredeveloper.currentOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Previous Owner</span> :{" "}
          {this.props.softwaredeveloper.previousOwner.substr(0, 5) +
            "..." +
            this.props.softwaredeveloper.previousOwner.slice(
              this.props.softwaredeveloper.previousOwner.length - 5
            )}
        </p>
        <p>
          <span className="font-weight-bold">Price</span> :{" "}
          {window.web3.utils.fromWei(
            this.props.softwaredeveloper.price.toString(),
            "Ether"
          )}{" "}
          Ξ
        </p>
        <p>
          <span className="font-weight-bold">No. of Transfers</span> :{" "}
          {this.props.softwaredeveloper.numberOfTransfers.toNumber()}
        </p>
        <div>
          {this.props.accountAddress === this.props.softwaredeveloper.currentOwner ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callChangeTokenPriceFromApp(
                  this.props.softwaredeveloper.tokenId.toNumber(),
                  this.state.newSoftwareDeveloperPrice
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="newSoftwareDeveloperPrice">
                  <span className="font-weight-bold">Change Token Price</span> :
                </label>{" "}
                <input
                  required
                  type="number"
                  name="newSoftwareDeveloperPrice"
                  id="newSoftwareDeveloperPrice"
                  value={this.state.newSoftwareDeveloperPrice}
                  className="form-control w-50"
                  placeholder="Enter new price"
                  onChange={(e) =>
                    this.setState({
                      newSoftwareDeveloperPrice: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn btn-outline-info mt-0 w-50"
              >
                change price
              </button>
            </form>
          ) : null}
        </div>
        <div>
          {this.props.accountAddress === this.props.softwaredeveloper.currentOwner ? (
            this.props.softwaredeveloper.forSale ? (
              <button
                className="btn btn-outline-danger mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.softwaredeveloper.tokenId.toNumber()
                  )
                }
              >
                Remove from sale
              </button>
            ) : (
              <button
                className="btn btn-outline-success mt-4 w-50"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={() =>
                  this.props.toggleForSale(
                    this.props.softwaredeveloper.tokenId.toNumber()
                  )
                }
              >
                Keep for sale
              </button>
            )
          ) : null}
        </div>
        <div>
          {this.props.accountAddress !== this.props.softwaredeveloper.currentOwner ? (
            this.props.softwaredeveloper.forSale ? (
              <button
                className="btn btn-outline-primary mt-3 w-50"
                value={this.props.softwaredeveloper.price}
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                onClick={(e) =>
                  this.props.buySoftwareDeveloper(
                    this.props.softwaredeveloper.tokenId.toNumber(),
                    e.target.value
                  )
                }
              >
                Buy For{" "}
                {window.web3.utils.fromWei(
                  this.props.softwaredeveloper.price.toString(),
                  "Ether"
                )}{" "}
                Ξ
              </button>
            ) : (
              <>
                <button
                  disabled
                  style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                  className="btn btn-outline-primary mt-3 w-50"
                >
                  Buy For{" "}
                  {window.web3.utils.fromWei(
                    this.props.softwaredeveloper.price.toString(),
                    "Ether"
                  )}{" "}
                  Ξ
                </button>
                <p className="mt-2">Currently not for sale!</p>
              </>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default SoftwareDeveloperNFTDetails;
