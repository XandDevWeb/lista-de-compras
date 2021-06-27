const section = document.querySelector("main section")

const openList = ({dataset}) => {
  localStorage.setItem( "listToOpen", `${dataset.id}` )
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

const messageContentEmpty = insertMessage => {
  const message = {
    "insert": () => {
      const p = document.createElement("p")
      const a = document.createElement("a")

      p.setAttribute( "class", "alert-empty" )
      p.textContent = "Nenhuma lista foi criada. "
      a.setAttribute( "href", "./novalista.html" )
      a.setAttribute( "target", "_self" )
      a.textContent = "Criar lista"

      p.appendChild(a)
      const main = section.parentNode
      main.insertBefore(p, section)
    },

    "remove": () => {
      const p = document.querySelector("p.alert-empty")

      p ? p.remove : false
    }
  }
  

  insertMessage ? message.insert() : message.remove()
}

const observerLists = () => {
  const lists = Array.from( document.querySelectorAll("div.list") ).length

  lists ? messageContentEmpty(false) : messageContentEmpty(true)
}

section.addEventListener("click", clickWasOnDiv)
window.addEventListener("load", observerLists)