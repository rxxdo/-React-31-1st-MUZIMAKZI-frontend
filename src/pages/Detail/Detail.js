import React, { useState, useEffect } from 'react';
import './Detail.scss';
import DetailImage from './DetailComponent/DetailImages';
import DetailSmallImage from './DetailComponent/DetailSmallImage';
import TextInfo from './DetailComponent/TextInfo';
import ColorImage from './DetailComponent/ColorImage';
import Button from './DetailComponent/Button';
import SizeTag from './DetailComponent/SizeTag';

const Detail = () => {
  const [detailData, setDetailData] = useState();
  const [sizeData, setSizeData] = useState();
  const [colorData, setColorData] = useState();
  useEffect(() => {
    fetch('http://10.58.2.42:8000/products/detail/1')
      .then(res => res.json())
      .then(res => {
        setDetailData(res.message);
      })
      .catch(e => console.error(e));
  }, []);

  // console.log(mainImage);
  // useEffect(() => {
  //   fetch('/data/detailSmallList.json')
  //     .then(res => res.json())
  //     .then(res => setDetailSmallImage(res))
  //     .catch(e => console.error(e));
  // }, []);

  useEffect(() => {
    fetch('/data/detailColorList.json')
      .then(res => res.json())
      .then(res => setColorData(res))
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    fetch('/data/sizeTag.json')
      .then(res => res.json())
      .then(res => setSizeData(res))
      .catch(e => console.error(e));
  }, []);

  const onHandleRegisterImage = thumbnail_url => {
    setDetailData(thumbnail_url);
  };

  const onResetRegisterImage = () => {
    setDetailData();
  };
  const onColorChange = thumbnail_url => {
    setDetailData(thumbnail_url);
  };
  const onResetColor = () => {
    setDetailData();
  };

  return (
    <div className="Detail">
      <div className="container">
        <span>남성복</span>
        <div id="imageContainer">
          {detailData && (
            <DetailImage thumbnail_url={detailData.thumbnail_image_url} />
          )}
          <div id="smallImageList">
            {detailData &&
              detailData.image.map((small, index) => {
                return (
                  <DetailSmallImage
                    key={index}
                    registerImage={setDetailData}
                    resetImage={setDetailData}
                    detailData={detailData}
                    id={small.id}
                    thumbnail_url={small}
                  />
                );
              })}
          </div>
        </div>
        <div className="detailInform">
          <div className="textContainer">
            <div className="textInfo">
              {detailData && (
                <TextInfo
                  name={detailData.name}
                  price={detailData.price}
                  size={detailData.size}
                  color={detailData.color}
                  description={detailData.description}
                />
              )}
            </div>
          </div>
          <div className="textDetailBox">
            <dd className="textArea">
              우리는 무지막지하지만 무지하게 코딩을 잘하게 될거에요.
            </dd>
          </div>
          <div className="sizeBtn">
            <span>Color선택</span>
            <button className="rightBtn">옵션다시선택</button>
          </div>
          <div className="colorInfo">
            {colorData &&
              colorData.map(color => {
                return (
                  <ColorImage
                    key={color.id}
                    id={color.id}
                    thumbnail={color.thumbnail_url}
                    registerColor={onColorChange}
                    resetColor={onResetColor}
                  />
                );
              })}
          </div>
          <span>size선택</span>
          <div className="sizeInfo">
            {sizeData &&
              sizeData.map(size => {
                return <SizeTag key={size.id} thumbnail={size.thumbnail} />;
              })}
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Detail;
