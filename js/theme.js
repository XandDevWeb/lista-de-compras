const tagHtml = document.querySelector("html")
const inputTheme = document.querySelector("header div.theme input[type='checkbox']")
const lightSwitch = document.querySelector("header div.theme label div.button span.switch")

const getPropertyValue = (element, property) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(property)

const propertys =
[
    "--background-header",
    "--background-main",
    "--background-footer",
    "--color-header",
    "--color-main",
    "--color-footer",
    "--background-theme",
    "--background-list-1",
    "--background-list-2"
]

const colorsDark = [ "#1B140B", "#666666", "#444444", "#eeeeee", "#eeeeee", "#eeeeee", "#000000", "#9e8f89", "#847570a6" ]

const setProperty = ( property, index ) =>
    tagHtml.style.setProperty( property, colorsDark[ index ] )


const themes = {
    "light-theme-aplication": () => tagHtml.style = "",
    "dark-theme-aplication": () => propertys.forEach(setProperty),
    "light-theme-storage": () => localStorage.setItem( "theme", "light-theme" ),
    "dark-theme-storage": () => localStorage.setItem( "theme", "dark-theme" )
}

const setThemeAplication = () => {
    const theme = localStorage.getItem( "theme" ) + "-aplication"

    themes[theme] ? themes[theme]() : false

    lightSwitch.className = `switch ${theme}`
    theme === "dark-theme" ? inputTheme.checked = true : false
}

const setThemeStorage = useTheme => {
    const theme = useTheme + "-storage"
    
    themes[theme]()
    setThemeAplication()
}

const toggleTheme = () =>
    inputTheme.checked
        ? setThemeStorage("dark-theme")
        : setThemeStorage("light-theme")

inputTheme.addEventListener("change", toggleTheme)
window.addEventListener("load", setThemeAplication)