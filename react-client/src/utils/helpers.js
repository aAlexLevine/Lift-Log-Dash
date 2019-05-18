export const MDYYformat = (d) => {
  const dayNames = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
  }
  const date = new Date(d)
  const day = date.getDate()
  const dayName = date.getDay()
  const month = date.getMonth()
  let year = date.getFullYear().toString()
  year = year.slice(year.length  - 2)
  const dateFormat = `${dayNames[dayName]} ${month + 1}.${day}.${year}` 
  
  return dateFormat
}

export const MDformat = (d) => {
  let withYear = MDYYformat(d)
  return withYear.slice(0, withYear.length - 3)
}

export const YYYYMMDDformat = (d) => {
  const date = new Date(d)
  const day = date.getDate()
  const month = date.getMonth()
  let year = date.getFullYear().toString()
  const dateFormat = `${year}-${month + 1}-${day}` 
  
  return dateFormat
}
