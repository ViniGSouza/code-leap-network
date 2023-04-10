import { format, formatDistanceStrict, parseISO } from "date-fns";

export const formateDate = (dateString: string) => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffMin = Math.round((now.getTime() - date.getTime()) / 1000 / 60);

  if (diffMin < 1440) {
    return formatDistanceStrict(date, now, { addSuffix: true });
  } else {
    return format(date, 'MM-dd-yyyy');
  }
}