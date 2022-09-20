export default function useDate() {
  function toDate({ date, precision }): string | void {
    const d = new Date(date)
    if (precision === 'Year') return d.toLocaleString('en-US', { year: 'numeric' })
    if (precision === 'Month') return d.toLocaleString('en-US', { year: 'numeric', month: 'short' })
    if (precision === 'Day') return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    if (precision === 'Hour') return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: true,})
    if (precision === 'Minute') return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: true, })
    else return console.error('useDate does not have a precision set')
  }
  return {
    toDate,
  }
}
