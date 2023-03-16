import { isEqual } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

/**
 * * multi input custom hook
 */
const useInputs = <T,>(object: T) => {
  const initialProps = useRef(object);
  const [input, setInputs] = useState(object);

  /* initial props가 변경됐을 경우, initial props 업데이트 */
  useEffect(() => {
    const isInitialPropsEqual = isEqual(initialProps.current, object);
    if(isInitialPropsEqual) {
      return;
    }

    initialProps.current = object;
    setInputs(object);
  }, [object]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    /* 값 업데이트 */
    setInputs((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setInputs(object), [object]);

  return {
    ...input,
    onChange,
    reset,
  };
};

export default useInputs;
