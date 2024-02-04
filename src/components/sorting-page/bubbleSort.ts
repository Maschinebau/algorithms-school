import { RefObject } from "react"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { Direction } from "../../types/direction"
import { delay, swap } from "../../utils/functions"

type SetDynamicIndexes = (indexes: number[]) => void
type SetModIndexes = (indexes: number[]) => void
type SetIsPending = (val: boolean) => void

export const bubbleSort = async (
  arr: number[],
  direction: Direction,
  setDynamicIndexes: SetDynamicIndexes,
  setModIndexes: SetModIndexes,
  isPending: SetIsPending,
  isMounted: RefObject<boolean>,
) => {
  if (arr.length === 0) {
    return arr
  }

  isPending(true)
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
        await delay(SHORT_DELAY_IN_MS)

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
  isPending(false)
  return arr
}
