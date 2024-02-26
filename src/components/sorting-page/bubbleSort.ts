import { RefObject } from "react"
import { Direction } from "../../types/direction"
import { delay, swap } from "../../utils/functions"

type SetDynamicIndexes = (indexes: number[]) => void
type SetModIndexes = (indexes: number[]) => void
type SetsetIsPending = (val: boolean) => void

export const bubbleSort = async (
  arr: number[],
  direction: Direction,
  setDynamicIndexes: SetDynamicIndexes,
  setModIndexes: SetModIndexes,
  setIsPending: SetsetIsPending,
  isMounted: RefObject<boolean>,
  delayCount: number
) => {
  if (arr.length === 0) {
    return arr
  }

  setIsPending(true)
  let swapped

  const sortedIndexes: number[] = []

  do {
    swapped = false
    for (let i = 0; i < arr.length - 1; i++) {
      if (direction === Direction.Ascending ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1]) {
        if (!isMounted.current) return arr
        // проверка, чтобы избежать лишних обновлений стейта
        if (!sortedIndexes.includes(i)) {
          setDynamicIndexes([i, i + 1])
        }
        await delay(delayCount)

        swap(arr, i, i + 1)
        swapped = true
      }
    }
    // определяем индексы уже отсортированных элементов
    if (swapped) {
      sortedIndexes.unshift(arr.length - 1 - sortedIndexes.length)
      setModIndexes(sortedIndexes)
    }
  } while (swapped)

  setModIndexes(Array.from(arr.keys()))
  setDynamicIndexes([])
  setIsPending(false)
  return arr
}
