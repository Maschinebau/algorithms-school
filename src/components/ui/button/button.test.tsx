import { render, fireEvent, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button component", () => {
  it("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn()
    render(<Button text="Click me" onClick={onClickMock} />)
    const button = screen.getByText("Click me")
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})

describe("Button Component Snapshot", () => {
  it("renders button with text", () => {
    const { asFragment } = render(<Button text="Click me" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders button without text", () => {
    const { asFragment } = render(<Button />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders disabled button", () => {
    const { asFragment } = render(<Button disabled />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders loader icon when isLoader prop is true", () => {
    const { asFragment } = render(<Button isLoader />)
    expect(asFragment()).toMatchSnapshot()
  })
})
