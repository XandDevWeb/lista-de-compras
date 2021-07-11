const form = document.querySelector("form")
const buttonAddItem = document.querySelector("div.items button")

const addInputItem = () => {
  const input = createElement("input", inputTag)

  const divItems = buttonAddItem.parentNode
  divItems.insertBefore( input, buttonAddItem )
}

const inputValuesWithoutArray = {
  "map": input => input.value,
  "filter": value => Boolean( value ),
  "returnMap": value => [value, ""]
}

const getInputValues = objFunctions => {
  const inputs = Array.from( document.querySelectorAll("input[name='item']") )

  const inputValues = inputs
    .map( objFunctions.map )
    .filter( objFunctions.filter )

  return inputValues.map( objFunctions.returnMap )
}

const saveCurrentList = event => {
  event.preventDefault()
  
  const title = document.querySelector("input[name='title']").value
  const inputValues = getInputValues( inputValuesWithoutArray )
  
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
form.addEventListener("submit", saveCurrentList)