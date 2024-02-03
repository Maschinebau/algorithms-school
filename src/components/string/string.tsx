import React, { FormEvent, useEffect, useState } from "react"
import styles from "./string.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { delay, swap } from "../../utils/functions"
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays"
import { useInput } from "../../utils/hooks"
import { ElementStates } from "../../types/element-states"
import { v4 as uuid } from "uuid"

export const StringComponent = () => {
  const { values, handleChange } = useInput({ inputValue: "" })
  const [formChanged, setFormIsChanged] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [splittedInputVal, setSplittedInputVal] = useState<string[]>([]) // разбитая на символы строка из инпута
  const [revInputVal, setRevInputVal] = useState<string[]>([]) // конечный реверснутый массив

  // индекс будет добавляться элементам для анимации удаления/добавления
  const [dynamicIndexes, setDynamicIndexes] = useState<number[]>([])
  const [modIndexes, setModIndexes] = useState<number[]>([]) 

  // вычисляем стейт компонента
  const circleState = (idx: number) => {
    if (modIndexes.includes(idx)) return ElementStates.Modified
    if (dynamicIndexes.includes(idx)) return ElementStates.Changing
    return ElementStates.Default
  }

  const reverseString = async (arr: string[], interval: number) => {
    setIsPending(true)

    let start = 0
    let end = arr.length - 1

    const reverseInterval = setInterval(async () => {
      // проверка на звершение обращения
      if (start >= end) {
        clearInterval(reverseInterval)
        setModIndexes(Array.from(arr.keys()))
        setIsPending(false)
        return
      }
      setDynamicIndexes(() => [start, end]) // подсвечиваем первые элементы до начала свайпа
      await delay(interval)
      swap(arr, start, end)

      start++
      end--

      setDynamicIndexes(() => [start, end])
      setRevInputVal([...arr])
      setModIndexes((state) => [start - 1, end + 1, ...state])
      await delay(interval)
    }, interval)
  }

  // действия при запуске цикла
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setModIndexes([]) // очищаем индексы
    setDynamicIndexes([])
    reverseString(splittedInputVal, DELAY_IN_MS)
  }

  // эффекты при изменении инпута
  useEffect(() => {
    setFormIsChanged(values.inputValue !== "")

    const newSplittedInputVal = values.inputValue.split("") // тут разбиваем строку и сразу рендерим ее
    setSplittedInputVal(newSplittedInputVal)
    setRevInputVal(newSplittedInputVal)
  }, [values.inputValue])

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.controls} onSubmit={onSubmit}>
          <Input
            extraClass={styles.input}
            isLimitText={true}
            maxLength={11}
            onChange={handleChange}
            value={values.inputValue}
            disabled={isPending}
            name="inputValue"
          />
          <Button text="Развернуть" disabled={!formChanged} type="submit" isLoader={isPending} />
        </form>
        <ul>
          {revInputVal.length > 0 &&
            revInputVal.map((item, idx) => <Circle letter={item} key={uuid()} state={circleState(idx)} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
