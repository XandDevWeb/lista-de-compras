const form = document.querySelector("form")
const buttonAddItem = document.querySelector("div.items button")

const addInputItem = () => {
  const input = document.createElement("input")

  input.setAttribute( "type", "text" )
  input.setAttribute( "name", "item" )
  input.setAttribute( "placeholder", "novo item" )

  const divItem = buttonAddItem.parentNode
  divItem.insertBefore( input, buttonAddItem )
}

const getInputValues = () => {
  const inputs = Array.from( document.querySelectorAll("input[name='item']") )

  return inputs
    .map( input => input.value )
    .filter( value => Boolean( value ) )
}

const getId = () => {
  incrementId()

  return Number( localStorage.getItem("lastId") )
}

const formatUnit = unit => unit < 10 ? `0${unit}` : unit

const getDate = () => {
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${formatUnit(day)} / ${formatUnit(month)} / ${formatUnit(year)}`
}

const getList = event => {
  event.preventDefault()
  
  const title = document.querySelector("input[name='title']").value
  const inputValues = getInputValues()
  
  const newList = {
    "id": getId(),
    "title": title,
    "list": inputValues,
    "date": getDate()
  }
  
  form.reset()

  saveList( newList )
  open("./index.html", "_self")
}

buttonAddItem.addEventListener("click", addInputItem)
form.addEventListener("submit", getList)