import updateLocale from "dayjs/plugin/updateLocale";
import ru from "dayjs/locale/ru";

const DEFAULT = "default";
const dayjs = useDayjs();
dayjs.locale(ru);
dayjs.extend(updateLocale);

const timeSuffix = (number, array) => {
  const lustNumber = number % 10;

  if (number >= 11 && number <= 14) {
    return `${number} ${array[2]}`;
  }

  if (lustNumber === 1) {
    return `${number} ${array[0]}`;
  } else if (lustNumber >= 2 && lustNumber <= 4) {
    return `${number} ${array[1]}`;
  } else {
    return `${number} ${array[2]}`;
  }
};

dayjs.updateLocale("ru", {
  relativeTime: {
    m: (number, withoutSuffix, key, isFuture) => {
      return timeSuffix(number, ["минута", "минуты", "минут"]);
    },
    mm: (number, withoutSuffix, key, isFuture) => {
      return timeSuffix(number, ["минута", "минуты", "минут"]);
    },
    h: (number, withoutSuffix, key, isFuture) => {
      return timeSuffix(number, ["минута", "минуты", "минут"]);
    },
    hh: (number, withoutSuffix, key, isFuture) => {
      return timeSuffix(number, ["час", "часа", "часов"]);
    },
  },
});

const FORMAT = {
  DEFAULT: "DD.MM.YY HH:mm",
  TIME_LOCALE: "HH mm",
  HISTORY: "DD MMMM YYYY",
  YEAR: "YYYY",
};

const date = {
  toTimeLocale: (str) => {
    const hours = dayjs(str).format("HH");
    const minutes = dayjs(str).format("mm");
    const timeNow = dayjs();
    const timeMinusHours = timeNow.subtract(hours, "hour");
    const timeMinusMinutes = timeNow.subtract(minutes, "minute");
    const formatHours = !timeNow.isSame(timeMinusHours)
      ? timeNow.to(timeMinusHours, true)
      : false;
    const formatMinutes = !timeNow.isSame(timeMinusMinutes)
      ? timeNow.to(timeMinusMinutes, true)
      : false;
    return formatHours ? `${formatHours} ${formatMinutes}` : formatMinutes;
  },
  toHistory: (str) => dayjs(str).format(FORMAT.HISTORY),
  toYear: (str) => dayjs(str).format(FORMAT.YEAR),
  [DEFAULT]: (str) => {
    const dataFromMsk = new Date(str).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
    const dt = dayjs(dataFromMsk).format(FORMAT.DEFAULT);
    return `${dt} МСК`;
  },
};

export default (str, type) => {
  return str ? useGet(date, type, useGet(date, DEFAULT))(str) : null;
};
