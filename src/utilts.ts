export function localizeUnixTimestamp(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toLocaleDateString();
}

export function formatWorkingExperienceTimeData(data: {
  month: number;
  year: number;
}): string {

  const monthNames: Record<number, string> = {
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12: "Dec"
  }

  const { month, year } = data;
  const workingDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  return monthNames[workingDate.getMonth() + 1] + " " + workingDate.getFullYear()
}
