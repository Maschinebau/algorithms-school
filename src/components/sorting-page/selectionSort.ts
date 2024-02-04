import { RefObject } from "react"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { Direction } from "../../types/direction"
import { delay, swap } from "../../utils/functions"

type SetDynamicIndexes = (indexes: number[]) => void
type SetModIndexes = (indexes: number[]) => void
type SetIsPending = (val: boolean) => void

export const selectionSort = async (
  arr: number[],
  direction: Direction,
  updateDynamicIndexes: SetDynamicIndexes,
  updateModIndexes: SetModIndexes,
  isPending: SetIsPending,
  isMounted: RefObject<boolean>,
  index = 0,
  sortedIndexes: number[] = []
): Promise<number[]> => {
  if (!isMounted.current || arr.length === 0) return arr //выходим при размонтировании
  // выход по окончанию
  if (index === arr.length - 1) {
    updateModIndexes(Array.from(arr.keys()))
    return arr
  }

  isPending(true)
  let minIndex = index

  for (let i = index + 1; i < arr.length; i++) {
    if (direction === Direction.Ascending ? arr[i] < arr[minIndex] : arr[i] > arr[minIndex]) {
      minIndex = i
      // проверка, чтобы избежать лишних обновлений стейта
      if (!sortedIndexes.includes(i)) {
        updateDynamicIndexes([i, i + 1])
      }
      await delay(SHORT_DELAY_IN_MS)
    }
  }

  if (!isMounted.current) return arr

  if (minIndex !== index) {
    swap(arr, index, minIndex)
    sortedIndexes.push(index)
    updateModIndexes([...sortedIndexes])
  }

  updateDynamicIndexes([])
  isPending(false)
  return selectionSort(
    arr,
    direction,
    updateDynamicIndexes,
    updateModIndexes,
    isPending,
    isMounted,
    index + 1,
    sortedIndexes
  )
}
