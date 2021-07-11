const trash = document.querySelector("[data-js='trash']")
const refresh = document.querySelector("[data-js='refresh']")
const buttonPrintList = document.querySelector("[data-js='print']")

const main = document.querySelector("main")
const ol = document.querySelector("main ol")

const idListToOpen = Number( localStorage.getItem("listToOpen") )
const list = getItemStorage("listaDeCompras")

const arrayList = list.filter( object => object.id === idListToOpen )
const currentList = arrayList[0]

const showError = () => {
    const p = document.createElement("p")

    p.setAttribute( "class", "alert-empty" )
    p.textContent = "Nenhuma lista foi selecionada, volte à home e escolha uma."

    main.appendChild(p)
}

const createLi = text => {
  const span = document.createElement("span")
  const li = document.createElement("li")

  span.setAttribute("class", `${text[1]}`)
  li.setAttribute("class", `${text[1]}`)
  li.textContent = text[0]
  
  span.appendChild(li)
  ol.appendChild(span)
}

const createH2 = text => {
  const h2 = document.createElement("h2")

  h2.textContent = text

  main.insertBefore( h2, ol )
}

const showList = () => {
  createH2( currentList.title )
  currentList.list.forEach( text => createLi(text) )
}

currentList.title ? showList() : showError()

const deleteList = () => {
  const confirmDeletion = confirm("Realmente deseja excluir esta lista?")

  if ( ! confirmDeletion )
  {
    return
  }
  const stringfyObject = JSON.stringify(arrayList[0])

  const index = list.indexOf(stringfyObject)
  list.splice(index, 1)

  setItemStorage("listaDeCompras", list)
  open("./index.html", "_self")
}

const updateList = () =>
  open("./editalista.html", "_self")

//const getSizeUnit = unit => window[`inner${unit}`] - 60

const removeMore = newWindow => {
  const elementsRemove = [
    newWindow.document.querySelector("label[for='open-more']"),
    newWindow.document.querySelector("input#open-more"),
    newWindow.document.querySelector("div.more")
  ]

  elementsRemove.forEach( element => element.remove() )
}

const toggleClassesStorage = element => {
  const stringList = localStorage.getItem("listaDeCompras")
  
  const stringSearchEmpty = `["${element.innerText}",""]`
  const stringSearchClass = `["${element.innerText}","disable"]`
  
  const replaceClass = (search, className) => stringList.replace(search, className)
  
  console.log(stringList)
  console.log(stringSearchEmpty)
  console.log(stringSearchClass)

  if ( stringList.includes( stringSearchEmpty ) )
  {
    localStorage.setItem("listaDeCompras", replaceClass(stringSearchEmpty, stringSearchClass))
  }

  if ( stringList.includes( stringSearchClass ) )
  {
    localStorage.setItem("listaDeCompras", replaceClass(stringSearchClass, stringSearchEmpty))
  }
}

const toggleClasses = (element, parentElement) => {
  element.classList.toggle("disable")
  parentElement.classList.toggle("disable")
  toggleClassesStorage(element)
}

const disabledItem = event => {
  const nameElement = event.target.nodeName
  const clickedElement = event.target
  const parentElement = event.target.parentNode

  nameElement === "LI"
    ? toggleClasses(clickedElement, parentElement)
    : false
}

ol.addEventListener("dblclick", disabledItem)

trash.addEventListener("click", deleteList)
refresh.addEventListener("click", updateList)
//buttonPrintList.addEventListener("click", printList)