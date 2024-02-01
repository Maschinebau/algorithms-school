import { getRandomNumsArr, swap } from "../../utils/functions"

export const bubbleSort = (arr: number[]) => {
  let swapped
  do {
    swapped = false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        swapped = true
      }
    }
  } while (swapped)
  return arr
}

// console.log(bubbleSort(getRandomNumsArr(15)));

// function selectionSort(arr) {
//   const len = arr.length;
//   for (let i = 0; i < len - 1; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < len; j++) {
//       if (arr[j] < arr[minIndex]) {
//         minIndex = j;
//       }
//     }
//     if (minIndex !== i) {
//       [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
//     }
//   }
//   return arr;
// }
