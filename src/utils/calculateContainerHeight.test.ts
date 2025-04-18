import { calculateContainerHeight } from '@/utils/calculateContainerHeight'
import { expect, it } from 'vitest'

it('chooses the larger ratio when aspect is "taller"', () => {
  const containerWidth = 200
  const leftRatio = 0.5 // height is half of width
  const rightRatio = 0.25 // height is a quarter of width
  const result = calculateContainerHeight(
    containerWidth,
    leftRatio,
    rightRatio,
    'taller',
  )
  // For "taller", uses max(0.5, 0.25) = 0.5
  expect(result).toBe(containerWidth * leftRatio)
})

it('chooses the smaller ratio when aspect is "wider"', () => {
  const containerWidth = 300
  const leftRatio = 0.75
  const rightRatio = 0.5
  const result = calculateContainerHeight(
    containerWidth,
    leftRatio,
    rightRatio,
    'wider',
  )
  // For "wider", uses min(0.75, 0.5) = 0.5
  expect(result).toBe(containerWidth * rightRatio)
})

it('works correctly when both ratios are equal', () => {
  const containerWidth = 150
  const ratio = 0.4
  const resultTaller = calculateContainerHeight(
    containerWidth,
    ratio,
    ratio,
    'taller',
  )
  const resultWider = calculateContainerHeight(
    containerWidth,
    ratio,
    ratio,
    'wider',
  )
  // Both should be the same: containerWidth * ratio
  expect(resultTaller).toBe(containerWidth * ratio)
  expect(resultWider).toBe(containerWidth * ratio)
})
