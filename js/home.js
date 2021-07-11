const section = document.querySelector("main section")

const setListToOpen = id => 
  localStorage.setItem( "listToOpen", `${id}` )

const openList = ({dataset}) => {
  setListToOpen( dataset.id )
  open("./lista.html", "_self")

}

const clickWasOnNewList = element => {
  const isDivNewList = element.classList.contains("add-list")

  isDivNewList
    ? open("./novalista.html", "_self")
    : openList(element)
}

const clickWasOnDiv = event => {
  const clickedElement = event.target
  const elementName = event.target.nodeName

  elementName === "DIV"
    ? clickWasOnNewList(clickedElement)
    : false
}

const createPMessage = () => {
  const textContentP = "Nenhuma lista foi criada. "
  const textContentA = "Criar lista."

  const p = createElement("p", pTag, textContentP)
  const a = createElement("a", aTag, textContentA)
  p.appendChild(a)

  return p  
}

const message = {
  "insert": () => {
    const p = createPMessage()
    const main = section.parentNode
    
    main.insertBefore(p, section)
  },

  "remove": () => {
    const p = document.querySelector("p.alert-empty")

    p ? p.remove() : false
  }
}

const messageContentEmpty = insertMessage =>
  insertMessage ? message.insert() : message.remove()

const observerLists = () => {
  const lists = Array.from( document.querySelectorAll("div.list") ).length

  lists ? messageContentEmpty(false) : messageContentEmpty(true)
}

section.addEventListener("click", clickWasOnDiv)
window.addEventListener("load", observerLists)