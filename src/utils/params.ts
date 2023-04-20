/** 파라미터 빈값 제거 */
export const getParams = <T,>(params: Partial<T>) => {
  for (const param in params) {
    const deleteName = param as keyof T;
    const data = params[deleteName];

    if (data === "") {
      delete params[deleteName];
    }
  }
};
