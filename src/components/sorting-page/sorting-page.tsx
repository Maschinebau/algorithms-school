import React, { useState } from "react"
import styles from "./sorting-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { RadioInput } from "../ui/radio-input/radio-input"
import { Button } from "../ui/button/button"
import { Direction } from "../../types/direction"

export const SortingPage: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState("")

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value) // Обновляем состояние выбранного радио инпута
  }

  

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <form className={styles.controls}>
          <RadioInput
            label={"Выбор"}
            value="selection"
            checked={selectedRadio === "selection"}
            onChange={handleRadioChange}
          />
          <RadioInput
            label={"Пузырёк"}
            value="bubble"
            checked={selectedRadio === "bubble"}
            onChange={handleRadioChange}
          />
          <div className={styles.buttons}>
            <Button text="По возрастанию" sorting={Direction.Ascending} type="button" />
            <Button text="По убыванию" sorting={Direction.Descending} type="button" />
            <Button text="Новый массив" type="reset" />
          </div>
        </form>
        <ul></ul>
      </div>
    </SolutionLayout>
  )
}
