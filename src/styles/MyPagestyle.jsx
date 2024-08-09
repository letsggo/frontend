import styled from 'styled-components';

export const Container = styled.div`
    width: 70%;
    margin: auto;
    text-align: center;
    background-color: white;
    padding: 40px;
    border-radius: 8px;
`;

export const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 20px;
    margin-top: 1px;
    text-align: left; /* 제목을 왼쪽 정렬 */
`;

export const StyledH2 = styled.h2`
    font-size: 2rem; /* 원하는 글자 크기 */
    margin: 20px 0; /* 위 아래 여백 조정 */
    text-align: left; /* 제목을 왼쪽 정렬 */
    /* 필요에 따라 추가적인 스타일을 적용 */
`;

export const Tabs = styled.div`
    margin-bottom: 25px;
    text-align: left;
    justify-content: flex-start;
`;

export const TabButton = styled.button`
    border: none;
    padding: 8px 20px;
    margin: 0 6px;
    border-radius: 80px;
    cursor: pointer;
    font-weight: bold;
    background-color: ${({ active }) => (active ? '#4F4F4F' : 'lightgrey')}; /* 활성화 상태에 따라 색상 변경 */
    color: white;
    transition: background-color 0.3s; /* 부드러운 색상 전환 */

    &:hover {
        opacity: 0.8; /* 마우스 오버 시 투명도 변화 */
    }
`;

export const ProfileSection = styled.div`
    text-align: left;
    background-color: #EDEDED;
    padding: 140px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* box-shadow 추가 */
`;

export const ProfilePicture = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 60px; /* 간격 조정 */
`;

export const PicturePlaceholder = styled.div`
    width: 70px; /* 원의 크기 */
    height: 70px;
    border-radius: 50%;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* 자식 요소인 EditIcon의 절대 위치를 위해 */
`;

export const EditIcon = styled.div`
    position: absolute; /* 부모 요소에 상대적으로 위치 */
    bottom: -5px; /* 아래로 살짝 이동 */
    right: -5px; /* 오른쪽으로 살짝 이동 */
    background-color: white;
    color: black;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
`;

export const InfoItem = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const InfoContent = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-right: 10px;
    }

    input {
        font-size: 14px;
        padding: 6px;
        border: 1px solid gray;
        border-radius: 4px;
        outline: none; /* 포커스 시 외곽선 제거 */
        transition: border-color 0.3s; /* 부드러운 색상 전환 */
    }

    input:focus {
        border-color: #4F4F4F; /* 포커스 시 테두리 색상 */
    }

    button {
        margin-left: 10px;
        padding: 5px 10px;
        background-color: #4F4F4F; /* 버튼 색상 */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s; /* 부드러운 색상 전환 */
    }

    button:hover {
        opacity: 0.8; /* 마우스 오버 시 투명도 변화 */
    }
`;

export const EditButton = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #4F4F4F; /* 버튼 색상 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s; /* 부드러운 색상 전환 */

    &:hover {
        opacity: 0.8; /* 마우스 오버 시 투명도 변화 */
    }
`;

export const ValidateButton = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #28A745; /* 초록색 배경 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: default; /* 기본 마우스 커서 */
`;

export const SecuritySection = styled.div`
    background-color: #EDEDED;
    padding: 50px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* box-shadow 추가 */
`;

export const InputGroup = styled.div`
    margin-bottom: 15px;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    box-sizing: border-box; /* padding과 border가 전체 width에 포함되도록 */
    outline: none; /* 포커스 시 외곽선 제거 */
    transition: border-color 0.3s; /* 부드러운 색상 전환 */

    &:focus {
        border-color: #4F4F4F; /* 포커스 시 테두리 색상 */
    }
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #4F4F4F;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s; /* 부드러운 색상 전환 */

    &:hover {
        opacity: 0.8; /* 마우스 오버 시 투명도 변화 */
    }
`;

// 추가된 스타일 컴포넌트
export const WithdrawSection = styled.div`
    background-color: #EDEDED;
    padding: 50px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* box-shadow 추가 */
`;

export const NoticeBox = styled.div`
    background-color: #F8F9FA; /* 밝은 회색 배경 */
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px; /* 간격 조정 */
`;

export const NoticeItem = styled.p`
    margin-bottom: 10px;
    line-height: 1.5; /* 줄 간격 조정 */
`;

export const Checkbox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px; /* 간격 조정 */

    input {
        margin-right: 10px;
    }

    label {
        cursor: pointer; /* 클릭 가능한 커서 */
    }
`;

export const WithdrawButton = styled.button`
    padding: 10px 20px;
    background-color: #DC3545; /* 빨간색 배경 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s; /* 부드러운 색상 전환 */

    &:hover {
        opacity: 0.8; /* 마우스 오버 시 투명도 변화 */
    }
`;
