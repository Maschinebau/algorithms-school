import { bubbleSort } from "./bubbleSort"
import { Direction } from "../../types/direction"
import { selectionSort } from "./selectionSort"

const setDynamicIndexes = jest.fn()
const setModIndexes = jest.fn()
const setIsPending = jest.fn()
const isMounted = { current: true }
const delay = 0
const ascendRes = [1, 1, 2, 3, 4, 5, 6, 9]
const descentRes = [9, 6, 5, 4, 3, 2, 1, 1]


describe("Bubble-sort", () => {
  it("bubbleSort returns empty array if input array is empty", async () => {
    const result = await bubbleSort(
      [],
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual([])
  })

  it("bubbleSort returns array if input array has only one element", async () => {
    const inputArr = [1]
    const result = await bubbleSort(
      inputArr,
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual([1])
  })

  // Тест для общего случая
  it("bubbleSort sorts array in ascending order", async () => {
    const inputArr = [3, 1, 4, 1, 5, 9, 2, 6]
    const result = await bubbleSort(
      inputArr,
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual(ascendRes)
  })

  it("bubbleSort sorts array in descending order", async () => {
    const inputArr = [3, 1, 4, 1, 5, 9, 2, 6]
    const result = await bubbleSort(
      inputArr,
      Direction.Descending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual(descentRes)
  })

  it("selectionSort returns empty array if input array is empty", async () => {
    const result = await selectionSort(
      [],
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual([])
  })

  it("selectionSort returns array if input array has only one element", async () => {
    const inputArr = [1]
    const result = await selectionSort(
      inputArr,
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual([1])
  })

  // Тест для общего случая
  it("selectionSort sorts array in ascending order", async () => {
    const inputArr = [3, 1, 4, 1, 5, 9, 2, 6]
    const result = await selectionSort(
      inputArr,
      Direction.Ascending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual(ascendRes)
  })

  it("selectionSort sorts array in descending order", async () => {
    const inputArr = [3, 1, 4, 1, 5, 9, 2, 6]
    const result = await selectionSort(
      inputArr,
      Direction.Descending,
      setDynamicIndexes,
      setModIndexes,
      setIsPending,
      isMounted,
      delay
    )
    expect(result).toEqual(descentRes)
  })
})
