import { css } from '@emotion/react';

export const planroomStyle = css`
  .planroom {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    
  }

  .travel-title {
    font-size: 15px; 
    margin-bottom: 17px; 
    margin-top: 30px;
  }

  .map-container {
    width: 50%; 
    height: 400px; 
    background-color: lightgray; 
    position: relative; 
     
  }

  .map {
    width: 100%; 
    height: 100%; 
    background-color: gray; 
  }

  .zoom-controls {
    position: absolute; 
    bottom: 10px; 
    right: 10px; 
  }

  .zoom-button {
    margin: 0 3px; 
    padding: 4px 10px; 
  }

  .info-section {
    display: flex; 
    justify-content: space-between; 
    width: 70%; 
    margin-top: 20px; 
  }

  .location-info {
    width: 40%; 
    height: 200px; 
    border: 1px solid #ccc; 
    padding: 10px; 
    position: relative; 
    margin-right: 10px; 
  }

  .voice-chat {
    width: 27%; 
    height: 200px; 
    border: 1px solid #ccc; 
    padding: 10px;
    right: 315px; 
    position: relative; 
  }

  .section-title {
    font-size: 18px; 
    font-weight: bold; 
    margin-bottom: 5px; 
  }

  .section-description {
    font-size: 14px; 
    margin-bottom: 10px; 
  }

  .chat-options {
    display: flex; 
    gap: 8px; 
  }

  .chat-button {
    padding: 5px 10px; 
  }

  .profile {
    width: 50px; 
    height: 50px; 
    border-radius: 50%; 
    background-color: lightgray; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
  }

  .complete-button {
    margin-top: 0; 
    position: absolute; 
    top: 800px; 
    left: 6.5%; 
    padding: 11px 320px; 
    margin-left: 815px; 
    background-color: black; 
    color: white; 
    border: none; 
    border-radius: 39px; 
    cursor: pointer; 
    font-size: 14px; 
  }

  .add-route-button {
    position: absolute; 
    top: 75px; 
    right: 25px; 
    padding: 5px 25px; 
    background-color: grey; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    font-size: 12px; 
  }

  .vote-result-place {
    font-size: 10px; 
    margin-bottom: 0px; 
    margin-top: 0px;
    position: absolute; 
    right: 580px;
    top: 100px; 
  }

  .travel-route {
    font-size: 10px; 
    margin-bottom: 0px; 
    margin-top: 0px;
    position: absolute; 
    right: 285px;
    top: 100px; 
  }

  .accommodation-tag {
    position: absolute;
    top: 146px;
    left: 63%;
    transform: translateX(-50%);
    background-color: #3B3B3B;
    color: white;
    padding: 6px 130px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  .accommodation-tag2, .accommodation-tag3, .accommodation-tag4, .accommodation-tag5 {
    position: absolute;
    left: 63%;
    transform: translateX(-50%);
    background-color: #3B3B3B;
    color: white;
    padding: 6px 90px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  .accommodation-tag2 { top: 260px; }
  .accommodation-tag3 { top: 390px; }
  .accommodation-tag4 { top: 520px; }
  .accommodation-tag5 { top: 650px; }

  .accommodation-subitems {
    position: absolute;
    left: 63%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .accommodation-subitems-accommodation {
    top: 190px;
  }

  .accommodation-subitems-candidates {
    top: 300px;
  }

  .accommodation-item, .accommodation-item2, .accommodation-item3, .accommodation-item4, .accommodation-item5 {
    background-color: #9C9C9C;
    color: white;
    padding: 45px 35px;
    border-radius: 100%;
    margin-top: 10px;
    cursor: pointer;
  }
`;
