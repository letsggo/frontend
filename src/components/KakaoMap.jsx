import React, { useEffect } from 'react';
import marker from './marker.png'; // 마커 이미지 가져오기

function KakaoMap({ width, height, locations = [], routes = [] }) {
  const KAKAOMAP_API_KEY = 'bc3ce7db6ce264dcd2208b52706dfa89';

  useEffect(() => {
    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;

    // 스크립트를 헤드에 추가
    document.head.appendChild(script);

    // Kakao Maps API 로드
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(
              locations.length > 0 ? locations[0].position[0] : 33.450701,
              locations.length > 0 ? locations[0].position[1] : 126.570667
            ),
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
          locations.forEach((location) => {
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
          }
        });
      } else {
        console.error('Kakao Maps API is not loaded');
      }
    };

    // 클린업 함수: 컴포넌트가 언마운트될 때 스크립트를 제거합니다.
    return () => {
      const scriptTag = document.querySelector(`script[src="${script.src}"]`);
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [KAKAOMAP_API_KEY, locations, routes]);

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div id="map" style={{ width: width, height: height }}></div>
    </div>
  );
}

export default KakaoMap;
