import React, { useEffect } from 'react';

function KakaoMap({ width, height }) {
    const KAKAOMAP_API_KEY = 'fa893ceec1fa072ebbe1e891c1ebe0ef';

    useEffect(() => {
        // 스크립트 태그 생성
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&autoload=false`;
        script.async = true;

        // 스크립트를 헤드에 추가
        document.head.appendChild(script);

        // Kakao Maps API 로드
        script.onload = () => {
            console.log('Script loaded successfully');

            // kakao.maps.load 사용하여 API가 완전히 로드되었는지 확인
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    console.log('Kakao Maps API is fully loaded');
                    
                    try {
                        // 지도 생성
                        const container = document.getElementById('map');
                        const options = {
                            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                            level: 3
                        };
                        new window.kakao.maps.Map(container, options);
                    } catch (error) {
                        console.error('Error creating the map:', error);
                    }
                });
            } else {
                console.error('Kakao Maps API is not fully loaded or initialized');
            }
        };

        // 에러 처리
        script.onerror = () => {
            console.error('Failed to load Kakao Maps API script');
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

