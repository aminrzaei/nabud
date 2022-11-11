import { gregorianToJalali } from "./dateConvertor";
import Duration from "./duration";

const timeCalculator = (dates) => {
  const { start: startDate, end: endDate } = JSON.parse(dates);
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();

  const [persianNowYear, persianNowMonth, persianNowDay] = gregorianToJalali(
    nowYear,
    nowMonth,
    nowDay
  );
  const nowDate = {
    year: persianNowYear,
    month: persianNowMonth,
    day: persianNowDay,
  };

  const tillNowDuration = new Duration(startDate);

  const totalDuration = new Duration(startDate);
  const totalDays = totalDuration.diff(endDate);

  let spetDays = tillNowDuration.diff(nowDate);
  let remainDays = totalDays - spetDays;
  let spentPercentage = Math.floor((spetDays / totalDays) * 100);
  let remainPercentage = 100 - spentPercentage;
  if (startDate.year > nowDate.year) {
    return {
      spent: 0,
      total: 730,
      remain: 730,
      spentPercentage: 0,
      remainPercentage: 100,
    };
  }
  if (remainDays < 0) {
    remainDays = 0;
    spetDays = totalDays;
    remainPercentage = 0;
    spentPercentage = 100;
  }
  return {
    spent: spetDays,
    total: totalDays,
    remain: remainDays,
    spentPercentage,
    remainPercentage,
  };
};

export default timeCalculator;
