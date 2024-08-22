import React, { useEffect } from 'react';

const KAKAOMAP_API_KEY = 'fa893ceec1fa072ebbe1e891c1ebe0ef';

const KakaoMap = ({ width, height }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div id="map" style={{ width: width, height: height }}></div>;
};

export default KakaoMap;
