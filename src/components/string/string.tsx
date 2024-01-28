import React, { FormEvent, useState } from "react"
import styles from "./string.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { swap } from "../../utils/functions"
import { DELAY_IN_MS } from "../../constants/delays"

export const StringComponent = () => {
  const [inputValue, setInputValue] = useState("")
  const [formChanged, setFormIsChanged] = useState(false)
  const [splitedInputVal, setSplitedInputVal] = useState<string[]>([])
  const [reversedInputVal, setReversedInputVal] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setInputValue(value)
    setFormIsChanged(value !== "")
    setSplitedInputVal(value.split(""))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    reverseString(splitedInputVal, DELAY_IN_MS)
  }

  const reverseString = (arr: string[], interval: number) => {
    if (arr.length < 2) {
      setReversedInputVal(arr)
    }

    setIsLoading(true)

    let start = 0
    let end = arr.length - 1

    const reverseInterval = setInterval(() => {
      if (start < end) {
        swap(arr, start, end)
        start++
        end--
        setReversedInputVal([...arr])
      } else {
        clearInterval(reverseInterval)
        setIsLoading(false)
      }
    }, interval)
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.controls} onSubmit={onSubmit}>
          <Input extraClass={styles.input} isLimitText={true} maxLength={11} onChange={handleInputChange} />
          <Button text="Развернуть" disabled={!formChanged} type="submit" isLoader={isLoading} />
        </form>
        <ul>
          {reversedInputVal.length > 0 &&
            reversedInputVal.map((item, idx) => <Circle letter={item} key={idx} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
