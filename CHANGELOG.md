# Change Log

## [2.0.0] - 2019-10-20

### Breaking Changes

- Container's aspect ratio decision logic has changed.
  - With previous versions(version 0, 1), When displaying two images with different aspect ratios, container's aspect ratio was determined by the aspect retio of the **right side image**
  - From version 2, container size will be determined by **taller image**'s aspect ratio.
  - You can change this behavior by setting `aspectRatio` props to `'taller'` or `'wider'`.
    <img src="https://user-images.githubusercontent.com/10986861/67077377-25b7c880-f1ca-11e9-9feb-fc5313ad696b.png" style="max-width: 500px">
  - `'taller'` means:
    - the **taller** image when the images are displayed with the **same width**.
  - `'wider'` means:
    - the **shorter** image when the images are displayed with the **same width**.
    - In other words, the **wider** image when the images are displayed with the **same height**.

### New Features

- Add vertical comparison feature. use the `'vertical'` prop.
- Hide labels properly.

## [1.0.0] - 2019-03-03

### Breaking Changes

- Quit support for React v.16.7 or older versions.
