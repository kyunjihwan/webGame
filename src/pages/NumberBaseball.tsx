import React from "react";
import { useRef, useState, useCallback } from "react";
import Try from "../components/Try";
import { TryInfo } from "../interface/types";

const getNumber = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  // 빌드 시 값 가져오기
  const [answer, setAnswer] = useState(getNumber());
  // 결과
  const [result, setResult] = useState("");
  // 입력값
  const [value, setValue] = useState("");
  // 시도 횟수
  const [tries, setTries] = useState<TryInfo[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (value === answer.join("")) {
        setTries((t) => [...t, { try: value, result: "홈런!" }]);
        setResult("홈런");
        alert("게임을 다시 실행합니다.");
        setValue("");
        setAnswer(getNumber());
        setTries([]);
        if (input) {
          input.focus();
        }
      } else {
        const answerArray = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`);
          alert("게임 다시 시작합니다.");
          setValue("");
          setAnswer(getNumber());
          setTries([]);
          if (input) {
            input.focus();
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] === answer[i]) {
              strike++;
            } else if (answer.includes(answerArray[i])) {
              ball++;
            }
          }
          setTries((t) => [
            ...t,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼입니다.`,
            },
          ]);
          setValue("");
          if (input) {
            input.focus();
          }
        }
      }
    },
    [value, answer]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );
  return (
    <>
      <div className="NumberBaseball">
        <h2>숫자 야구</h2>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
          <input
            ref={inputEl}
            value={value}
            maxLength={4}
            onChange={onChange}
          />
          <button>입력</button>
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => (
            <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default NumberBaseball;
