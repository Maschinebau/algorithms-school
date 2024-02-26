/// <reference types="cypress" />

import { HOMEPAGE_URL } from "../../src/constants/tests"

describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.viewport(1920, 1080)
    cy.visit(HOMEPAGE_URL)
    cy.contains("МБОУ АЛГОСОШ")
  })
})

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.viewport(1920, 1080)
    cy.visit(HOMEPAGE_URL)
  })

  it("string page opened", () => {
    cy.get('a[href*="/recursion"]').click()
    cy.url().should("include", "/recursion")
    cy.contains("Строка")
  })

  it("sorting page opened", () => {
    cy.get('a[href*="/sorting"]').click()
    cy.url().should("include", "/sorting")
    cy.contains("Сортировка массива")
  })

  it("fibonacci page opened", () => {
    cy.get('a[href*="/fibonacci"]').click()
    cy.url().should("include", "/fibonacci")
    cy.contains("Последовательность Фибоначчи")
  })

  it("stack page opened", () => {
    cy.get('a[href*="/stack"]').click()
    cy.url().should("include", "/stack")
    cy.contains("Стек")
  })

  it("queue page opened", () => {
    cy.get('a[href*="/queue"]').click()
    cy.url().should("include", "/queue")
    cy.contains("Очередь")
  })
  
  it("list page opened", () => {
    cy.get('a[href*="/list"]').click()
    cy.url().should("include", "/list")
    cy.contains("Связный список")
  })
})
