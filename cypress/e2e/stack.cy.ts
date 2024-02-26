/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { BASE_TEST_URL } from "../../src/constants/tests"

describe("Stack", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${BASE_TEST_URL}stack`)
    cy.get('[data-testid="inputValue"]').as("input")
    cy.get('button[type="submit"]').as("submit")
  })

  it("button inactive if input is clean", () => {
    cy.contains("button", "Добавить").should("be.disabled")
    cy.get("@input").type("3124")
    cy.get("@input").should("have.value", "3124")
    cy.get("@submit").should("be.enabled")
    cy.get("@input").clear()
    cy.get("@input").should("have.value", "")
    cy.get("@submit").should("be.disabled")
  })

  it("input clears after submit", () => {
    cy.get("@input").type("3124")
    cy.get("@submit").click()
    cy.get("@input").should("have.value", "")
  })

  it("add new circles", () => {
    cy.get("@input").type("11")
    cy.get("@submit").click()
    cy.get("ul").find(".text_type_circle").last().should("contain.text", "11")
    cy.get("@input").type("22")
    cy.get("@submit").click()
    cy.get("ul").find(".text_type_circle").last().should("contain.text", "22")
  })

  it("delete all circles", () => {
    const numbers = ["11", "22", "33"]
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
    }
    cy.contains("button", "Очистить").click()
    cy.get("ul").find(".text_type_circle").should("have.length", 0)
  })

  it("delete last circle", () => {
    const numbers = ["11", "22", "33"]
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
    }

    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").last().should("contain.text", "22")
    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").last().should("contain.text", "11")
    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").should("have.length", 0)
  })

  it("apply circle styles", () => {
    cy.get("@input").type("11")
    cy.get("@submit").click()
    cy.get('div[class*="circle_circle"]')
      .should("have.text", "11")
      .and("have.css", "border-color", "rgb(210, 82, 225)")
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class*="circle_circle"]')
      .should("have.text", "11")
      .and("have.css", "border-color", "rgb(0, 50, 255)")
    cy.contains("button", "Удалить").click()
    cy.get('div[class*="circle_circle"]')
      .should("have.text", "11")
      .and("have.css", "border-color", "rgb(210, 82, 225)")
  })
})
