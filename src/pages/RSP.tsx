import React from "react";
import { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
} as const;

// as const 값을 고정시켜준다.
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
} as const;

// typeof, keyof typeof
type imgCoords = (typeof rspCoords)[keyof typeof rspCoords];

// !를 붙여서 unfinded가 안나오게 한다.
const computerChoice = (imgCoords: imgCoords) => {
  // 강제 형변환
  return (Object.keys(rspCoords) as ["바위", "가위", "보"]).find((k) => {
    return rspCoords[k] === imgCoords;
  })!;
};

const RSP = () => {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [imgCoords, setImgCoord] = useState<imgCoords>(rspCoords.바위);
  const interval = useRef<number>();

  useEffect(() => {
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgCoords]);

  const changeHand = () => {
    if (imgCoords === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoords === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoords === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice: keyof typeof rspCoords) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoords)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((score) => score + 1);
    } else {
      setResult("졌습니다!");
      setScore((score) => score - 1);
    }
    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords}`,
        }}
      ></div>
      <div>
        <button
          id="rock"
          className="btn"
          onClick={() => {
            onClickBtn("바위");
          }}
        >
          바위
        </button>
        <button
          id="scissor"
          className="btn"
          onClick={() => {
            onClickBtn("가위");
          }}
        >
          가위
        </button>
        <button
          id="paper"
          className="btn"
          onClick={() => {
            onClickBtn("보");
          }}
        >
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
