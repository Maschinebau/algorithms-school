import { RefObject } from "react"
import { delay, swap } from "../../utils/functions"

type SetIsPending = React.Dispatch<React.SetStateAction<boolean>>
type SetDynamicIndexes = React.Dispatch<React.SetStateAction<number[]>>
type SetModIndexes = React.Dispatch<React.SetStateAction<number[]>>

export const reverseString = async (
  arr: string[],
  interval: number,
  setIsPending: SetIsPending,
  setDynamicIndexes: SetDynamicIndexes,
  setRevInputVal: React.Dispatch<React.SetStateAction<string[]>>,
  setModIndexes: SetModIndexes,
  isMounted: RefObject<boolean>
) => {
  if (arr.length <= 1) return arr
  setIsPending(true)

  let start = 0
  let end = arr.length - 1

  const reverseInterval = setInterval(async () => {
    // проверка на завершение обращения
    if (start >= end) {
      clearInterval(reverseInterval)
      if (setModIndexes) {
        setModIndexes(Array.from(arr.keys()))
      }
      setIsPending(false)
      return
    }

    if (isMounted.current) {
      setDynamicIndexes(() => [start, end])
      await delay(interval)
      swap(arr, start, end)

      start++
      end--

      if (isMounted.current) {
        setDynamicIndexes(() => [start, end])
        setRevInputVal([...arr])
        setModIndexes((state) => [start - 1, end + 1, ...state])
        await delay(interval)
      }
    }
  }, interval)
}
