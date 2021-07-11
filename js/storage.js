// MODELAR LOCALSTORAGE NA PRIMEIRA VISITA

const listaDeCompras = localStorage.getItem( "listaDeCompras" )
const theme = localStorage.getItem( "theme" )
const lastId = localStorage.getItem( "lastId" )
const listToOpen = localStorage.getItem( "listToOpen" )

listaDeCompras
    ? false
    : localStorage.setItem("listaDeCompras", "[]")

theme
    ? false
    : localStorage.setItem("theme", "light-theme")

lastId
    ? false
    : localStorage.setItem("lastId", "0")

listToOpen
    ? false
    : localStorage.setItem("listToOpen", "")


// MANIPULAÇÃO DO ARMAZENAMENTO LOCAL

const getItemStorage = (item, number) => {
  const itemStorage = localStorage.getItem(item)

  const returnValue = itemStorage
    ? JSON.parse( localStorage.getItem(item) )
    : false

  return number && returnValue
    ? Number( returnValue )
    : returnValue || false
}

const setItemStorage = ( key, value ) => {
  const item = JSON.stringify( value )

  localStorage.setItem( key, item )
}

// FUNÇÃO RESPONSÁVEL POR SALVAR AS LISTAS

const saveList = list => {
  const listStorage = getItemStorage( "listaDeCompras" )

  listStorage.push( list )
  setItemStorage( "listaDeCompras", listStorage )
}

// FUNÇÃO RESPONSÁVEL POR SETAR VALOR DO ÚLTIMO ID

const incrementId = () => {
  const lastId = Number( getItemStorage("lastId") )
  setItemStorage("lastId", lastId + 1)
}

// FUNÇÃO RESPONSÁVEL POR OBTER O ÚLTIMO ID

const getId = () => {
  incrementId()

  return Number( getItemStorage("lastId") )
}

// FUNÇÃO RESPONSÁVEL POR OBTER O ID DA LISTA A SER ABERTA

const getListId = () => Number( getItemStorage("listToOpen") )