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
  li.textContent = text
  
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
  const stringfyObject = JSON.stringify(arrayList[0])

  const index = list.indexOf(stringfyObject)
  list.splice(index, 1)

  setItemStorage("listaDeCompras", list)
  open("./index.html", "_self")
}

const updateList = () =>
  open("./editalista.html", "_self")

const getSizeUnit = unit => window[`inner${unit}`] - 60

const removeMore = newWindow => {
  const elementsRemove = [
    newWindow.document.querySelector("label[for='open-more']"),
    newWindow.document.querySelector("input#open-more"),
    newWindow.document.querySelector("div.more")
  ]

  elementsRemove.forEach( element => element.remove() )
}

const printList = () => {
  const windowPrint = window
    .open(
      "",
      "",
      `width=${getSizeUnit("Width")},height=${getSizeUnit("Height")}`
    )

  windowPrint.document.write(
    ` <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${currentList.title}</title>
        <link rel="stylesheet" type="text/css" href="./css/list.css">
        </head>
        <body>
          ${main.innerHTML}
        </body>
        </html>
    `)

    removeMore(windowPrint)
    windowPrint.print()
    windowPrint.close()
}

trash.addEventListener("click", deleteList)
refresh.addEventListener("click", updateList)
buttonPrintList.addEventListener("click", printList)