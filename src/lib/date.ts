import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

export enum DatePattern {
  DateTime = "YYYY-MM-DD HH:mm:ss",
  Date = "YYYY-MM-DD",
  Time = "HH:mm:ss",
}

export const formatDate = (
  date: Date,
  pattern: string,
  defaultReturn = "-",
): string => {
  if (!date) return defaultReturn;
  return dayjs(date).format(pattern);
};

export const daysFromNow = (date: Date): string => {
  if (!date) return "-";

  const now = dayjs();
  return dayjs(date).from(now);
};
