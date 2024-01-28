import React, { FormEvent, useState } from "react"
import styles from "./fibonacci-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Button } from "../ui/button/button"
import { Input } from "../ui/input/input"
import { Circle } from "../ui/circle/circle"
import { delay, fib } from "../../utils/functions"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"

export const FibonacciPage = () => {
  const [inputValue, setInputValue] = useState<number>()
  const [formChanged, setFormIsChanged] = useState(false)
  const [printedNums, setPrintedNums] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // преобразуем в цифры содержимое инпута
    const value = parseInt(e.currentTarget.value, 10)
    setInputValue(value)
    // активируем кнопку по условию
    setFormIsChanged(!isNaN(value) && value >= 1 && value <= 19)
  }

  const print = async (val: number) => {
    // включаем спиннер на кнопке
    setIsLoading(true)
    const fibNumbers = fib(val)
    // сохраняем рассчеты и выводим с задержкой
    for (let i = 0; i < fibNumbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS)
      setPrintedNums((prevNums) => [...prevNums, fibNumbers[i]])
    }
    setIsLoading(false)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPrintedNums([])
    print(inputValue as number)
  }

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
            onChange={handleInputChange}
          />
          <Button text="Рассчитать" disabled={!formChanged} type="submit" isLoader={isLoading} />
        </form>
        <ul>
          {printedNums.length > 0 && printedNums.map((item, idx) => <Circle letter={item} key={idx} index={idx} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
