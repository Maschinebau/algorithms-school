import { render, screen } from "@testing-library/react"
import { StringComponent } from "./string"
import { BrowserRouter } from "react-router-dom"
import { reverseString } from "./reverseString"

const setDynamicIndexes = jest.fn()
const setRevInputVal = jest.fn()
const setModIndexes = jest.fn()
const setIsPending = jest.fn()
const isMounted = { current: true }
const delay = 0

describe("StringComponent", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
  })

  it("renders input field and button correctly", () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const inputField = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /Развернуть/i })
    expect(inputField).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it("reverse odd string correctly", async () => {
    const inputArr = "hello".split("")
    const expectedArr = inputArr.reverse()
    await reverseString(
      inputArr,
      delay,
      setIsPending,
      setDynamicIndexes,
      setRevInputVal,
      setModIndexes,
      isMounted
    )
    expect(inputArr).toEqual(expectedArr)
  })

  it("reverse even string correctly", async () => {
    const inputArr = "hellow".split("")
    const expectedArr = inputArr.reverse()
    await reverseString(
      inputArr,
      delay,
      setIsPending,
      setDynamicIndexes,
      setRevInputVal,
      setModIndexes,
      isMounted
    )
    expect(inputArr).toEqual(expectedArr)
  })

  it("reverse with one symbol correctly", async () => {
    const inputArr = "h"
    const expectedArr = "h"
    await reverseString(
      inputArr,
      delay,
      setIsPending,
      setDynamicIndexes,
      setRevInputVal,
      setModIndexes,
      isMounted
    )
    expect(inputArr).toEqual(expectedArr)
  })

  it("reverse empty array correctly", async () => {
    const inputArr = []
    await reverseString(
      inputArr,
      delay,
      setIsPending,
      setDynamicIndexes,
      setRevInputVal,
      setModIndexes,
      isMounted
    )
    expect(inputArr).toEqual([])
  })
})
