/** * 잠금여부 체크 후, 잠금 해지상태일 경우 promise callback 함수 실행
 * @description 여러 함수에 적용 시, 함수별 별도의 locked 상태를 갖기 위해 클로저 함수로 반영
 */
export const lock = (callBack: () => Promise<void>) => {
  let locked = false;

  return () => {
    if (locked) {
      return;
    }

    locked = true;
    callBack()
      .then(() => {
        locked = false;
      })
      .catch(() => {
        locked = false;
      });
  };
};
