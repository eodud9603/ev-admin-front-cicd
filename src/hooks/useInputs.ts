import { ChangeEvent, useCallback,  useState } from 'react';

/**
 * * multi input custom hook
 */
const useInputs = <T,>(object: T) => {
  const [input, setInputs] = useState(object);

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
