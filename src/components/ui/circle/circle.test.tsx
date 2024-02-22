import { render } from "@testing-library/react"
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states"

describe("Circle component snapshot", () => {
  it("renders circle without letters", () => {
    const { asFragment } = render(<Circle />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with letters", () => {
    const { asFragment } = render(<Circle letter={"hi"} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with head", () => {
    const { asFragment } = render(<Circle head={"head"} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with component in head", () => {
    const { asFragment } = render(<Circle head={<Circle />} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with tail", () => {
    const { asFragment } = render(<Circle tail={"head"} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with component in tail", () => {
    const { asFragment } = render(<Circle tail={<Circle />} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with index", () => {
    const { asFragment } = render(<Circle index={5} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with isSmall prop", () => {
    const { asFragment } = render(<Circle isSmall={true} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with default state", () => {
    const { asFragment } = render(<Circle state={ElementStates.Default} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with changing state", () => {
    const { asFragment } = render(<Circle state={ElementStates.Changing} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("renders circle with modified state", () => {
    const { asFragment } = render(<Circle state={ElementStates.Modified} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
