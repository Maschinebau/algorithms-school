export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const swap = (arr: string[] | number[], a: number, b: number) => {
  const temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

export const fib = (n: number) => {
  // можем работать только с указанным диапазоном
  if (n < 1 || n > 19 || typeof n !== "number") return []

  let arr: number[] = [0, 1]

  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1])
  }
  return arr
}

export const getRandomNumsArr = (size: number) => {
  return Array(size)
    .fill(0)
    .map(() => Math.floor(Math.random() * 101))
}

// получаем число от 3 до 17
export const getSize = () => Math.floor(Math.random() * 15) + 3