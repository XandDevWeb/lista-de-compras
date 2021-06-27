const sectionChildrens =
  Array.from( document.querySelectorAll("main section > div") )

const resize = div => {
  const width = window.getComputedStyle(div).getPropertyValue("width")
  div.style.setProperty( "height", width )
}

const resizeDivs = () =>
  sectionChildrens.forEach(resize)

window.addEventListener("load", resizeDivs)
window.addEventListener("resize", resizeDivs)