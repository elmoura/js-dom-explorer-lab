import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

export const setCardType = (cardType) => {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "grey"],
  }

  ccBgColor01.setAttribute("fill", colors[cardType][0])
  ccBgColor02.setAttribute("fill", colors[cardType][1])
  creditCardLogo.setAttribute("src", `cc-${cardType}.svg`)
}

window.setCardType = setCardType
