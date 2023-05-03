import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import format from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(format);

dayjs.locale('ko');

/** 기본 타임 포맷 */
export const standardDateFormat= (date?: string | number | dayjs.Dayjs | Date | null, format?: string) => {
    return dayjs(date).format(format ?? "YYYY-MM-DD HH:mm");
};

/** 현재날짜로 부터 특정 기간으로 시작/종료일 설정 함수 */
export const onChangeStaticDate = ({
    size,
    unit,
  }: {
    size: number;
    unit: "day" | "month";
  }) => {
    const now = dayjs();
    const startDate = now.clone().subtract(size, unit).format("YYYY-MM-DD");

    return {
      startDate,
      endDate: now.format("YYYY-MM-DD"),
    };
  };