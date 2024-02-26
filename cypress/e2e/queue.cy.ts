/// <reference types="cypress" />
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { BASE_TEST_URL } from "../../src/constants/tests"

describe("Queue", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${BASE_TEST_URL}queue`)
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

  it("add elements in the tail", () => {
    const numbers = ["11", "22", "33"]
    let i = 0
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
      cy.get("ul").find(".text_type_circle").eq(i).should("contain.text", number)
      cy.wait(SHORT_DELAY_IN_MS)
      i++
    }
  })

  it("delete elements in head", () => {
    const numbers = ["11", "22", "33"]
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
      cy.wait(SHORT_DELAY_IN_MS)
    }
    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").first().should("contain.text", "")
    cy.get("ul").find(".text_type_circle").eq(1).should("contain.text", "22")
    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").eq(1).should("contain.text", "")
    cy.get("ul").find(".text_type_circle").eq(2).should("contain.text", "33")
    cy.contains("button", "Удалить").click()
    cy.get("ul").find(".text_type_circle").eq(2).should("contain.text", "")
    cy.get("ul")
      .find(".text_type_circle")
      .each(($circle) => {
        cy.wrap($circle).should("have.text", "")
      })
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

  it("button clear queue", () => {
    const numbers = ["11", "22", "33"]
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
      cy.wait(SHORT_DELAY_IN_MS)
    }
    cy.contains("button", "Очистить").click()
    cy.get("ul")
      .find(".text_type_circle")
      .each(($circle) => {
        cy.wrap($circle).should("have.text", "")
      })
  })

  it("cannot add more than eight circles", () => {
    const numbers = ["11", "22", "33", "11", "22", "33", "11"]
    for (let number of numbers) {
      cy.get("@input").type(number)
      cy.get("@submit").click()
      cy.wait(SHORT_DELAY_IN_MS)
    }
    cy.get("@input").type("text")
    cy.get("@submit").should("be.disabled")
  })
})
