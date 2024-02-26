import React, { FormEvent, useEffect, useState } from "react"
import styles from "./fibonacci-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Button } from "../ui/button/button"
import { Input } from "../ui/input/input"
import { Circle } from "../ui/circle/circle"
import { delay, fib } from "../../utils/functions"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { useInput, useMounted } from "../../utils/hooks"

export const FibonacciPage = () => {
  const { values, handleChange } = useInput({ inputValue: "" })
  const [formChanged, setFormIsChanged] = useState(false)
  const [printedNums, setPrintedNums] = useState<number[]>([])
  const [isPending, setIsPending] = useState(false)
  const isMounted = useMounted()

  const parsedValue = values.inputValue !== undefined ? parseInt(values.inputValue, 10) : undefined

  const print = async (val: number) => {
    setIsPending(true) // включаем спиннер на кнопке

    const fibNumbers = fib(val)
    for (let i = 0; i < fibNumbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS) // сохраняем рассчеты и выводим с задержкой

      if (isMounted.current) {
        setPrintedNums((prevNums) => [...prevNums, fibNumbers[i]])
      }
    }
    setIsPending(false)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPrintedNums([])
    print(parsedValue as number)
  }

  useEffect(() => {
    if (!isMounted) return

    setFormIsChanged(
      !isNaN(parsedValue as number) && (parsedValue as number) >= 1 && (parsedValue as number) <= 19
    )
  }, [values.inputValue, parsedValue, isMounted])

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
            data-testid="inputValue"
          />
          <Button text="Рассчитать" disabled={!formChanged} type="submit" isLoader={isPending} />
        </form>
        <ul>
          {printedNums.length > 0 &&
            printedNums.map((item, idx) => <Circle letter={item} key={idx} index={idx} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
