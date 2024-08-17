import React, { useState } from 'react';
import { useNavigate  } from'react-router-dom';
import { 
    Container, 
    Title, 
    Tabs, 
    TabButton, 
    ProfileSection, 
    ProfilePicture, 
    PicturePlaceholder, 
    EditIcon, 
    InfoItem, 
    InfoContent, 
    EditButton, 
    ValidateButton, 
    SecuritySection, 
    InputGroup, 
    Label, 
    Input, 
    Button, 
    StyledH2,
    WithdrawSection, 
    NoticeBox, 
    NoticeItem, 
    Checkbox, 
    WithdrawButton 
} from'../styles/MyPagestyle';
import axios from'axios';

const Mypage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('memberInfo');
    const [nickname, setNickname] = useState('example111');
    const [phone, setPhone] = useState('010-0000-0000');
    const [email, setEmail] = useState('example@naver.com');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
                const response = await axios.delete('http://43.200.238.249:5000/users/delete', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
    
                if (response.status === 200) {
                    alert('탈퇴가 성공적으로 처리되었습니다.');
                    navigate('/');  
                } else {
                    alert('탈퇴 처리 중 오류가 발생했습니다.');
                }
            } catch (error) {
                console.error('Error during account deletion:', error.response?.data || error.message);
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
            const response = await axios.post('http://43.200.238.249:5000/users/change-password', {
                currentPassword,
                newPassword,
                confirmNewPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });
    
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

    return (
        <Container><Title>마이페이지</Title><Tabs><TabButton 
                    onClick={() => setActiveTab('memberInfo')} 
                    active={activeTab === 'memberInfo'}
                >
                    회원정보
                </TabButton><TabButton 
                    onClick={() => setActiveTab('securitySettings')} 
                    active={activeTab === 'securitySettings'}
                >
                    보안설정
                </TabButton><TabButton 
                    onClick={() => setActiveTab('withdraw')} 
                    active={activeTab === 'withdraw'}
                >
                    탈퇴하기
                </TabButton></Tabs>
            
            {activeTab === 'memberInfo' && (
                <ProfileSection><h2>회원 정보</h2><ProfilePicture><PicturePlaceholder>
                    <EditIcon>✏️</EditIcon></PicturePlaceholder></ProfilePicture>
                    <InfoItem><label>닉네임</label><InfoContent>
                            {isEditingNickname ? (
                                <input type="text"value={nickname}onChange={(e) => setNickname(e.target.value)} 
                                    onBlur={handleNicknameEdit} 
                                />
                            ) : (
                                <><span>{nickname}</span><EditButton onClick={handleNicknameEdit}>✎</EditButton></>
                            )}
                        </InfoContent></InfoItem><InfoItem><label>전화번호</label><InfoContent>
                            {isEditingPhone ? (
                                <input type="text"value={phone}onChange={(e) => setPhone(e.target.value)} 
                                    onBlur={handlePhoneEdit} 
                                />
                            ) : (
                                <><span>{phone}</span><EditButton onClick={handlePhoneEdit}>✎</EditButton></>
                            )}
                        </InfoContent></InfoItem><InfoItem>
                        <label>이메일 주소</label>
                        <InfoContent>
                            {isEditingEmail ? (
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    onBlur={handleEmailEdit}
                                    style={{ marginRight: '10px' }}
                                />
                            ) : (
                                <>
                                    <span>{email}</span>
                                    <EditButton onClick={handleEmailEdit}>✎</EditButton>
                                </>
                            )}
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
                </ProfileSection>
            )}
            {activeTab === 'securitySettings' && (
                <SecuritySection><StyledH2>비밀번호 설정</StyledH2><InputGroup><Label>현재 비밀번호</Label><Input 
                            type="password" 
                            placeholder="현재의 비밀번호를 입력해주세요" 
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </InputGroup><InputGroup><Label>변경할 비밀번호</Label><Input 
                            type="password" 
                            placeholder="새 비밀번호를 입력해주세요" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </InputGroup><InputGroup><Label>변경할 비밀번호 확인</Label><Input 
                            type="password" 
                            placeholder="새 비밀번호를 다시 입력해주세요" 
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </InputGroup><Button onClick={handleChangePassword}>비밀번호 변경하기</Button></SecuritySection>
            )}
            {activeTab === 'withdraw' && (
                <WithdrawSection><StyledH2>탈퇴하기</StyledH2><p>OOO님 저희 가불까를 떠나신다니 너무 아쉬워요!<br />
                    서비스 탈퇴전 아래의 유의사항을 확인해주세요</p><NoticeBox><NoticeItem>삭제된 계정의 데이터는 복구가 불가능합니다.</NoticeItem><NoticeItem>계정 삭제 시 보유하고 있던 크레딧은 모두 소멸되며 어떠한 경우에도 복구가 불가능합니다.</NoticeItem><NoticeItem>계정 삭제 시 파기 및 보존되는 정보는 개인정보처리 방침을 참고하여 주시기 바랍니다.</NoticeItem></NoticeBox><Checkbox><input 
                            type="checkbox" 
                            id="confirm" 
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        /><label htmlFor="confirm">유의사항을 모두 확인하였으며, 서비스 탈퇴에 동의합니다.</label></Checkbox><WithdrawButton onClick={handleWithdraw}>서비스 탈퇴하기</WithdrawButton></WithdrawSection>
            )}
        </Container>
    );
};

export default Mypage;
