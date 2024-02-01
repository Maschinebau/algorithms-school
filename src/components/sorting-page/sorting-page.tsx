import React, { useState } from "react"
import styles from "./sorting-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { RadioInput } from "../ui/radio-input/radio-input"
import { Button } from "../ui/button/button"
import { Direction } from "../../types/direction"
import { Column } from "../ui/column/column"
import { delay, getRandomNumsArr, getSize, swap } from "../../utils/functions"
import { ElementStates } from "../../types/element-states"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"

export const SortingPage = () => {
  const [selectedType, setSelectedType] = useState("bubble")
  const [randomArr, setRandomArr] = useState<number[]>(getRandomNumsArr(getSize()))
  const [dynamicIndexes, setDynamicIndexes] = useState<number[]>([])
  const [modIndexes, setModIndexes] = useState<number[]>([])
  const [pending, isPending] = useState(false)

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
    if (modIndexes.includes(idx)) return ElementStates.Modified;
    if (dynamicIndexes.includes(idx)) return ElementStates.Changing;
    return ElementStates.Default;
  };

  // сортировка пузырьком
  const bubbleSort = async (arr: number[], direction: Direction) => {
    if (arr.length === 0) {
      return arr
    }

    isPending(true)
    let swapped

    const sortedIndexes: number[] = [] // Массив для хранения индексов отсортированных элементов

    do {
      swapped = false
      for (let i = 0; i < arr.length - 1; i++) {
        if (direction === Direction.Ascending ? arr[i] > arr[i + 1] : arr[i] < arr[i + 1]) {
          // проверка, чтобы избежать лишних обновлений стейта
          if (!dynamicIndexes.includes(i)) {
            setDynamicIndexes([i, i + 1])
            await delay(SHORT_DELAY_IN_MS)
          }

          swap(arr, i, i + 1)
          swapped = true
        }
      }
      // определяем индексы уже отсортированных элементов
      if (swapped) {
        const lastSortedIndex = arr.length - sortedIndexes.length - 1
        sortedIndexes.unshift(lastSortedIndex)
        setModIndexes(sortedIndexes)
      }
    } while (swapped)

    setModIndexes(Array.from(arr.keys()))
    setDynamicIndexes([])
    isPending(false)
    return arr
  }

  // сортировка выбором
  const selectionSort = async (
    arr: number[],
    direction: Direction,
    index = 0,
    sortedIndexes: number[] = []
  ): Promise<number[]> => {
    // выход по окончанию
    if (index === arr.length - 1) {
      setModIndexes(Array.from(arr.keys()))
      return arr
    }

    isPending(true)
    let minIndex = index

    for (let i = index + 1; i < arr.length; i++) {
      if (direction === Direction.Ascending ? arr[i] < arr[minIndex] : arr[i] > arr[minIndex]) {
        minIndex = i
        if (!dynamicIndexes.includes(i)) {
          setDynamicIndexes([i, i + 1])
          await delay(SHORT_DELAY_IN_MS)
        }
      }
    }

    if (minIndex !== index) {
      swap(arr, index, minIndex)
      sortedIndexes.push(index)
      setModIndexes([...sortedIndexes])
    }

    setDynamicIndexes([])
    isPending(false)
    return selectionSort(arr, direction, index + 1, sortedIndexes)
  }

  // запуск сортировок
  const onSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (selectedType === "bubble") {
      // обнуляем индексы и выбираем тип сортировки
      setModIndexes([])
      e.currentTarget.value === "ascending"
        ? bubbleSort(randomArr, Direction.Ascending)
        : bubbleSort(randomArr, Direction.Descending)
    } else {
      setModIndexes([])
      e.currentTarget.value === "ascending"
        ? selectionSort(randomArr, Direction.Ascending)
        : selectionSort(randomArr, Direction.Descending)
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
