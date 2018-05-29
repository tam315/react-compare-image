# React Compare Image

Simple React component to compare two images using slider.

## Demo

[DEMO](https://react-compare-image.yuuniworks.com/)

## Features

* Simple
* Responsive (fit to the parent width)
* Size difference between two images handled correctly. Element size determined by following two factors:
  * width of the parent's width
  * right image's aspect rasio

## How to use

```cmd
yarn add react-compare-image

// or

npm install --save react-compare-image
```

```jsx
import ReactCompareImage from 'react-compare-image';

<ReactCompareImage leftImage="image1.jpg" rightImage="image2.jpg" />;
```

## Props

| Prop (\* required) | type   | default | description                        |
| ------------------ | ------ | :-----: | ---------------------------------- |
| leftImage \*       | string |  null   | left image's url                   |
| rightImage \*      | string |  null   | right image's url                  |
| sliderLineWidth    | number |    2    | line width of slider by pixel      |
| handleSize         | number |   40    | diameter of slider handle by pixel |

## Dependencies

* [css-element-queries](https://github.com/marcj/css-element-queries) to detect element resize event.
