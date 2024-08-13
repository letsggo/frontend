import React, { useEffect } from 'react';

function KakaoMap({ width, height }) {
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
            // kakao가 정의되어 있음을 확인하고, kakao.maps.load 사용
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
                        level: 3 // 확대 레벨
                    };

                    // 지도 생성
                    new window.kakao.maps.Map(container, options);
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
    }, [KAKAOMAP_API_KEY]);

    return (
        <div style={{ position: 'relative', zIndex: 0 }}>
            <div id="map" style={{ width: width, height: height }}></div>
        </div>
    );
}

export default KakaoMap;











