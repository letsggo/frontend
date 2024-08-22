import React, { useEffect } from 'react';
import marker from './marker.png'; // 마커 이미지 가져오기

function KakaoMap({ width, height, locations = [], routes = [] }) {
  const KAKAOMAP_API_KEY = 'bc3ce7db6ce264dcd2208b52706dfa89';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      console.log('Kakao Maps API script loaded');
      if (window.kakao && window.kakao.maps) {
        console.log('Kakao Maps API is available');
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const defaultPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const centerPosition =
            locations.length > 0
              ? new window.kakao.maps.LatLng(
                  locations[0].position[0],
                  locations[0].position[1]
                )
              : defaultPosition;

          const options = {
            center: centerPosition,
            level: 3, // 확대 레벨
          };

          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);

          // 커스텀 마커 이미지 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            marker, // 커스텀 마커 이미지 URL
            new window.kakao.maps.Size(40, 40) // 마커 이미지 크기
          );

          // 마커 추가
          locations.forEach((location, index) => {
            console.log(
              `Adding marker: ${location.name} at ${location.position}`
            );
            new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                location.position[0],
                location.position[1]
              ),
              map: map,
              title: location.name,
              image: markerImage, // 커스텀 마커 이미지 설정
            });
          });

          // 동선 경로 추가
          if (routes.length > 0) {
            const path = routes.map(
              (route) => new window.kakao.maps.LatLng(route[0], route[1])
            );

            const polyline = new window.kakao.maps.Polyline({
              path: path,
              strokeWeight: 5,
              strokeColor: '#FF00FF',
              strokeOpacity: 0.7,
              strokeStyle: 'solid',
            });

            polyline.setMap(map);
          } else {
            console.log('No routes to display');
          }
        });
      } else {
        console.error('Kakao Maps API is not available');
      }
    };

    return () => {
      const scriptTag = document.querySelector(`script[src="${script.src}"]`);
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [locations, routes]);

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id="map" style={{ width: width, height: height }}></div>
    </div>
  );
}

export default KakaoMap;
