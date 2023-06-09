import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { __userLocation, __userTown } from '../redux/modules/user'
import { getCookie } from '../cookie/Cookie';

// 백그라운드 지정 함수    
const getBgImg = (lang) => {
    let imgUrl;
    switch (lang) {
        case "JAVA":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomJava.webp`
            break;
        case "JAVASCRIPT":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomJs.webp`
            break;
        case "PYTHON":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomPy.webp`
            break;
        case "C":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomC.webp`
            break;
        case "C#":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomCshrp.webp`
            break;
        case "C++":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomCpl.webp`
            break;
        case "KOTLIN":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomKt.webp`
            break;
        default:
            imgUrl = `${process.env.PUBLIC_URL}/image/roomEtc.webp`
            break;
    }
    return imgUrl
}

// 아이콘 지정 함수    
const getLangIcon = (lang) => {
    let imgUrl;
    switch (lang) {
        case "JAVA":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconJava.webp`
            break;
        case "JAVASCRIPT":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconJs.webp`
            break;
        case "PYTHON":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconPy.webp`
            break;
        case "C":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconC.webp`
            break;
        case "C#":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconCshrp.webp`
            break;
        case "C++":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconCpl.webp`
            break;
        case "KOTLIN":
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconKt.webp`
            break;
        default:
            imgUrl = `${process.env.PUBLIC_URL}/image/roomIconEtc.webp`
            break;
    }
    return imgUrl
}


function MainRoom(props) {

    // 기본 좌표값 (전역)
    const searchInfo = useSelector((state) => {
        //console.log("searchInfo", state.searchInfo)
        return state.searchInfo
    })

    const userInfo = useSelector((state) => {
        return state.userInfo
    })



    const navigate = useNavigate()

    // 내부 상태
    const [roomDetails, setRoomDetails] = useState(props.roomList?.[0])
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        setIsLogin(getCookie('token') ? true : false)
    })

    // 방참여하기
    const onClickJoinRoomHandler = (details) => {
        if (isLogin){
            const state = {
                mySessionId: details.sessionId,
                myUserName: getCookie('nickName'),
                isDirect: true,
                title: details.title,
                language: details.language,
                maxMembers: details.maxMembers,
                isOpened: details.opened,
                password: details.password,
                latitude: details.lat,
                longitude: details.lon,
                neighborhood: details.neighborhood,
            };
            navigate('/room', { state: state })
        }else{
            alert('로그인 이후 사용 가능합니다.')
        }
    }

    // 방 상세보기
    const onClickRoomDetailsHandler = (details) => {
        setRoomDetails(details)
    }

    return (
        <RoomContainer>
            {props.roomList.length === 0 ?
                <>
                    <EmptyRoom>
                        <div>
                            <EmptyImgDiv>
                                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.7721 74.4331C58.918 74.4331 74.4388 58.9123 74.4388 39.7664C74.4388 20.6205 58.918 5.09973 39.7721 5.09973C20.6263 5.09973 5.10547 20.6205 5.10547 39.7664C5.10547 58.9123 20.6263 74.4331 39.7721 74.4331Z" stroke="#BEBEBE" stroke-width="8.66667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M90.9073 90.8997L66.6406 66.6331" stroke="#BEBEBE" stroke-width="8.66667" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </EmptyImgDiv>
                            <EmptyDescDiv>
                                <EmptyDesc>주변에 개설된 모각코가 없습니다.</EmptyDesc>
                                <EmptyDesc>다른 지역을 검색하거나 모각코 방을 개설해 주세요.</EmptyDesc>
                            </EmptyDescDiv>
                        </div>
                    </EmptyRoom>
                </> :
                <>
                    <NonEmptyRoom>
                        <RoomList>
                            {props.roomList && props.roomList.map((room, idx) => {
                                return (
                                    <RoomCard onClick={() => { onClickRoomDetailsHandler(room) }} language={room.language}>
                                        <CardTop>
                                            <CardTitle>{room.title}</CardTitle>
                                        </CardTop>
                                        <CardBottom>
                                            <LanguageWrap>
                                                <LanguageIconDiv language={room.language}>
                                                </LanguageIconDiv>
                                                <LanguageDesc>
                                                    {room.language}
                                                </LanguageDesc>
                                            </LanguageWrap>
                                            <RoomEnterMemberWrap>
                                                <div>
                                                    <img src={`${process.env.PUBLIC_URL}/image/peopleAlt.svg`} alt="사람아이콘" />
                                                </div>
                                                <RoomEnterMamberNum>
                                                    {room.cntMembers}/{room.maxMembers}
                                                </RoomEnterMamberNum>
                                            </RoomEnterMemberWrap>
                                        </CardBottom>
                                    </RoomCard>
                                )
                            })}
                        </RoomList>
                        <RoomDetails>
                            <RoomDetailsTop>
                                <RoomDetailsTitle>{roomDetails && roomDetails.title}</RoomDetailsTitle>
                            </RoomDetailsTop>
                            <RoomDetailsBottom>
                                <RoomDetailsDesc>
                                    <RoomDetilasDescP>지역 : {roomDetails && roomDetails.neighborhood}</RoomDetilasDescP>
                                    <RoomDetilasDescP>모각코시간 : {roomDetails && roomDetails.createdAt}</RoomDetilasDescP>
                                    <RoomDetilasDescP>정원 : {roomDetails && roomDetails.cntMembers}/{roomDetails && roomDetails.maxMembers}</RoomDetilasDescP>
                                    <RoomDetilasDescP>언어 : <LanguageIconSpan language={roomDetails&&roomDetails.language}></LanguageIconSpan><span>{roomDetails && roomDetails.language}</span></RoomDetilasDescP>
                                </RoomDetailsDesc>
                                <RoomDetailsEnter>
                                    <RoomEnterButton onClick={() => { onClickJoinRoomHandler(roomDetails) }}>참여하기→</RoomEnterButton>
                                </RoomDetailsEnter>
                            </RoomDetailsBottom>
                        </RoomDetails>
                    </NonEmptyRoom>
                </>

            }


        </RoomContainer>
    );
}
export const RoomContainer = styled.div`
    display: flex;
    grid-column-start: 1;
    grid-column-end: 3;
    width: 100%;
    height: 100%;
    background-color: transparent;
    justify-content: center;
`
export const EmptyRoom = styled.div`
    width: 996px;
    height: 440px;
    background: #394254;
    border-radius: 20px;
    position: relative;
    margin-bottom: 133px;
`
export const EmptyImgDiv = styled.div`
    width: 104px;
    height: 104px;
    position: absolute;
    left: calc(50% - 104px/2);
    top: 118px;
`
export const EmptyDescDiv = styled.div`
    position: absolute;
    width: 510px;
    height: 110px;
    left: 243px;
    top: 248px;
`
export const EmptyDesc = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 165.02%;
    text-align: center;
    color: #BEBEBE;
