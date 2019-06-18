# React Compare Image

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

Simple React component to compare two images using slider.

![img](https://react-compare-image.yuuniworks.com/anime.gif)

NOTE: [Vue.js Version](https://github.com/junkboy0315/vue-compare-image) is also available!

## Demo

[DEMO](https://react-compare-image.yuuniworks.com/)

## Install

`yarn add react-compare-image`

Note: use `v0.*.*` If you are using React **v.16.7 or older**.

`yarn add react-compare-image@^0.8.2`

## Features

- Simple
- Responsive (fit to the parent width)
- Size difference between two images handled correctly. Element size determined by following two factors:
  - width of the parent
  - right image's aspect ratio

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

| Prop (\* required)       | type           |  default  | description                                                                                                 |
| ------------------------ | -------------- | :-------: | ----------------------------------------------------------------------------------------------------------- |
| leftImage \*             | string         |   null    | left image's url                                                                                            |
| rightImage \*            | string         |   null    | right image's url                                                                                           |
| sliderPositionPercentage | number (float) |    0.5    | Default line position (from 0 to 1)                                                                         |
| sliderLineWidth          | number (px)    |     2     | line width of slider (by pixel)                                                                             |
| sliderLineColor          | string         | "#ffffff" | line color of slider                                                                                        |
| leftImageCss             | object         |    {}     | Additional css for left image                                                                               |
| rightImageCss            | object         |    {}     | Additional css for right image                                                                              |
| leftImageLabel           | string         |   null    | (>=v1.2.0) Label for the image (e.g. `before`)                                                              |
| rightImageLabel          | string         |   null    | (>=v1.2.0) Label for the image (e.g. `after`)                                                               |
| handle                   | element        |   null    | (>=v1.2.0) Custom handle element. Just pass `<React.Fragment />` if you want to remove handle.              |
| handleSize               | number (px)    |    40     | diameter of slider handle (by pixel)                                                                        |
| hover                    | boolean        |   false   | Whether to slide at hover                                                                                   |
| skeleton                 | element        |   null    | Element displayed while image is loading                                                                    |
| autoReloadSpan           | number (ms)    |   null    | If specified, the image is loaded again at the interval specified when loading images failed                |
| autoReloadLimit          | number (count) |    10     | Limitation on automatic reload retry count                                                                  |
| onSliderPositionChange   | function       |   null    | Callback function called each time the slider changes. The position (0 to 1) of the slider is passed as arg |

## Dependencies

- [css-element-queries](https://github.com/marcj/css-element-queries) to detect element resize event.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://www.yuuniworks.com/"><img src="https://avatars0.githubusercontent.com/u/10986861?v=4" width="100px;" alt="Shota Tamura"/><br /><sub><b>Shota Tamura</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/issues?q=author%3Ajunkboy0315" title="Bug reports">🐛</a> <a href="https://github.com/junkboy0315/react-compare-image/commits?author=junkboy0315" title="Code">💻</a> <a href="https://github.com/junkboy0315/react-compare-image/commits?author=junkboy0315" title="Documentation">📖</a></td><td align="center"><a href="http://franciscomartinez.website"><img src="https://avatars1.githubusercontent.com/u/20175841?v=4" width="100px;" alt="Francisco Martinez"/><br /><sub><b>Francisco Martinez</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/commits?author=francismartinez" title="Code">💻</a></td><td align="center"><a href="https://github.com/tim-field"><img src="https://avatars3.githubusercontent.com/u/1326910?v=4" width="100px;" alt="Tim Field"/><br /><sub><b>Tim Field</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/issues?q=author%3Atim-field" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/OscarCR88"><img src="https://avatars0.githubusercontent.com/u/42785228?v=4" width="100px;" alt="OscarCR88"/><br /><sub><b>OscarCR88</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/commits?author=OscarCR88" title="Code">💻</a></td><td align="center"><a href="https://github.com/tasnimAlam"><img src="https://avatars1.githubusercontent.com/u/22883823?v=4" width="100px;" alt="Md. Tasnim Alam"/><br /><sub><b>Md. Tasnim Alam</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/commits?author=tasnimAlam" title="Code">💻</a></td><td align="center"><a href="https://github.com/janedotbiz"><img src="https://avatars2.githubusercontent.com/u/5113432?v=4" width="100px;" alt="Jane Meredith"/><br /><sub><b>Jane Meredith</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/commits?author=janedotbiz" title="Code">💻</a></td><td align="center"><a href="https://github.com/teddywsi"><img src="https://avatars2.githubusercontent.com/u/49923665?v=4" width="100px;" alt="teddywsi"/><br /><sub><b>teddywsi</b></sub></a><br /><a href="https://github.com/junkboy0315/react-compare-image/commits?author=teddywsi" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
