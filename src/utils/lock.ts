import { debounce } from "lodash";

/** * 잠금여부 체크 후, 잠금 해지상태일 경우 promise callback 함수 실행
 * @description 여러 함수에 적용 시, 함수별 별도의 locked 상태를 갖기 위해 클로저 함수로 반영
 * @description debounce는 호출시 지정된 시간 이후 호출된 가장 마지막 이벤트만 실행되는 기술
 *
 * @param callback 실행 시킬 함수
 * @param time debounce 시간 (api 호출 과부하를 방지, 밀리세컨드)
 *
 */
export const lock = <T,>(
  callback: (params?: T) => void | Promise<void>,
  time = 300
) => {
  let locked = false;

  return debounce((params?: T) => {
    if (locked) {
      return;
    }

    locked = true;

    const promise = callback(params);
    void Promise.all([promise])
      .then(() => {
        locked = false;
      })
      .catch(() => {
        locked = false;
      });
  }, time);
};
