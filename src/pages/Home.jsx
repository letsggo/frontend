import React from 'react';
import { useNavigate } from 'react-router-dom';
import sea from '../assets/images/sea.png';

function Home() {
    const navigate = useNavigate();

    const handleCreatePlan = () => {
        navigate('/MakePlanRoom1');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">내가 참여한 여행</h1>
                </div>
                <div className="relative">
                    <input type="text" className="w-96 h-10 px-4 py-2 border border-gray-300 rounded-full" placeholder="검색" />
                </div>
                <button className="w-44 h-10 bg-blue-500 text-white rounded-full" onClick={handleCreatePlan}>
                    계획 만들기
                </button>
            </div>
            <div className="flex items-center mb-4">
                <button className="px-4 py-2 bg-yellow-400 text-white rounded-full mr-2">전체</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full mr-2">시작단계</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full mr-2">투표단계</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full">동선단계</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(9).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg" style={{ width: '378px', height: '354px', flexShrink: 0 }}>
                        <div className="w-full h-40 rounded-t-2xl overflow-hidden">
                            <img src={sea} alt="여행" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <span className="inline-block bg-yellow-400 text-white py-1 px-2 rounded-full">강원도</span>
                            <h2 className="mt-2 text-xl font-bold">여행 제목</h2>
                            <p className="text-gray-600">2024. 07. 13 - 2024. 8. 27</p>
                            <div className="flex items-center mt-4">
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
