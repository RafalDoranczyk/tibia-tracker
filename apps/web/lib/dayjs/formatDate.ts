import { dayjs } from "@/lib/dayjs/dayjs";

export const formatDate = (date: string, locale = "en") => {
  const d = dayjs(date).locale(locale);

  if (!d.isValid()) {
    throw new Error(`Invalid date passed to formatDate: ${date}`);
  }

  const now = dayjs().locale(locale);

  return d.isSame(now, "year") ? d.format("MMM D") : d.format("MMM D, YY");
};
