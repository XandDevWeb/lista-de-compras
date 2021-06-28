const form = document.querySelector("form")
const divItems = document.querySelector("div.items")
const buttonAddItem = document.querySelector("div.items button")
const inputTitle = document.querySelector("input[name='title']")

const list = getItemStorage("listaDeCompras")

const idListToOpen = Number( localStorage.getItem("listToOpen") )
const arrayList = list.filter( object => object.id === idListToOpen )
const currentList = arrayList[0]

const addInputItem = () => {
  const input = document.createElement("input")

  input.setAttribute( "type", "text" )
  input.setAttribute( "name", "item" )
  input.setAttribute( "placeholder", "novo item" )

  const divItem = buttonAddItem.parentNode
  divItem.insertBefore( input, buttonAddItem )
}

const addInputItemWithValue = value => {
  const input = document.createElement("input")
  
  input.setAttribute( "type", "text" )
  input.setAttribute( "name", "item" )
  input.setAttribute( "placeholder", "novo item" )
  input.setAttribute( "class", `${value[1]}` )
  input.setAttribute( "value", `${value[0]}` )

  console.log(value)
  
  const divItem = buttonAddItem.parentNode
  divItem.insertBefore( input, buttonAddItem )
}

const preparePage = () => {
  inputTitle.value = currentList.title
  
  currentList.list.forEach( text => addInputItemWithValue(text) );
}

const getListId = () => Number( localStorage.getItem("listToOpen") )

const formatUnit = unit => unit < 10 ? `0${unit}` : unit

const getDate = () => {
  const date = new Date()

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${formatUnit(day)} / ${formatUnit(month)} / ${formatUnit(year)}`
}

const getInputValues = () => {
  const inputs = Array.from( document.querySelectorAll("input[name='item']") )

  return inputs
    .map( input => [input.value, input.className] )
    .filter( classAndValue => Boolean( classAndValue[0] ) ? classAndValue : false )
}

const getNewValues = () => {

  const title = inputTitle.value
  const inputValues = getInputValues()
  console.log(inputValues)
  return ({
    "id": getListId(),
    "title": title,
    "list": inputValues,
    "date": getDate()
  })
}

const toUpdateList = event => {
  event.preventDefault()

  const newValuesList = JSON.stringify( getNewValues() )
  const stringfyObject = JSON.stringify(arrayList[0])

  const stringifyList = JSON.stringify( list )

  const replacedList = stringifyList.replace( stringfyObject, newValuesList )

  localStorage.setItem("listaDeCompras", replacedList)

  open("./lista.html", "_self")
}

const removeInput = event => {
  const clickedElement = event.target

  
  if ( clickedElement.nodeName === "INPUT" )
  {
    clickedElement.remove()
  }
}

buttonAddItem.addEventListener("click", addInputItem)
window.addEventListener("load", preparePage)
form.addEventListener("submit", toUpdateList)
divItems.addEventListener("dblclick", removeInput)