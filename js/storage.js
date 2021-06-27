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

const getItemStorage = item => {
  const itemStorage = localStorage.getItem(item)

  return itemStorage ? JSON.parse( localStorage.getItem(item) ) : false
}

const setItemStorage = ( list, value ) => {

  const items = JSON.stringify( value )
  localStorage.setItem( list, items )
}

const saveList = list => {

  const listStorage = getItemStorage( "listaDeCompras" )
  listStorage.push( list )

  setItemStorage( "listaDeCompras", listStorage )
  console.log(listStorage)
}

const incrementId = () => {
  const lastId = Number( localStorage.getItem("lastId") )
  localStorage.setItem("lastId", `${lastId + 1}`)
}