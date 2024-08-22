import React, { useEffect } from 'react';

const KAKAOMAP_API_KEY = 'fa893ceec1fa072ebbe1e891c1ebe0ef';

const KakaoMap = ({ width, height, locations = [] }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            locations.length > 0 ? locations[0].lat : 33.450701,
            locations.length > 0 ? locations[0].lng : 126.570667
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        locations.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
          });

          // 마커에 클릭 이벤트를 추가할 수 있습니다 (옵션)
          window.kakao.maps.event.addListener(marker, 'click', () => {
            alert(`${location.name} 위치입니다.`);
          });
        });
      });
    };

    document.head.appendChild(script);
  }, [locations]);

  return <div id="map" style={{ width: width, height: height }}></div>;
};

export default KakaoMap;
