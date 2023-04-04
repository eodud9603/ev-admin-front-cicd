import { useCallback, useEffect, useRef, useState } from 'react';

interface ITimerProps {
  timer?: number
}

/* 기본 단위: 1초 */
const UNIT_TIME = 1000;
/* 기본 타이머 시간: 5분 */
const DEFAULT_TIME = UNIT_TIME * 60 * 5;

const useTimer = ({ timer = DEFAULT_TIME }: ITimerProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimeRef = useRef(timer);

  const [remainedTime, setRemainedTime] = useState(timer);
  const [start, setStart] = useState(false);

  const progress = start ? 'ING' : 'END';

  useEffect(() => {
    /* 타이머 종료 */
    if (remainedTime < UNIT_TIME) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setRemainedTime(0);
      return;
    }
    if (start === false) {
      /* 타이머 리셋 */
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        setRemainedTime(saveTimeRef.current);
      }
      return;
    }

    /* 타이머 실행 */
    timeoutRef.current = setTimeout(() => {
      /* 남은 시간 업데이트 */
      setRemainedTime((prev) => prev - UNIT_TIME);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }, 1000);
  }, [remainedTime, start]);

  /** * 타이머 실행 (타이머 작동 중, 재호출시, 재실행) */
  const startTimer = useCallback(() => {
    if (start) {
      setStart(false);
      setRemainedTime(saveTimeRef.current);
    }

    setStart(true);
  }, [start]);

  useEffect(() => {
    const timeoutDelegate = timeoutRef.current;

    return () => {
      if (timeoutDelegate) {
        setStart(false);
        clearTimeout(timeoutDelegate);
      }
    };
  }, []);

  /** * 타이머 종료 */
  const stopTimer = useCallback(() => setStart(false), []);

  return {
    startTimer,
    stopTimer,
    remain: remainedTime,
    progress,
  };
};

export default useTimer;
