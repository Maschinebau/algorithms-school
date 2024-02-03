import React, { FormEvent, useEffect, useState } from "react"
import styles from "./fibonacci-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Button } from "../ui/button/button"
import { Input } from "../ui/input/input"
import { Circle } from "../ui/circle/circle"
import { delay, fib } from "../../utils/functions"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { useInput } from "../../utils/hooks"
import { v4 as uuid } from "uuid"

export const FibonacciPage = () => {
  const { values, handleChange } = useInput({ inputValue: "" })
  const [formChanged, setFormIsChanged] = useState(false)
  const [printedNums, setPrintedNums] = useState<number[]>([])
  const [isPending, setIsPending] = useState(false)

  const parsedValue = values.inputValue !== undefined ? parseInt(values.inputValue, 10) : undefined

  const print = async (val: number) => {
    // включаем спиннер на кнопке
    setIsPending(true)
    const fibNumbers = fib(val)
    // сохраняем рассчеты и выводим с задержкой
    for (let i = 0; i < fibNumbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS)
      setPrintedNums((prevNums) => [...prevNums, fibNumbers[i]])
    }
    setIsPending(false)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPrintedNums([])
    print(parsedValue as number)
  }

  useEffect(() => {
    setFormIsChanged(
      !isNaN(parsedValue as number) && (parsedValue as number) >= 1 && (parsedValue as number) <= 19
    )
  }, [values.inputValue, parsedValue])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <form className={styles.controls} onSubmit={onSubmit}>
          <Input
            extraClass={styles.input}
            isLimitText={true}
            maxLength={2}
            max={19}
            type="number"
            onChange={handleChange}
            value={values.inputValue}
            name="inputValue"
          />
          <Button text="Рассчитать" disabled={!formChanged} type="submit" isLoader={isPending} />
        </form>
        <ul>
          {printedNums.length > 0 &&
            printedNums.map((item, idx) => <Circle letter={item} key={uuid()} index={idx} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
