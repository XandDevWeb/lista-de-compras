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
    "--background-theme"
]

const colorsDark = [ "#3c1800", "#555555", "#48392e", "#ffffff", "#eeeeee", "#e2e2e2", "#000000" ]

const setProperty = ( property, index ) =>
    tagHtml.style.setProperty( property, colorsDark[ index ] )

const setThemeAplication = () => {
    const themes = {
        "light-theme": () => tagHtml.style = "",
        "dark-theme": () => propertys.forEach(setProperty)
    }
    const theme = localStorage.getItem( "theme" )

    themes[theme] ? themes[theme]() : false

    lightSwitch.className = `switch ${theme}`
    theme === "dark-theme" ? inputTheme.checked = true : false
}

const setThemeStorage = theme => {
    const themes = {
        "light-theme": () => localStorage.setItem( "theme", "light-theme" ),
        "dark-theme": () => localStorage.setItem( "theme", "dark-theme" )
    }
    
    themes[theme]()
    setThemeAplication()
}

const toggleTheme = () =>
    inputTheme.checked
        ? setThemeStorage("dark-theme")
        : setThemeStorage("light-theme")

inputTheme.addEventListener("change", toggleTheme)
window.addEventListener("load", setThemeAplication)