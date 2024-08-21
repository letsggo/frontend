import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import profileImage from '../buttonimage/profile.png';

// 컨테이너 컴포넌트
export const Container = styled.div`
  width: 70%;
  margin: auto;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
`;

// 제목 컴포넌트
export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  margin-top: 1px;
  text-align: left;
`;

// 두 번째 제목 컴포넌트
export const StyledH2 = styled.h2`
  font-size: 23px;
  margin-bottom: 30px;
  text-align: left;
`;

// 탭 컴포넌트
export const Tabs = styled.div`
  margin-bottom: 25px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
`;

// 탭 버튼 컴포넌트
export const TabButton = styled.button`
  border: 2px solid #ffd700;
  padding: 8px 20px;
  margin: 0 6px;
  border-radius: 80px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ active }) => (active ? '#FFD700' : 'white')};
  color: black;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd700;
  }
`;

// 프로필 섹션 컴포넌트
export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 60px 300px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 프로필 사진 컴포넌트
export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  margin-bottom: 60px;
  position: relative; /* 편집 아이콘을 절대 위치로 설정할 수 있도록 */
`;

// 사진 플레이스홀더 컴포넌트
export const PicturePlaceholder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 편집 아이콘을 위치시키기 위한 상대적 위치 */
`;

// 프로필 사진 이미지 컴포넌트
export const ProfileImage = styled.img`
  width: 120px; /* 부모 요소에 맞게 조정 */
  height: 120px; /* 부모 요소에 맞게 조정 */
  object-fit: cover; /* 이미지 비율을 유지하면서 부모 요소에 맞게 자름 */
  border-radius: 50%; /* 원형으로 설정 */
  border: 1px solid grey;
`;

// 편집 아이콘 컴포넌트
export const EditIcon = styled.div`
  background: url(${profileImage}) no-repeat center center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  position: absolute; /* 위치를 절대적으로 설정 */
  bottom: 2px;
  right: 2px;
  cursor: pointer;
`;

// 정보 아이템 컴포넌트
export const InfoItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  label {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

// 정보 내용 컴포넌트 수정
export const InfoContent = styled.div`
  display: flex;
  align-items: center; /* 입력 필드와 버튼이 수직으로 정렬되도록 설정 */
  justify-content: space-between;
  border: 2px solid #4ec3f3;
  border-radius: 5px;
  padding: 10px;
  width: 100%;

  span {
    margin-right: 10px;
  }

  input {
    font-size: 14px;
    padding: 2px;
    border: 1px solid gray;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  button {
    color: white;
    background-color: #4ec3f3;
    border: none;
    border-radius: 4px;
  }
`;

// 편집 버튼 컴포넌트
export const EditButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  button:hover {
    opacity: 0.8;
  }
`;

// 인증 버튼 컴포넌트
export const ValidateButton = styled.button`
  padding: 2px 10px;
  background-color: #4ec3f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
`;

// 보안 섹션 컴포넌트
export const SecuritySection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 60px 300px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 입력 그룹 컴포넌트
export const InputGroup = styled.div`
  margin: 20px 0;
`;

// 라벨 컴포넌트
export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

// 입력 필드 컴포넌트
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #4ec3f3;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4ec3f3;
  }
`;

// 버튼 컴포넌트
export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4ec3f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  width: auto;
  margin: 50px 0 20px 0;
  &:hover {
    opacity: 0.8;
  }
`;

// 탈퇴 섹션 컴포넌트
export const WithdrawSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 60px 300px;
  border-radius: 10px;
  border: 2px solid #ffd700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 공지 박스 컴포넌트
export const NoticeBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 40px 0;
`;

// 공지 아이템 컴포넌트
export const NoticeItem = styled.p`
  margin: 20px;
  line-height: 1.5;
`;

// 체크박스 컴포넌트
export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-right: 10px;
  }

  label {
    cursor: pointer;
  }
`;

// 탈퇴 버튼 컴포넌트
export const WithdrawButton = styled.button`
  padding: 10px 20px;
  background-color: #4ec3f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
  width: 100%; /* 버튼이 전체 너비를 차지하도록 */
  text-align: center; /* 텍스트 가운데 정렬 */

  &:hover {
    opacity: 0.8;
  }
`;

