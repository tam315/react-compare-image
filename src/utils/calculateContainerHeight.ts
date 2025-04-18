/**
 * Calculates the container height based on its width and the aspect ratios of two images.
 *
 * @param containerWidth - The width of the container in pixels.
 * @param leftRatio - The width-to-height ratio (naturalHeight / naturalWidth) of the left image.
 * @param rightRatio - The width-to-height ratio (naturalHeight / naturalWidth) of the right image.
 * @param aspect - Aspect mode: 'taller' chooses the larger ratio, 'wider' chooses the smaller ratio.
 * @returns The calculated container height in pixels.
 */
export function calculateContainerHeight(
  containerWidth: number,
  leftRatio: number,
  rightRatio: number,
  aspect: 'taller' | 'wider',
): number {
  const idealRatio =
    aspect === 'taller'
      ? Math.max(leftRatio, rightRatio)
      : Math.min(leftRatio, rightRatio)
  return containerWidth * idealRatio
}
