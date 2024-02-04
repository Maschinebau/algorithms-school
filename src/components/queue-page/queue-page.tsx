import React, { FormEvent, useEffect, useState } from "react"
import styles from "./queue-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Button } from "../ui/button/button"
import { Input } from "../ui/input/input"
import { useInput, useMounted } from "../../utils/hooks"
import { Circle } from "../ui/circle/circle"
import { ElementStates } from "../../types/element-states"
import { delay } from "../../utils/functions"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { Queue } from "./queie"

export const QueuePage = () => {
  const [queue] = useState(new Queue<string>(7))
  const [tail, setTail] = useState<number>(queue.getTail())
  const [head, setHead] = useState<number>(queue.getHead())
  const [length, setLength] = useState(queue.getLength())
  const { values, handleChange, reset } = useInput({ inputValue: "" })
  const [formChanged, setFormIsChanged] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const isMounted = useMounted()

  // индекс будет добавляться элементам для анимации удаления/добавления
  const [dynamicIndex, setDynamicIndex] = useState<number | null>(null)

  // получаем состояние компонента, чтобы изменить цвет при удалении
  const circleState = (idx: number) => {
    return idx === dynamicIndex ? ElementStates.Changing : ElementStates.Default
  }

  // обновляем состояние очереди
  const updQueue = () => {
    setTail(queue.getTail())
    setHead(queue.getHead())
    setLength(queue.getLength())
    reset()
  }

  // удаление элемента
  const dequeue = async () => {
    setDynamicIndex(head)
    await delay(SHORT_DELAY_IN_MS)
    if (!queue.isEmpty()) {
      queue.dequeue()
      updQueue()
      setDynamicIndex(null)
      setIsPending(false)
    }
  }

  // добавление
  const enqueue = async (val: string) => {
    setIsPending(true)
    setDynamicIndex(tail)
    queue.enqueue(val)
    await delay(SHORT_DELAY_IN_MS)
    updQueue()
    setDynamicIndex(null)
    setFormIsChanged(false)
    setIsPending(false)
  }

  //  очистка стэка
  const clearStack = () => {
    queue.clearQueue()
    updQueue()
    setFormIsChanged(false)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    enqueue(values.inputValue)
    updQueue()
  }

  useEffect(() => {
    if(!isMounted) return

    setFormIsChanged(values.inputValue !== "" && length <= 6)
  }, [values.inputValue, length, isMounted])

  return (
    <SolutionLayout title="Очередь">
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
          <Button text="Добавить" disabled={!formChanged} type="submit" isLoader={isPending} />
          <Button text="Удалить" disabled={length === 0} type="button" onClick={dequeue} />
          <Button text="Очистить" disabled={length === 0} type="reset" onClick={clearStack} />
        </form>
        <ul>
          {queue.getQueue().length > 0 &&
            queue
              .getQueue()
              .map((item, idx) => (
                <Circle
                  letter={item ?? ""}
                  key={idx}
                  index={idx}
                  head={idx === head ? "head" : null}
                  tail={idx === tail - 1 ? "tail" : null}
                  state={circleState(idx)}
                />
              ))}
        </ul>
      </div>
    </SolutionLayout>
  )
}
