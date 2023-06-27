// Convert timestamp to date format
export default function dateFormatter(timestamp) {
  let newTime = new Date(timestamp)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let time = `${day}/${month}/${year}`
  return time;
}
