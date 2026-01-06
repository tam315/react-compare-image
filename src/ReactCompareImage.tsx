import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import invariant from 'tiny-invariant'
import useContainerWidth from '@/hooks/useContainerWidth'
import { calculateContainerHeight } from '@/utils/calculateContainerHeight'
import { getImageRatio } from '@/utils/getImageRatio'

interface ReactCompareImageProps {
  aspectRatio?: 'taller' | 'wider'
  handle?: ReactNode
  handleSize?: number
  hover?: boolean
  leftImage: string
  leftImageAlt?: string
  leftImageCss?: object
  leftImageLabel?: string
  onSliderPositionChange?: (position: number) => void
  rightImage: string
  rightImageAlt?: string
  rightImageCss?: object
  rightImageLabel?: string
  skeleton?: ReactNode
  sliderLineColor?: string
  sliderLineWidth?: number
  sliderPositionPercentage?: number
  vertical?: boolean
}

const ReactCompareImage = (props: ReactCompareImageProps) => {
  const {
    aspectRatio = 'taller',
    handle = null,
    handleSize = 40,
    hover = false,
    leftImage,
    leftImageAlt = '',
    leftImageCss = {},
    leftImageLabel = null,
    onSliderPositionChange,
    rightImage,
    rightImageAlt = '',
    rightImageCss = {},
    rightImageLabel = null,
    skeleton = null,
    sliderLineColor = '#ffffff',
    sliderLineWidth = 2,
    sliderPositionPercentage = 0.5,
    vertical = false,
  } = props

  const horizontal = !vertical

  // 0 to 1
  const [sliderPosition, setSliderPosition] = useState<number>(
    sliderPositionPercentage,
  )
  const [isSliding, setIsSliding] = useState<boolean>(false)

  // size of the parent container
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [containerHeight, setContainerHeight] = useState<number>(0)

  // refs to HTML elements
  const containerRef = useContainerWidth((width) => setContainerWidth(width))
  const rightImageRef = useRef<HTMLImageElement>(null)
  const leftImageRef = useRef<HTMLImageElement>(null)

  // image loading flag
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const checkImagesLoaded = useCallback(() => {
    if (leftImageRef.current?.complete && rightImageRef.current?.complete) {
      setImagesLoaded(true)
    }
  }, [])

  // Manage image loading state
  // biome-ignore lint/correctness/useExhaustiveDependencies: need to check when an image source changed
  useEffect(() => {
    // Sometimes onLoad is not called for some reason (maybe due to cache).
    // So check explicitly.
    checkImagesLoaded()

    return () => {
      setImagesLoaded(false)
    }
  }, [leftImage, rightImage, checkImagesLoaded])

  // Set container height based on the image ratio
  useEffect(() => {
    if (
      !(leftImageRef.current && rightImageRef.current) ||
      containerWidth === 0 ||
      !imagesLoaded
    ) {
      return
    }
    const height = calculateContainerHeight(
      containerWidth,
      getImageRatio(leftImageRef.current),
      getImageRatio(rightImageRef.current),
      aspectRatio,
    )
    setContainerHeight(height)
  }, [containerWidth, imagesLoaded, aspectRatio])

  // Setup event listeners for mouse/touch events.
  // We need to reset the event handlers whenever the container’s width or
  // any other relevant condition changes.
  //
  // biome-ignore lint/correctness/useExhaustiveDependencies: `onSliderPositionChange` is a prop and may cause infinite loop
  useEffect(() => {
    // do nothing if refs are not ready for some reason
    if (!containerRef.current) {
      return
    }

    // wait for image loading
    if (!imagesLoaded) {
      return
    }

    const handleSliding = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) {
        return
      }

      // Get the cursor position from the edge of the container
      const rect = containerRef.current.getBoundingClientRect()
      let clientX: number
      let clientY: number
      if (window.TouchEvent && e instanceof TouchEvent) {
        const touch = e.touches[0]
        invariant(touch)
        clientX = touch.clientX
        clientY = touch.clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      const position = horizontal ? clientX - rect.left : clientY - rect.top

      // Prevent slider from overflowing container by clamping its position within bounds
      const halfLineWidth = sliderLineWidth / 2
      const maxPosition = horizontal
        ? containerWidth - halfLineWidth
        : containerHeight - halfLineWidth
      const clampedPosition = Math.min(
        Math.max(position, halfLineWidth),
        maxPosition,
      )

      const ratio =
        clampedPosition / (horizontal ? containerWidth : containerHeight)

      setSliderPosition(ratio)
      onSliderPositionChange?.(ratio)
    }

    const startSliding = (e: MouseEvent | TouchEvent) => {
      setIsSliding(true)

      // Prevent default behavior other than mobile scrolling
      if (!('touches' in e)) {
        e.preventDefault()
      }

      // Slide the image even if you just click or tap (not drag)
      handleSliding(e)

      window.addEventListener('mousemove', handleSliding) // 07
      window.addEventListener('touchmove', handleSliding) // 08
    }

    const finishSliding = () => {
      setIsSliding(false)
      window.removeEventListener('mousemove', handleSliding)
      window.removeEventListener('touchmove', handleSliding)
    }

    const containerElement = containerRef.current

    // for mobile
    containerElement.addEventListener('touchstart', startSliding) // 01
    window.addEventListener('touchend', finishSliding) // 02

    // for desktop
    if (hover) {
      containerElement.addEventListener('mousemove', handleSliding) // 03
      containerElement.addEventListener('mouseleave', finishSliding) // 04
    } else {
      containerElement.addEventListener('mousedown', startSliding) // 05
      window.addEventListener('mouseup', finishSliding) // 06
    }

    return () => {
      // clean up all event listeners
      containerElement.removeEventListener('touchstart', startSliding) // 01
      window.removeEventListener('touchend', finishSliding) // 02
      containerElement.removeEventListener('mousemove', handleSliding) // 03
      containerElement.removeEventListener('mouseleave', finishSliding) // 04
      containerElement.removeEventListener('mousedown', startSliding) // 05
      window.removeEventListener('mouseup', finishSliding) // 06
      window.removeEventListener('mousemove', handleSliding) // 07
      window.removeEventListener('touchmove', handleSliding) // 08
    }
  }, [
    imagesLoaded,
    aspectRatio,
    containerHeight,
    containerWidth,
    horizontal,
    hover,
    sliderLineWidth,
    containerRef,
    // onSliderPositionChange, // may cause infinite loop
  ])

  const styles = {
    container: {
      boxSizing: 'border-box',
      position: 'relative',
      width: '100%',
      height: `${containerHeight}px`,
      overflow: 'hidden',
    },
    rightImage: {
      clipPath: horizontal
        ? `inset(0px 0px 0px ${containerWidth * sliderPosition}px)`
        : `inset(${containerHeight * sliderPosition}px 0px 0px 0px)`,
      display: 'block',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      width: '100%',
      ...rightImageCss,
    },
    leftImage: {
      clipPath: horizontal
        ? `inset(0px ${containerWidth * (1 - sliderPosition)}px 0px 0px)`
        : `inset(0px 0px ${containerHeight * (1 - sliderPosition)}px 0px)`,
      display: 'block',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      width: '100%',
      ...leftImageCss,
    },
    slider: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      ...(horizontal
        ? {
            cursor: 'ew-resize',
            flexDirection: 'column',
            height: '100%',
            left: `${containerWidth * sliderPosition - handleSize / 2}px`,
            top: 0,
            width: `${handleSize}px`,
          }
        : {
            cursor: 'ns-resize',
            flexDirection: 'row',
            height: `${handleSize}px`,
            left: 0,
            top: `${containerHeight * sliderPosition - handleSize / 2}px`,
            width: '100%',
          }),
    },
    line: {
      background: sliderLineColor,
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
      flex: '0 1 auto',
      height: horizontal ? '100%' : `${sliderLineWidth}px`,
      width: horizontal ? `${sliderLineWidth}px` : '100%',
    },
    handleCustom: {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      height: 'auto',
      justifyContent: 'center',
      width: 'auto',
    },
    handleDefault: {
      alignItems: 'center',
      border: `${sliderLineWidth}px solid ${sliderLineColor}`,
      borderRadius: '100%',
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      height: `${handleSize}px`,
      justifyContent: 'center',
      width: `${handleSize}px`,
      transform: horizontal ? 'none' : 'rotate(90deg)',
    },
    leftArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderRight: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: '0px',
      marginLeft: `-${handleSize * 0.25}px`, // for IE11
      marginRight: `${handleSize * 0.25}px`,
      width: '0px',
    },
    rightArrow: {
      border: `inset ${handleSize * 0.15}px rgba(0,0,0,0)`,
      borderLeft: `${handleSize * 0.15}px solid ${sliderLineColor}`,
      height: '0px',
      marginRight: `-${handleSize * 0.25}px`, // for IE11
      width: '0px',
    },
    leftLabel: {
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      left: horizontal ? '5%' : '50%',
      opacity: isSliding ? 0 : 1,
      padding: '10px 20px',
      position: 'absolute',
      top: horizontal ? '50%' : '3%',
      transform: horizontal ? 'translate(0,-50%)' : 'translate(-50%, 0)',
      transition: 'opacity 0.1s ease-out',
    },
    rightLabel: {
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      opacity: isSliding ? 0 : 1,
      padding: '10px 20px',
      position: 'absolute',
      ...(horizontal
        ? {
            right: '5%',
            top: '50%',
            transform: 'translate(0,-50%)',
          }
        : {
            left: '50%',
            bottom: '3%',
            transform: 'translate(-50%, 0)',
          }),
      transition: 'opacity 0.1s ease-out',
    },
    leftLabelContainer: {
      clipPath: horizontal
        ? `inset(0px ${containerWidth * (1 - sliderPosition)}px 0px 0px)`
        : `inset(0px 0px ${containerHeight * (1 - sliderPosition)}px 0px)`,
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    rightLabelContainer: {
      clipPath: horizontal
        ? `inset(0px 0px 0px ${containerWidth * sliderPosition}px)`
        : `inset(${containerHeight * sliderPosition}px 0px 0px 0px)`,
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  } as const satisfies { [key: string]: CSSProperties }

  return (
    <>
      {skeleton && !imagesLoaded && (
        <div style={{ ...styles.container }}>{skeleton}</div>
      )}

      <div
        style={{
          ...styles.container,
          display: imagesLoaded ? 'block' : 'none',
        }}
        ref={containerRef}
        data-testid="container"
      >
        <img
          onLoad={() => checkImagesLoaded()}
          alt={rightImageAlt}
          data-testid="right-image"
          ref={rightImageRef}
          src={rightImage}
          style={styles.rightImage}
        />
        <img
          onLoad={() => checkImagesLoaded()}
          alt={leftImageAlt}
          data-testid="left-image"
          ref={leftImageRef}
          src={leftImage}
          style={styles.leftImage}
        />
        <div style={styles.slider}>
          <div style={styles.line} />
          {handle ? (
            <div style={styles.handleCustom}>{handle}</div>
          ) : (
            <div style={styles.handleDefault}>
              <div style={styles.leftArrow} />
              <div style={styles.rightArrow} />
            </div>
          )}
          <div style={styles.line} />
        </div>
        {/* labels */}
        {leftImageLabel && (
          <div style={styles.leftLabelContainer}>
            <div style={styles.leftLabel}>{leftImageLabel}</div>
          </div>
        )}
        {rightImageLabel && (
          <div style={styles.rightLabelContainer}>
            <div style={styles.rightLabel}>{rightImageLabel}</div>
          </div>
        )}
      </div>
    </>
  )
}

export default ReactCompareImage
