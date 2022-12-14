function getWeekOfYear(date) {
  // Create a copy of this date object

  // ISO week date weeks start on monday, so correct the day number
  const dayNr = (date.getDay() + 6) % 7

  // Set the target to the thursday of this week so the
  // target date is in the right year
  date.setDate(date.getDate() - dayNr + 3)

  // ISO 8601 states that week 1 is the week with january 4th in it
  const jan4 = new Date(date.getFullYear(), 0, 4)

  // Number of days between target date and january 4th
  const dayDiff = (date - jan4) / 86400000

  if (new Date(date.getFullYear(), 0, 1).getDay() < 5) {
    // Calculate week number: Week 1 (january 4th) plus the
    // number of weeks between target date and january 4th
    return 1 + Math.ceil(dayDiff / 7)
  }
  // jan 4th is on the next week (so next week is week 1)
  return Math.ceil(dayDiff / 7)
}

export default getWeekOfYear
