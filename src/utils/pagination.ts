/** 페이지 넘버 리스트 리턴 */
export const getPageList = (
  currentPage = 1,
  totalPage = 1,
  pageCount = 5
): number[] => {
  const list: number[] = [];

  let pageGroup = Math.ceil(currentPage / pageCount);
  pageGroup = pageGroup <= 0 ? 1 : pageGroup;

  /* 시작, 마지막 표시 번호 */
  let lastNumber = pageGroup * pageCount;
  if (lastNumber > totalPage) {
    lastNumber = totalPage;
  }
  const firstNumber = lastNumber < pageCount ? 1 : lastNumber - (pageCount - 1);

  /* pageCount 개수만큼 표시 */
  for (let i = firstNumber; i <= lastNumber; i++) {
    list.push(i);
  }

  return list;
};
