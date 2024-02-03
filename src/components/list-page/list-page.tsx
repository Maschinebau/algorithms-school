import React, { Fragment, useEffect, useRef, useState } from "react"
import styles from "./list-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { useInput } from "../../utils/hooks"
import { Circle } from "../ui/circle/circle"
import { ElementStates } from "../../types/element-states"
import { ArrowIcon } from "../ui/icons/arrow-icon"
import { LinkedList } from "./Linked-list"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { delay } from "../../utils/functions"
import { v4 as uuid } from "uuid"

export enum Location {
  top = "top",
  bottom = "bottom"
}

export const ListPage = () => {
  const { values, handleChange, setValues } = useInput({ string: "", number: "" })

  // инстанс списка и списка для отрисовки записываем в стейт
  const list = useRef(new LinkedList(["2", "34", "8"]))
  const [printedArr, setPrintedArr] = useState<string[]>(list.current.toArr())

  // сохраняем индексы элементов
  const [smallCircleIndex, setSmallCircleIndex] = useState(-1)
  const [smallCirclePos, setSmallCirclePos] = useState<Location | null>(null)
  const [circleStates, setCircleStates] = useState({
    modIndex: -1,
    changingIndex: -1
  })
  const [currentElement, setCurrentElement] = useState("")

  // состояние кнопок
  const [btnStates, setBtnStates] = useState({
    addHeadBtnDisabled: false,
    addTailBtnDisabled: false,
    delHeadBtnDisabled: false,
    delTailBtnDisabled: false,
    addIdxBtnDisabled: false,
    delIdxBtnDisabled: false
  })

  // лоадеры для кнопок
  const [pending, setPending] = useState({
    addHeadPdg: false,
    addTailPdg: false,
    delHeadPdg: false,
    delTailPdg: false,
    addIdxPdg: false,
    delIdxPdg: false
  })

  // получаем состояние элементов
  const circleState = (idx: number): ElementStates => {
    if (circleStates.modIndex === idx) return ElementStates.Modified
    if (circleStates.changingIndex >= idx) return ElementStates.Changing
    return ElementStates.Default
  }

  const addHead = async () => {
    setPending({ ...pending, addHeadPdg: true })

    setCurrentElement(values.string)
    setSmallCirclePos(Location.top)
    setSmallCircleIndex(0)
    await delay(SHORT_DELAY_IN_MS)

    setSmallCircleIndex(-1)
    list.current.prepend(values.string)
    setCircleStates({ ...circleStates, modIndex: 0 })
    setPrintedArr(list.current.toArr())
    await delay(SHORT_DELAY_IN_MS)

    setCircleStates({ ...circleStates, modIndex: -1 })

    setValues((prevVals) => ({
      ...prevVals,
      string: "",
      number: ""
    }))

    setPending({ ...pending, addHeadPdg: false })
  }

  // добавляем нод в хвост списка
  const AddTail = async () => {
    setPending({ ...pending, addTailPdg: true })

    setCurrentElement(values.string)
    setSmallCirclePos(Location.top)
    setSmallCircleIndex(list.current.getSize)
    await delay(SHORT_DELAY_IN_MS)

    list.current.append(values.string)
    setCircleStates({ ...circleStates, modIndex: printedArr.length })
    setSmallCircleIndex(-1)
    setPrintedArr(list.current.toArr())
    await delay(SHORT_DELAY_IN_MS)

    setCircleStates({ ...circleStates, modIndex: -1 })

    setValues((prevVals) => ({
      ...prevVals,
      string: "",
      number: ""
    }))

    setPending({ ...pending, addTailPdg: false })
  }

  // удаляем первый элемент
  const onDelHead = async () => {
    setPending({ ...pending, delHeadPdg: true })

    if (printedArr.length > 0) {
      setCurrentElement(printedArr[0])
      setSmallCirclePos(Location.bottom)
      setSmallCircleIndex(0)
      printedArr.splice(0, 1, "")
      await delay(SHORT_DELAY_IN_MS)

      list.current.deleteHead()
      setSmallCircleIndex(-1)
      setPrintedArr(list.current.toArr())
    }

    setPending({ ...pending, delHeadPdg: false })
  }

  const onDelTail = async () => {
    setPending({ ...pending, delTailPdg: true })

    if (printedArr.length > 0) {
      setCurrentElement(printedArr[printedArr.length - 1])
      setSmallCirclePos(Location.bottom)
      setSmallCircleIndex(printedArr.length - 1)
      setPrintedArr((arr) => [...arr.slice(0, arr.length - 1), ""])
      await delay(SHORT_DELAY_IN_MS)

      list.current.deleteTail()
      setSmallCircleIndex(-1)
      setPrintedArr(list.current.toArr())
    }

    setPending({ ...pending, delTailPdg: false })
  }

  // добавляем нод по индексу
  const addWithIndex = async () => {
    setPending({ ...pending, addIdxPdg: true })

    let currentElementIndex = -1
    let index = Number(values.number)

    while (currentElementIndex <= index) {
      setCurrentElement(values.string)
      setSmallCirclePos(Location.top)
      setSmallCircleIndex(currentElementIndex - 1)
      setCircleStates({
        ...circleStates,
        changingIndex: currentElementIndex - 1
      })
      setCurrentElement(values.string)
      setSmallCirclePos(Location.top)
      setSmallCircleIndex(currentElementIndex)

      setValues((prevVals) => ({
        ...prevVals,
        string: "",
        number: ""
      }))

      await delay(SHORT_DELAY_IN_MS)
      currentElementIndex++
    }

    list.current.addByIndex(values.string, index)
    setSmallCircleIndex(-1)
    setCircleStates({ ...circleStates, modIndex: index })
    setPrintedArr(list.current.toArr())
    await delay(SHORT_DELAY_IN_MS)

    setValues((prevVals) => ({
      ...prevVals,
      string: "",
      number: ""
    }))

    setCircleStates({ ...circleStates, modIndex: -1 })
    setPrintedArr(list.current.toArr())

    setPending({ ...pending, addIdxPdg: false })
  }

  const deleteWithIndex = async () => {
    setPending({ ...pending, delIdxPdg: true })

    let index = Number(values.number)
    let currentElementIndex = 0

    setValues((prevVals) => ({
      ...prevVals,
      string: "",
      number: ""
    }))

    while (currentElementIndex <= index) {
      setCircleStates({
        ...circleStates,
        changingIndex: currentElementIndex
      })
      await delay(SHORT_DELAY_IN_MS)
      currentElementIndex++
    }

    setCurrentElement(printedArr[index])
    setSmallCirclePos(Location.bottom)
    setSmallCircleIndex(index)
    setPrintedArr((arr) => [...arr.slice(0, index), "", ...arr.slice(index + 1)])
    await delay(SHORT_DELAY_IN_MS)
    setCircleStates({ ...circleStates, changingIndex: -1 })
    setSmallCircleIndex(-1)
    list.current.deleteByIndex(index)
    setPrintedArr(list.current.toArr())

    setPending({ ...pending, delIdxPdg: false })
  }

  // условие рендера head элемента
  const showHead = (index: number) => {
    return smallCircleIndex === index && smallCirclePos === Location.top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : null
  }

  // условие для рендера tail элемента
  const showTail = (index: number) => {
    return smallCircleIndex === index && smallCirclePos === Location.bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === printedArr.length - 1 ? (
      "tail"
    ) : null
  }

  // выставляем все стостяния кнопок
  useEffect(() => {
    let index = Number(values.number)
    
    setBtnStates({
      addHeadBtnDisabled: !values.string || printedArr.length >= 9,
      addTailBtnDisabled: !values.string || printedArr.length >= 9,
      delHeadBtnDisabled: printedArr.length === 0,
      delTailBtnDisabled: printedArr.length === 0,
      addIdxBtnDisabled:
        !values.string ||
        values.number === "" ||
        index > printedArr.length - 1 ||
        index < 0 ||
        printedArr.length > 9,
      delIdxBtnDisabled:
        values.number === "" || index > printedArr.length - 1 || printedArr.length === 0 || index < 0
    })
  }, [values, printedArr])

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <form className={styles.controls}>
          <div className={styles.inputs}>
            <Input
              extraClass={styles.input}
              isLimitText={true}
              maxLength={4}
              onChange={handleChange}
              value={values.string}
              disabled={false}
              name="string"
              placeholder={"Введите значение"}
            />
            <Input
              extraClass={styles.input}
              onChange={handleChange}
              value={values.number}
              disabled={false}
              name="number"
              type="number"
              isLimitText={true}
              max={printedArr.length - 1}
              placeholder={"Введите индекс"}
            />
          </div>
          <div className={styles.btns_box}>
            <Button
              text="Добавить в head"
              type="button"
              extraClass={styles.btn1}
              isLoader={pending.addHeadPdg}
              onClick={addHead}
              disabled={btnStates.addHeadBtnDisabled}
            />
            <Button
              text="Добавить в tail"
              type="button"
              extraClass={styles.btn2}
              isLoader={pending.addTailPdg}
              onClick={AddTail}
              disabled={btnStates.addTailBtnDisabled}
            />
            <Button
              text="Добавить по индексу"
              type="button"
              extraClass={styles.btn3}
              isLoader={pending.addIdxPdg}
              onClick={addWithIndex}
              disabled={btnStates.addIdxBtnDisabled}
            />
          </div>
          <div className={styles.btns_box}>
            <Button
              text="Удалить из head"
              type="button"
              extraClass={styles.btn1}
              isLoader={pending.delHeadPdg}
              onClick={onDelHead}
              disabled={btnStates.delHeadBtnDisabled}
            />
            <Button
              text="Удалить из tail"
              type="button"
              extraClass={styles.btn2}
              isLoader={pending.delTailPdg}
              onClick={onDelTail}
              disabled={btnStates.delTailBtnDisabled}
            />
            <Button
              text="Удалить по индексу"
              type="button"
              extraClass={styles.btn3}
              isLoader={pending.delIdxPdg}
              onClick={deleteWithIndex}
              disabled={btnStates.delIdxBtnDisabled}
            />
          </div>
        </form>
        <ul>
          {printedArr.length > 0 &&
            printedArr.map((item, idx) => (
              <React.Fragment key={uuid()}>
                <Circle
                  letter={item}
                  head={showHead(idx)}
                  tail={showTail(idx)}
                  state={circleState(idx)}
                  index={idx}
                />
                {idx !== printedArr?.length - 1 && <ArrowIcon />}
              </React.Fragment>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  )
}
