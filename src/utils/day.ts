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

