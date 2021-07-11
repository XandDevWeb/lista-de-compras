// FUNÇÃO PARA A CRIAÇÃO DE TAGS

const createElement = ( elementName, attributes, text ) => {
  const element = document.createElement( elementName )

  attributes.forEach(
    ([attribute, value]) => element.setAttribute( attribute, value )
  )
  element.textContent = text

  return element
}

// ATRIBUTOS DAS TAGS A SEREM CRIADAS

const inputTag = [
  ["type", "text"],
  ["name", "item"],
  ["placeholder", "novo item"]
]

const pTag = [
  ["class", "alert-empty"]
]

const aTag = [
  [ "href", "./novalista.html" ],
  [ "target", "_self" ]
]

// MANIPULAÇÃO DE DATA

const formatUnit = unit => unit < 10 ? `0${unit}` : unit

const getDate = () => {
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${formatUnit(day)} / ${formatUnit(month)} / ${formatUnit(year)}`
}