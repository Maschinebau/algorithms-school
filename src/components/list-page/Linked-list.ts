import { Node } from "./Node"

interface ILinkedList<T> {
  append: (element: T) => void
  prepend: (element: T) => void
  deleteHead: () => void
  deleteTail: () => void
  addByIndex: (element: T, index: number | undefined) => void
  deleteByIndex: (index: number) => void
  getSize: () => number
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null
  private tail: Node<T> | null
  length: number

  constructor(randomArr?: T[]) {
    this.head = null
    this.tail = null
    this.length = 0
    if (randomArr && randomArr.length > 0) {
      randomArr?.forEach((item) => {
        this.append(item)
      })
    }
  }

  // добавляем в конец
  append = (value: T) => {
    const node = new Node(value)
    if (!this.head || !this.tail) {
      this.head = node
      this.tail = node
      this.length++
      return this
    }
    this.tail.next = node
    this.tail = node
    this.length++
    return this
  }

  // добавляем в начало
  prepend = (value: T) => {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.length++
  }

  // удаляем первый элемент
  deleteHead = () => {
    if (!this.head) {
      return null
    }
    const delNode = this.head
    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }
    this.length--
    return delNode
  }

  // удаляем хвостовой элемент
  deleteTail = () => {
    if (!this.tail) {
      return null
    }

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
    } else {
      let currNode = this.head
      while (currNode?.next?.next) {
        currNode = currNode.next
      }

      if (currNode) {
        currNode.next = null
        this.tail = currNode
      }
    }
  }

  // добавляем в список по индексу
  addByIndex = (element: T, index: number | undefined) => {
    if (index) {
      const addNode = new Node(element)

      let curr = this.head
      let currIndex = 0
      // перебрать элементы в списке до нужной позиции
      while (currIndex < index) {
        currIndex++
        if (curr?.next && currIndex !== index) {
          curr = curr?.next
        }
      }
      if (curr) {
        addNode.next = curr.next
        curr.next = addNode
      }
    }
  }

  // удаляем по индексу
  deleteByIndex = (index: number) => {
    let curr = this.head
    let prev = curr
    if (prev && curr) {
      if (curr === this.head) {
        this.head = this.head.next
      } else if (curr === this.tail) {
        prev.next = null
        this.tail = prev
      } else {
        prev.next = curr.next
      }
    }
    this.length--
  }

  // преобразуем список в массив
  toArr() {
    let curr = this.head
    let res: T[] = []
    while (curr) {
      res.push(curr.value)
      curr = curr.next
    }
    return res
  }

  getSize = () => this.length
}
