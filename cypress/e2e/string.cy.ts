/// <reference types="cypress" />
import { DELAY_IN_MS } from "../../src/constants/delays"
import { BASE_TEST_URL } from "../../src/constants/tests"

describe("String", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${BASE_TEST_URL}recursion`)
    cy.get('[data-testid="inputValue"]').as("input")
  })

  it("button inactive if input is clean", () => {
    cy.contains("button", "Развернуть").should("be.disabled")
    cy.get("@input").type("Text")
    cy.get("@input").should("have.value", "Text")
    cy.contains("button", "Развернуть").should("be.enabled")
    cy.get("@input").clear()
    cy.get("@input").should("have.value", "")
    cy.contains("button", "Развернуть").should("be.disabled")
  })

  it("string reverse and circle rendering", () => {
    const inputStr = "Hello"
    const reversedStr = inputStr.split("").reverse().join("")
    const delay = DELAY_IN_MS * inputStr.length

    cy.get("@input").type(inputStr)
    cy.contains("button", "Развернуть").should("be.enabled").click()

    cy.wait(delay)
    cy.get("ul")
      .find(".text_type_circle")
      .should("have.length", inputStr.length)
      .each(($circle, index) => {
        const char = reversedStr[index]
        cy.wrap($circle).should("contain.text", char)
      })
  })

  it("string reverse correctly and apply styles frame by frame", () => {
    const circle = 'div[class*="circle_circle"]'

    cy.get("@input").type("Hello")
    cy.contains("button", "Развернуть").click()

    cy.get(circle).eq(0).should("have.text", "H").and("have.css", "border-color", "rgb(210, 82, 225)") // переходный цвет
    cy.get(circle).eq(-1).should("have.text", "o").and("have.css", "border-color", "rgb(210, 82, 225)")
    cy.get(circle).eq(0).should("have.text", "o").and("have.css", "border-color", "rgb(127, 224, 81)") // активный цвет
    cy.get(circle).eq(-1).should("have.text", "H").and("have.css", "border-color", "rgb(127, 224, 81)")

    cy.get(circle).eq(1).should("have.text", "e").and("have.css", "border-color", "rgb(210, 82, 225)")
    cy.get(circle).eq(-2).should("have.text", "l").and("have.css", "border-color", "rgb(210, 82, 225)")
    cy.get(circle).eq(1).should("have.text", "l").and("have.css", "border-color", "rgb(127, 224, 81)")
    cy.get(circle).eq(-2).should("have.text", "e").and("have.css", "border-color", "rgb(127, 224, 81)")

    cy.get(circle).eq(2).should("have.text", "l").and("have.css", "border-color", "rgb(210, 82, 225)")
    cy.get(circle).eq(2).should("have.text", "l").and("have.css", "border-color", "rgb(127, 224, 81)")
  })
})
