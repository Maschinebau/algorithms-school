/// <reference types="cypress" />
import { BASE_TEST_URL } from "../../src/constants/tests"

describe("List", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`${BASE_TEST_URL}list`)
    cy.get('[data-testid="stringInput"]').as("stringInput")
    cy.get('[data-testid="numberInput"]').as("numberInput")
    cy.get('[data-testid="addHead"]').as("addHead")
    cy.get('[data-testid="addTail"]').as("addTail")
    cy.get('[data-testid="addWithIndex"]').as("addWithIndex")
    cy.get('[data-testid="delHead"]').as("delHead")
    cy.get('[data-testid="delTail"]').as("delTail")
    cy.get('[data-testid="delWithIndex"]').as("delWithIndex")
  })

  it("render initial array", () => {
    const initArr = ["2", "34", "8"]

    cy.get("ul")
      .find(".text_type_circle")
      .should("have.length", 3)
      .each(($circle, idx) => {
        cy.wrap($circle).should("have.text", initArr[idx])
      })
  })

  it("buttons inactive if inputs is clear", () => {
    cy.get("@addHead").should("be.disabled")
    cy.get("@addTail").should("be.disabled")
    cy.get("@addWithIndex").should("be.disabled")
    cy.get("@delWithIndex").should("be.disabled")

    cy.get("@stringInput").type("111")
    cy.get("@addHead").should("be.enabled")
    cy.get("@addTail").should("be.enabled")
    cy.get("@addWithIndex").should("be.disabled")
    cy.get("@delWithIndex").should("be.disabled")

    cy.get("@numberInput").type("2")
    cy.get("@addWithIndex").should("be.enabled")
    cy.get("@delWithIndex").should("be.enabled")

    cy.get("@stringInput").clear()
    cy.get("@addHead").should("be.disabled")
    cy.get("@addTail").should("be.disabled")
    cy.get("@addWithIndex").should("be.disabled")

    cy.get("@numberInput").clear()
    cy.get("@delWithIndex").should("be.disabled")
  })

  it("adds element in head", () => {
    cy.get("@stringInput").type("11")
    cy.get("@addHead").click()
    cy.get("ul").find(".text_type_circle").eq(0).should("contain.text", "11")
  })

  it("delete element from head", () => {
    cy.get("@delHead").click()
    cy.get("ul").find(".text_type_circle").eq(0).should("contain.text", "34")
  })

  it("adds element in tail", () => {
    cy.get("@stringInput").type("11")
    cy.get("@addTail").click()
    cy.get("ul").find(".text_type_circle").eq(-1).should("contain.text", "11")
  })

  it("delete element from tail", () => {
    cy.get("@delTail").click()
    cy.get("ul").find(".text_type_circle").eq(-1).should("contain.text", "34")
  })

  it("adds element with index", () => {
    cy.get("@stringInput").type("11")
    cy.get("@numberInput").type("2")
    cy.get("@addWithIndex").click()
    cy.get("ul").find(".text_type_circle").eq(2).should("contain.text", "11")
  })

  it("delete element with index", () => {
    cy.get("@numberInput").type("2")
    cy.get("@delWithIndex").click()
    cy.get("ul").find(".text_type_circle").eq(2).should("not.exist")
  })
})
