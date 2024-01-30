import React, { FormEvent, useEffect, useState } from "react"
import styles from "./stack-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { delay } from "../../utils/functions"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { ElementStates } from "../../types/element-states"
import { useInput } from "../../utils/hooks"

export const StackPage = () => {
  const { values, handleChange, reset } = useInput({inputValue: ''})
  const [formChanged, setFormIsChanged] = useState(false)
  const [printedVals, setPrintedVals] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dynamicIndex, setDynamicIndex] = useState<number | null>(null)

  // проверяем, является ли компонент хвостом
  const getTall = (idx: number) => {
    return idx === printedVals.length - 1 ? "top" : null
  }

  // получаем состояние компонента, чтобы изменить цвет при удалении
  const circleState = (idx: number) => {
    return idx === dynamicIndex ? ElementStates.Changing : ElementStates.Default
  }

  const deleteTop = async () => {
    setIsLoading(true)
    // тут устанавливаем индекс компонента, который будет выделяться активным
    setDynamicIndex(printedVals.length - 1)
    await delay(SHORT_DELAY_IN_MS)
    setDynamicIndex(null)
    setPrintedVals((prevVals) => prevVals.slice(0, -1))
    setIsLoading(false)
  }

  const clearStack = () => {
    setPrintedVals([])
    setFormIsChanged(false)
    reset()
  }

  // выводим содержимое инпута
  const print = async (val: string) => {
    setIsLoading(true)
    setPrintedVals((prevVals) => [...prevVals, val])
    // тут устанавливаем индекс элемента, который будет выделяться активным
    setDynamicIndex(printedVals.length)
    await delay(SHORT_DELAY_IN_MS)
    setIsLoading(false)
    setDynamicIndex(null)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    print(values.inputValue)
    reset()
  }

  useEffect(() => {
    // проверяем, что компонентов не больше 9 и инпут не пустой
    setFormIsChanged(printedVals.length <= 9 && values.inputValue !== "")
  }, [printedVals, values.inputValue])

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.controls} onSubmit={onSubmit}>
          <Input
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            value={values.inputValue}
            name="inputValue"
          />
          <Button text="Добавить" disabled={!formChanged} type="submit" isLoader={isLoading} />
          <Button text="Удалить" disabled={printedVals.length <= 0} type="button" onClick={deleteTop} />
          <Button text="Очистить" disabled={printedVals.length <= 0}  type="reset" onClick={clearStack} />
        </form>
        <ul>
          {printedVals.length > 0 &&
            printedVals.map((item, idx) => (
              <Circle letter={item} key={idx} index={idx} head={getTall(idx)} state={circleState(idx)} />
            ))}
        </ul>
      </div>
    </SolutionLayout>
  )
}
