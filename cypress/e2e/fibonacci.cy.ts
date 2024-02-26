/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"

describe("Fibonacci", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit("http://localhost:3000/#/fibonacci")
    cy.get('[data-testid="inputValue"]').as("input")
  })

  it("button inactive if input is clean", () => {
    cy.contains("button", "Рассчитать").should("be.disabled")
    cy.get("@input").type("10")
    cy.get("@input").should("have.value", "10")
    cy.contains("button", "Рассчитать").should("be.enabled")
    cy.get("@input").clear()
    cy.get("@input").should("have.value", "")
    cy.contains("button", "Рассчитать").should("be.disabled")
  })

  it("calculate correct nums and render all circles", () => {
    const inputNum = "4"
    const length = Number(inputNum) + 1
    const delay = SHORT_DELAY_IN_MS * length
    const expectedArr = [0, 1, 1, 2, 3]

    cy.get("@input").type(inputNum)
    cy.contains("button", "Рассчитать").should("be.enabled").click()

    cy.wait(delay)
    cy.get("ul")
      .find(".text_type_circle") // Найти текстовые элементы внутри кругов
      .should("have.length", length) // Убедиться, что количество кругов соответствует длине введенной строки
      .each(($circle, index) => {
        const char = expectedArr[index]
        cy.wrap($circle).should("contain.text", char) // Проверить, что текст в круге соответствует ожидаемому символу
      })
  })
})
