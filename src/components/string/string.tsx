import React, { FormEvent, useEffect, useState } from "react"
import styles from "./string.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { DELAY_IN_MS} from "../../constants/delays"
import { useInput, useMounted } from "../../utils/hooks"
import { ElementStates } from "../../types/element-states"
import { reverseString } from "./reverseString"

export const StringComponent = () => {
  const { values, handleChange } = useInput({ inputValue: "" })
  const [formChanged, setFormIsChanged] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [splittedInputVal, setSplittedInputVal] = useState<string[]>([]) // разбитая на символы строка из инпута
  const [revInputVal, setRevInputVal] = useState<string[]>([]) // конечный реверснутый массив
  const isMounted = useMounted()

  // индекс будет добавляться элементам для анимации удаления/добавления
  const [dynamicIndexes, setDynamicIndexes] = useState<number[]>([])
  const [modIndexes, setModIndexes] = useState<number[]>([])

  // вычисляем стейт компонента
  const circleState = (idx: number) => {
    if (modIndexes.includes(idx)) return ElementStates.Modified
    if (dynamicIndexes.includes(idx)) return ElementStates.Changing
    return ElementStates.Default
  }

  // действия при запуске цикла
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setModIndexes([]) // очищаем индексы
    setDynamicIndexes([])
    reverseString(
      splittedInputVal,
      DELAY_IN_MS,
      setIsPending,
      setDynamicIndexes,
      setRevInputVal,
      setModIndexes,
      isMounted
    );
  }

  // эффекты при изменении инпута
  useEffect(() => {
    if(!isMounted) return
    setFormIsChanged(values.inputValue !== "")

    const newSplittedInputVal = values.inputValue.split("") // тут разбиваем строку и сразу рендерим ее
    setSplittedInputVal(newSplittedInputVal)
    setRevInputVal(newSplittedInputVal)
  }, [values.inputValue, isMounted])

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
            data-testid="inputValue"
          />
          <Button text="Развернуть" disabled={!formChanged} type="submit" isLoader={isPending} />
        </form>
        <ul>
          {revInputVal.length > 0 &&
            revInputVal.map((item, idx) => <Circle letter={item} key={idx} state={circleState(idx)} data-testid={`circle-letter`} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
