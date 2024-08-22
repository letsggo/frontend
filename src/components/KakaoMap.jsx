import React, { useEffect } from 'react';
import markerImage from './marker.png'; // 마커 이미지 파일 경로

const KAKAOMAP_API_KEY = 'fa893ceec1fa072ebbe1e891c1ebe0ef';

const KakaoMap = ({
  width,
  height,
  center = { lat: 33.450701, lng: 126.570667 },
  zoom = 3,
  locations = [],
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: zoom,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 이미지 설정
        const markerImageSize = new window.kakao.maps.Size(40, 40); // 이미지 사이즈 (픽셀)
        const markerImageOption = {
          offset: new window.kakao.maps.Point(27, 69),
        }; // 이미지의 기준 점
        const markerImageObject = new window.kakao.maps.MarkerImage(
          markerImage,
          markerImageSize,
          markerImageOption
        );

        // 마커 추가
        locations.forEach((location) => {
          if (location.lat && location.lng) {
            const markerPosition = new window.kakao.maps.LatLng(
              location.lat,
              location.lng
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
              image: markerImageObject, // 사용자 정의 이미지 설정
            });
            marker.setMap(map);
          }
        });
      });
    };

    document.head.appendChild(script);
  }, [center, zoom, locations]);

  return <div id="map" style={{ width: width, height: height }}></div>;
};

export default KakaoMap;

