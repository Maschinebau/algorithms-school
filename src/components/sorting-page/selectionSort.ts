import { RefObject } from "react"
import { Direction } from "../../types/direction"
import { delay, swap } from "../../utils/functions"

type SetDynamicIndexes = (indexes: number[]) => void
type SetModIndexes = (indexes: number[]) => void
type SetIsPending = (val: boolean) => void

export const selectionSort = async (
  arr: number[],
  direction: Direction,
  setDynamicIndexes: SetDynamicIndexes,
  setModIndexes: SetModIndexes,
  setIsPending: SetIsPending,
  isMounted: RefObject<boolean>,
  delayCount: number,
  index = 0,
  sortedIndexes: number[] = []
): Promise<number[]> => {
  if (!isMounted.current || arr.length === 0) return arr //выходим при размонтировании
  // выход по окончанию
  if (index === arr.length - 1) {
    setModIndexes(Array.from(arr.keys()))
    return arr
  }

  setIsPending(true)
  let minIndex = index

  for (let i = index + 1; i < arr.length; i++) {
    if (direction === Direction.Ascending ? arr[i] < arr[minIndex] : arr[i] > arr[minIndex]) {
      minIndex = i
      // проверка, чтобы избежать лишних обновлений стейта
      if (!sortedIndexes.includes(i)) {
        setDynamicIndexes([i, index])
      }
      await delay(delayCount)
    }
  }

  if (!isMounted.current) return arr

  if (minIndex !== index) {
    swap(arr, index, minIndex)
    sortedIndexes.push(index)
    setModIndexes([...sortedIndexes])
  }

  setDynamicIndexes([])
  setIsPending(false)
  return selectionSort(
    arr,
    direction,
    setDynamicIndexes,
    setModIndexes,
    setIsPending,
    isMounted,
    index + 1,
    delayCount,
    sortedIndexes
  )
}
