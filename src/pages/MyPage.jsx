import React, { useState } from 'react';
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
    WithdrawSection, // 추가된 컴포넌트
    NoticeBox, // 추가된 컴포넌트
    NoticeItem, // 추가된 컴포넌트
    Checkbox, // 추가된 컴포넌트
    WithdrawButton // 추가된 컴포넌트
} from '../styles/MyPagestyle';

const Mypage = () => {
    const [activeTab, setActiveTab] = useState('memberInfo'); // 기본 활성 탭 설정
    const [nickname, setNickname] = useState('example111'); // 닉네임 상태
    const [phone, setPhone] = useState('010-0000-0000'); // 전화번호 상태
    const [email, setEmail] = useState('example@naver.com'); // 이메일 상태
    const [isEditingNickname, setIsEditingNickname] = useState(false); // 닉네임 수정 모드
    const [isEditingPhone, setIsEditingPhone] = useState(false); // 전화번호 수정 모드
    const [isEditingEmail, setIsEditingEmail] = useState(false); // 이메일 수정 모드
    const [isEmailValidated, setIsEmailValidated] = useState(false); // 이메일 인증 상태

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
            
            {activeTab === 'memberInfo' && (  // 회원정보 버튼이 클릭되었을 때만 표시
                <ProfileSection>
                    <h2>회원 정보</h2>
                    <ProfilePicture>
                        <PicturePlaceholder>
                            <EditIcon>✏️</EditIcon>
                        </PicturePlaceholder>
                    </ProfilePicture>
                    <InfoItem>
                        <label>닉네임</label>
                        <InfoContent>
                            {isEditingNickname ? (
                                <input 
                                    type="text" 
                                    value={nickname} 
                                    onChange={(e) => setNickname(e.target.value)} 
                                    onBlur={handleNicknameEdit} // 입력 필드에서 포커스 아웃 시 수정 종료
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
                                    onBlur={handlePhoneEdit} // 입력 필드에서 포커스 아웃 시 수정 종료
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
                            {isEditingEmail ? (
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    onBlur={handleEmailEdit} // 입력 필드에서 포커스 아웃 시 수정 종료
                                    style={{ marginRight: '10px' }} // 입력 필드와 버튼 사이의 간격
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
                <SecuritySection>
                    <StyledH2>비밀번호 설정</StyledH2>
                    <InputGroup>
                        <Label>현재 비밀번호</Label>
                        <Input type="password" placeholder="현재의 비밀번호를 입력해주세요" />
                    </InputGroup>
                    <InputGroup>
                        <Label>변경할 비밀번호</Label>
                        <Input type="password" placeholder="새 비밀번호를 입력해주세요" />
                    </InputGroup>
                    <InputGroup>
                        <Label>변경할 비밀번호 확인</Label>
                        <Input type="password" placeholder="새 비밀번호를 다시 입력해주세요" />
                    </InputGroup>
                    <Button>비밀번호 변경하기</Button>
                </SecuritySection>
            )}
            {activeTab === 'withdraw' && (
                <WithdrawSection>
                    <StyledH2>탈퇴하기</StyledH2>
                    <p>OOO님 저희 가불까를 떠나신다니 너무 아쉬워요!<br />서비스 탈퇴전 아래의 유의사항을 확인해주세요</p>
                    <NoticeBox>
                        <NoticeItem>삭제된 계정의 데이터는 복구가 불가능합니다.</NoticeItem>
                        <NoticeItem>계정 삭제 시 보유하고 있던 크레딧은 모두 소멸되며 어떠한 경우에도 복구가 불가능합니다.</NoticeItem>
                        <NoticeItem>계정 삭제 시 파기 및 보존되는 정보는 개인정보처리 방침을 참고하여 주시기 바랍니다.</NoticeItem>
                    </NoticeBox>
                    <Checkbox>
                        <input type="checkbox" id="confirm" />
                        <label htmlFor="confirm">유의사항을 모두 확인하였으며, 서비스 탈퇴에 동의합니다.</label>
                    </Checkbox>
                    <WithdrawButton>서비스 탈퇴하기</WithdrawButton>
                </WithdrawSection>
            )}
        </Container>
    );
};

export default Mypage;
