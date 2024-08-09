import React from 'react';

function MyLocationList() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 bg-white">
        <h2 className="text-xl font-bold mb-4">나의 장소</h2>
        <button className="w-80 h-12 bg-blue-500 text-white rounded-lg mb-4">
          + 지도앱에서 즐겨찾기 불러오기
        </button>
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">아직 불러온 즐겨찾기 목록이 없습니다</p>
        </div>
      </div>
      <div className="w-3/4">
        <div className="w-full h-full bg-gray-300">
          <p className="text-center text-gray-500 mt-4">지도 API 불러올 부분</p>
        </div>
      </div>
    </div>
  );
}

export default MyLocationList;