const Mypage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('memberInfo');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://43.200.238.249:5000/users/info',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userInfo = response.data;
        setNickname(userInfo.name || '닉네임을 입력해주세요');
        setPhone(userInfo.phone || '전화번호를 입력해주세요');
        setEmail(userInfo.email || '이메일을 입력해주세요');
        setProfileImage(userInfo.profile_image);
        setUserName(userInfo.name);
      } catch (error) {
        console.error(
          'Error fetching user information:',
          error.response?.data || error.message
        );
        alert('회원 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameEdit = () => {
    setIsEditingNickname(!isEditingNickname);
  };

  const handlePhoneEdit = () => {
    setIsEditingPhone(!isEditingPhone);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleEmailValidation = () => {
    if (email) {
      setIsEmailValidated(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleWithdraw = async () => {
    if (isChecked) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
          'http://43.200.238.249:5000/users/delete',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert('탈퇴가 성공적으로 처리되었습니다.');
          navigate('/');
        } else {
          alert('탈퇴 처리 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error(
          'Error during account deletion:',
          error.response?.data || error.message
        );
        alert('탈퇴 처리 중 오류가 발생했습니다.');
      }
    } else {
      alert('탈퇴 전 유의사항에 동의해주세요.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://43.200.238.249:5000/users/change-password',
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', nickname);
      formData.append('phone', phone);
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }

      const response = await axios.patch(
        'http://43.200.238.249:5000/users/info/edit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('회원 정보가 성공적으로 수정되었습니다.');
      } else {
        alert('회원 정보 수정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error(
        'Error updating profile information:',
        error.response?.data || error.message
      );
      alert('회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  // 편집 아이콘 클릭 시 파일 선택 창을 여는 함수
  const handleEditIconClick = () => {
    fileInputRef.current.click(); // fileInputRef의 click 메서드를 호출
  };

  // 프로필 사진 컴포넌트에서 input 태그를 숨기고 ref를 추가
  const fileInputRef = useRef(null); // 파일 input을 제어하기 위한 ref

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <Tabs>
        <TabButton
          onClick={() => setActiveTab('memberInfo')}
          active={activeTab === 'memberInfo'}
        >
          회원정보
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('securitySettings')}
          active={activeTab === 'securitySettings'}
        >
          보안설정
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('withdraw')}
          active={activeTab === 'withdraw'}
        >
          탈퇴하기
        </TabButton>
      </Tabs>

      {activeTab === 'memberInfo' && (
        <ProfileSection>
          <h2>회원 정보</h2>
          <ProfilePicture>
            {profileImage ? (
              <>
                <ProfileImage src={profileImage} alt="Profile" />
                <EditIcon onClick={handleEditIconClick} />
              </>
            ) : (
              <PicturePlaceholder>
                <EditIcon onClick={handleEditIconClick} />
              </PicturePlaceholder>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // 파일 input에 ref 연결
              onChange={handleProfileImageChange}
              style={{ display: 'none' }} // input 태그 숨기기
            />
          </ProfilePicture>
          <InfoItem>
            <label>닉네임</label>
            <InfoContent>
              {isEditingNickname ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onBlur={handleNicknameEdit}
                />
              ) : (
                <>
                  <span>{nickname}</span>
                  <EditButton onClick={handleNicknameEdit}>✎</EditButton>
                </>
              )}
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <label>전화번호</label>
            <InfoContent>
              {isEditingPhone ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={handlePhoneEdit}
                />
              ) : (
                <>
                  <span>{phone}</span>
                  <EditButton onClick={handlePhoneEdit}>✎</EditButton>
                </>
              )}
            </InfoContent>
          </InfoItem>
          <InfoItem>
            <label>이메일 주소</label>
            <InfoContent>
              <span>{email}</span>
              {isEmailValidated ? (
                <ValidateButton>인증완료</ValidateButton>
              ) : (
                <>
                  <span>인증전</span>
                  <button onClick={handleEmailValidation}>인증</button>
                </>
              )}
            </InfoContent>
          </InfoItem>
          <Button onClick={handleSaveProfile}>회원 정보 저장하기</Button>
        </ProfileSection>
      )}
      {activeTab === 'securitySettings' && (
        <SecuritySection>
          <StyledH2>비밀번호 설정</StyledH2>
          <InputGroup>
            <Label>현재 비밀번호</Label>
            <Input
              type="password"
              placeholder="현재의 비밀번호를 입력해주세요"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>새로운 비밀번호</Label>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력해주세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label>새로운 비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </InputGroup>
          <Button onClick={handleChangePassword}>비밀번호 변경하기</Button>
        </SecuritySection>
      )}
      {activeTab === 'withdraw' && (
        <WithdrawSection>
          <StyledH2>탈퇴하기</StyledH2>
          <p
            style={{ fontSize: '20px', marginTop: '40px', textAlign: 'center' }}
          >
            {userName}님 저희 가볼까를 떠나신다니 너무 아쉬워요!
          </p>
          <p
            style={{
              fontSize: '15px',
              marginBottom: '30px',
              textAlign: 'center',
            }}
          >
            서비스 탈퇴 전 아래의 유의사항을 확인해주세요.
          </p>
          <NoticeBox>
            <div style={{ color: '#F08080', fontWeight: '900' }}>유의사항</div>
            <NoticeItem>
              • 삭제된 계정의 데이터는 복구가 불가능합니다.
            </NoticeItem>
            <NoticeItem>
              • 계정 삭제 시 보유하고 있던 크레딧은 모두 소멸되며 어떠한 경우에도 복구가 불가능합니다.
            </NoticeItem>
            <NoticeItem>
              • 계정 삭제 시 파기 및 보존되는 정보는 개인정보처리 방침을 참고하여 주시기 바랍니다.
            </NoticeItem>
          </NoticeBox>
          <Checkbox>
            <input
              type="checkbox"
              id="confirm"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="confirm">
              유의사항을 모두 확인하였으며, 서비스 탈퇴에 동의합니다.
            </label>
          </Checkbox>
          <WithdrawButton onClick={handleWithdraw}>
            서비스 탈퇴하기
          </WithdrawButton>
        </WithdrawSection>
      )}
    </Container>
  );
};

export default Mypage;