`
export const NonEmptyRoom = styled.div`
    width: 996px;
    height: 440px;
    position: relative;
    margin-bottom: 133px;
    display: flex;
    justify-content: space-between;
`

export const RoomList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    gap: 16px;
    overflow-y: scroll;
`
export const RoomDetails = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 486px;
    height: 440px;
    background: #F9F9FA;
    border-radius: 20px;
    row-gap: 46px;

`
export const RoomCard = styled.div`
    /* display: flex;
    flex-direction : column; */
    background: linear-gradient(252.91deg, #00C4BD 0%, #267F82 20.31%, #394254 38.54%);
    border-radius: 20px;
    width: 443px;
    height: 167px;
    overflow : hidden;
    cursor: pointer;
    flex-grow: 0;
    flex-shrink: 0;
    background-image : url(
        ${(props) => { return getBgImg(props.language) }}
    );
`
export const RoomCardBgImg = styled.img`
    position: relative;
    top: -160px;
    width: 198px;
    height: 177.44px;
    left: 280px;
    
`
export const CardTop = styled.div`
    /* flex: 1; CardTop이 남은 공간을 차지하도록 설정 */
    display: flex;
    align-items: center; /* 세로 방향으로 가운데 정렬 */
    margin: 0 auto;
    width: calc(100% - 54px);
`
export const CardTitle = styled.div`
    position: relative;
    top: 22px;
    width: 250px;
    height: 67px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #FFFFFF;
`

export const CardBottom = styled.div`
    display: flex;
    align-items: center; /* 세로 방향으로 가운데 정렬 */
    justify-content: space-between;
    color: #FFFFFF;
    margin: 43px auto 22px;
    width: calc(100% - 54px);
    
`

export const LanguageIconDiv = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    background-image : url(
        ${(props) => { return getLangIcon(props.language) }}
    );
`
export const LanguageIconSpan = styled.span`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    background-image : url(
        ${(props) => { return getLangIcon(props.language) }}
    );
`

export const LanguageDesc = styled.div`
    width: 112px;
    height: 20px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: #FFFFFF;
`

export const LanguageWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const RoomEnterMemberWrap = styled.div`
    gap: 8px;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
`

export const RoomEnterMamberNum = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: right;
    color: #FFFFFF;
`

export const RoomDetailsTitle = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 140%;
    color: #464646;
    margin-top: 50px;
    margin-left: 48px;
    margin-right: 87px;
`
export const RoomDetailsDesc = styled.div`
    display: flex;
    flex-direction: column;
    row-gap : 17px;
    margin-left: 48px;
    
`

export const RoomDetilasDescP = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    /* 흰바탕 글 */
    color: #464646;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`
export const RoomDetailsEnter = styled.div`
    width: calc(100% - 85px);
    margin:12px auto 0px;
    display: flex;
    justify-content: end;
    
`
export const RoomDetailsTop = styled.div`
    width: 100%;
    height: 120px;
`
export const RoomDetailsBottom = styled.div`
    flex : 1;
    width: 100%;
    gap: 10px;
`
export const RoomEnterButton = styled.button`
    align-items: center;
    text-align: center;
    color: #464646;
    background: #00F0FF;
    border-radius: 52px;
    width: 152px;
    height: 48px;
    border : none;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 80%;
`
export default MainRoom