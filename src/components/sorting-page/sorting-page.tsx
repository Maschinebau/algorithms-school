import React, { useState } from "react"
import styles from "./sorting-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { RadioInput } from "../ui/radio-input/radio-input"
import { Button } from "../ui/button/button"
import { Direction } from "../../types/direction"
import { Column } from "../ui/column/column"
import { getRandomNumsArr, getSize} from "../../utils/functions"
import { ElementStates } from "../../types/element-states"
import { bubbleSort } from "./bubbleSort"
import { selectionSort } from "./selectionSort"
import { useMounted } from "../../utils/hooks"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"

export const SortingPage = () => {
  const [selectedType, setSelectedType] = useState("bubble")
  const [randomArr, setRandomArr] = useState<number[]>(getRandomNumsArr(getSize()))
  const [dynamicIndexes, setDynamicIndexes] = useState<number[]>([])
  const [modIndexes, setModIndexes] = useState<number[]>([])
  const [pending, setIsPending] = useState(false)
  const isMounted = useMounted()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value) // Обновляем состояние выбранного радио
  }

  // генерируем новый массив чисел
  const setArr = () => {
    setModIndexes([])
    setRandomArr(getRandomNumsArr(getSize()))
  }

  // возвращаем стейт по индексам
  const circleState = (idx: number) => {
    if (modIndexes.includes(idx)) return ElementStates.Modified
    if (dynamicIndexes.includes(idx)) return ElementStates.Changing
    return ElementStates.Default
  }

  // запуск сортировок
  const onSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (selectedType === "bubble") {
      setModIndexes([]) // обнуляем индексы и выбираем тип сортировки
      e.currentTarget.value === "ascending"
        ? bubbleSort(randomArr, Direction.Ascending, setDynamicIndexes, setModIndexes, setIsPending, isMounted, SHORT_DELAY_IN_MS)
        : bubbleSort(randomArr, Direction.Descending, setDynamicIndexes, setModIndexes, setIsPending, isMounted, SHORT_DELAY_IN_MS)
    } else {
      setModIndexes([])
      e.currentTarget.value === "ascending"
        ? selectionSort(randomArr, Direction.Ascending, setDynamicIndexes, setModIndexes, setIsPending, isMounted, SHORT_DELAY_IN_MS)
        : selectionSort(randomArr, Direction.Descending, setDynamicIndexes, setModIndexes, setIsPending, isMounted, SHORT_DELAY_IN_MS)
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <form className={styles.controls}>
          <RadioInput
            label={"Выбор"}
            value="selection"
            checked={selectedType === "selection"}
            onChange={handleRadioChange}
            disabled={pending}
          />
          <RadioInput
            label={"Пузырёк"}
            value="bubble"
            checked={selectedType === "bubble"}
            onChange={handleRadioChange}
            disabled={pending}
          />
          <div className={styles.buttons}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              type="button"
              onClick={onSort}
              value={Direction.Ascending}
              disabled={pending}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              type="button"
              onClick={onSort}
              value={Direction.Descending}
              disabled={pending}
            />
            <Button text="Новый массив" type="button" onClick={setArr} disabled={pending} />
          </div>
        </form>
        <ul>
          {randomArr.length > 0 &&
            randomArr.map((item, idx) => <Column index={item} key={idx} state={circleState(idx)} />)}
        </ul>
      </div>
    </SolutionLayout>
  )
}
