const parsedObject = {}
let insideParsedObj

const ratingDictionary = {
  'Книга очень понравилась!"': 5,
  'Книга понравилась': 4,
  'Нейтральная оценка': 3,
  'Книга не понравилась': 2,
  // TODO: добавить для единицы
  'Без оценки': 0
}

const startParse = () => {
  const table = document.querySelector('body tbody')
  const rows = table.querySelectorAll('tr')

  for (const row of rows) {
    let year
    let month

    if (row.firstChild.attributes?.colspan) {
      insideParsedObj = parsedObject

      const date = row.innerText.split(' ').slice(0, 2)
      month = date[0]
      year = date[1]

      if (!parsedObject.hasOwnProperty(year)) {
        parsedObject[year] = {}
      }
  
      insideParsedObj = parsedObject[year]
  
      if (!parsedObject.hasOwnProperty(month)) {
        insideParsedObj[month] = []
      }

      insideParsedObj = insideParsedObj[month]
      insideParsedObj
    } else {
      const container = row.querySelector('td[width="400"]')
      const rating = ratingDictionary[row.querySelector('td[width="20"] .rating').attributes.title.value]
      const [bookName, bookAuthor] = container.innerText.split('\n')

      insideParsedObj.push({
        bookName,
        bookAuthor,
        rating
      })
    }
    // if (row.firstChild.attributes)
  }
  
  const parsedBooksJSON = JSON.stringify(parsedObject)
  console.log(parsedObject)
}

window.addEventListener('DOMContentLoaded', startParse)
