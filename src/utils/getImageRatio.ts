/**
 * Returns the natural height/width ratio of an image element.
 * @param image - HTMLImageElement whose ratio is computed
 * @returns The image's width-to-height ratio.
 */
export function getImageRatio(image: HTMLImageElement): number {
  return image.naturalHeight / image.naturalWidth;
}