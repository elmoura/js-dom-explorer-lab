import "./css/index.css"
import IMask from "imask"

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

const securityCode = document.getElementById("security-code")
const securityCodePattern = { mask: "0000" }
const maskedSecurityCode = IMask(securityCode, securityCodePattern)

const expirationDate = document.getElementById("expiration-date")
const minYear = new Date().getFullYear().toString().slice(2)
const maxYear = (parseInt(minYear) + 10).toString()
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: minYear,
      to: maxYear,
    },
  },
}
const maskedExpirationDate = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.getElementById("card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      cardType: "visa",
      regex: /4\d{0,15}/g,
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "mastercard",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/g,
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )

    return foundMask
  },
}
const maskedCardNumber = IMask(cardNumber, cardNumberPattern)

globalThis.setCardType = setCardType
