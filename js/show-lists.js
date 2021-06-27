const listStorage = getItemStorage( "listaDeCompras" )
const ol = document.querySelector("main ol")

const createDiv = list => {
  const divAddList = document.querySelector("div.add-list")
  const section = divAddList.parentNode

  const div = document.createElement("div")
  const span = document.createElement("span")

  div.setAttribute("data-id", list.id)
  div.setAttribute("class", "list")
  div.textContent = list.title
  span.textContent = list.date

  div.appendChild(span)
  section.insertBefore( div, divAddList )
}

listStorage
  ? listStorage.forEach( list => createDiv(list) )
  : false