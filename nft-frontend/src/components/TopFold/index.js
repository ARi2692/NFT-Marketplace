import React from "react";
import Button from "../../common/button";
import "./topFold.css";

const TopFold = () => {
  return (
    <div className="topfold absolute-center">
      <div className="tf-left">
        <div className="tf-heading">
          Discover, buy and sell <span className="header-gradient">NFTs!</span>
        </div>
        <div className="description">
          Our NFT marketplace brings artists and creators together on a single
          platform. Get Exclusive NFTs from our Mystery Boxes.
        </div>
        <div className="tf-left-btns">
          <Button btnType="PRIMARY" btnText="Explore" />
          <Button
            btnType="SECONDARY"
            btnText="Create"
            customClass="tf-left-secondary-btn"
          />
        </div>
        <div className="tf-left-infoStats">
          <div className="tf-is-infoItem absolute-center">
            <div className="tf-infoItem-count">200K+</div>
            <div className="tf-infoItem-label">Collections</div>
          </div>
          <div className="tf-is-infoItem absolute-center">
            <div className="tf-infoItem-count">10K+</div>
            <div className="tf-infoItem-label">Artists</div>
          </div>
          <div className="tf-is-infoItem absolute-center">
            <div className="tf-infoItem-count">170K+</div>
            <div className="tf-infoItem-label">Community</div>
          </div>
        </div>
      </div>
      <div className="tf-right">
        <div className="tf-r-bg-blob"></div>
        <div className="tf-right-diamond">
          <div className="tf-r-diamond-item absolute-center">
            <img
              className="tf-r-diamond-img"
              alt="diamond-banner"
              src="https://media.tenor.com/0u8slMVxDikAAAAd/lazylions-lazy.gif"
            />
          </div>
          <div className="tf-r-diamond-item absolute-center">
            <img
              className="tf-r-diamond-img"
              alt="diamond-banner"
              src="https://gifsec.com/wp-content/uploads/2022/12/nft-gif-15.gif"
            />
          </div>
          <div className="tf-r-diamond-item absolute-center">
            <img
              className="tf-r-diamond-img"
              alt="diamond-banner"
              src="https://media.tenor.com/RHLWwOjQCF4AAAAC/crookz-nft.gif"
            />
          </div>
          <div className="tf-r-diamond-item absolute-center">
            <img
              className="tf-r-diamond-img"
              alt="diamond-banner"
              src="https://cdn-images-1.medium.com/max/1600/1*wlGq1vVZFIotO79Z0GCNCg.gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFold;
