const tagHtml = document.querySelector("html")
const inputTheme = document.querySelector("main div.settings input[type='checkbox']")
const lightSwitch = document.querySelector("main div.settings label div.button span.switch")

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

const toggleTheme = () =>
{    
    lightSwitch.classList.toggle("light-theme")
    lightSwitch.classList.toggle("dark-theme")
    
    inputTheme.checked
        ? propertys.forEach(setProperty)
        : tagHtml.style = ""
}

inputTheme.addEventListener("change", toggleTheme)