import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { standardDateFormat } from "src/utils/day";

interface IUsePaginationProps<T> {
  elements?: T[];
  totalPages?: number;
  totalElements?: number;
  emptyMessage?: string;
  defaultPage?: number;
}

interface IOnChangeProps<T> extends IUsePaginationProps<T> {
  page: number;
  emptyMessage: string;
}

interface IReturnType<T> {
  list: T[];
  page: number;
  lastPage: number;
  total: number;
  message: string;
  time: string;
}

interface IReturnFunction<T> {
  setPage: Dispatch<SetStateAction<number>>;
  reset: (data: { code?: string; message: string }) => void;
  onChange: (data: Required<Omit<IOnChangeProps<T>, "defaultPage">>) => void;
}

/**
 * * 목록 list 커스텀 훅
 *  */
const useList = <T>({
  elements = [],
  totalPages = 1,
  totalElements = 0,
  emptyMessage = "등록된 정보가 없습니다.",
  defaultPage = 1,
}: IUsePaginationProps<T>): [IReturnType<T>, IReturnFunction<T>] => {
  /* 목록 */
  const [list, setList] = useState<T[]>(elements);
  /* 현재 페이지 */
  const [page, setPage] = useState(defaultPage);
  /* 마지막 페이지 */
  const [lastPage, setLastPage] = useState(totalPages);
  /* 검색된 데이터 전체 개수 */
  const [total, setTotal] = useState(totalElements);
  /* 검색결과 메세지 */
  const [message, setMessage] = useState(emptyMessage);
  /* 검색시간 */
  const [time, setTime] = useState(standardDateFormat());

  /** 목록 정보 초기화 */
  const reset = useCallback(
    ({ code, message }: { code?: string; message: string }) => {
      /** 이전 호출된 api 취소 후, 재요청 code 무시 */
      if (code === "ERR_CANCELED") {
        return;
      }

      setPage(1);
      setList([]);
      setLastPage(1);
      setTotal(0);
      setMessage(message || "오류가 발생하였습니다.");

      setTime(standardDateFormat());
    },
    []
  );

  /** 목록 데이터 변경 (검색 데이터 반영) */
  const onChange = useCallback(
    (data: Required<Omit<IOnChangeProps<T>, "defaultPage">>) => {
      const { page, totalElements, elements, totalPages, emptyMessage } = data;

      if (page === 0) {
        setPage(1);
      }
      if (totalElements === 0) {
        setMessage(emptyMessage || "검색된 정보가 없습니다.");
      }
      setList(elements);
      setLastPage(totalPages);
      setTotal(totalElements);

      setTime(standardDateFormat());
    },
    []
  );

  return [
    { list, page, lastPage, total, message, time },
    {
      setPage,
      reset,
      onChange,
    },
  ];
};

export default useList;
