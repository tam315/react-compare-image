import React from 'react';
interface IProps {
    aspectRatio?: 'taller' | 'wider';
    handle?: React.ReactNode;
    handleSize?: number;
    hover?: boolean;
    leftImage: string;
    leftImageAlt?: string;
    leftImageCss?: object;
    leftImageLabel?: string | React.ReactNode;
    leftImageLabelCss?: React.CSSProperties;
    onSliderPositionChange?: (position: number) => void;
    rightImage: string;
    rightImageAlt?: string;
    rightImageCss?: object;
    rightImageLabel?: string | React.ReactNode;
    rightImageLabelCss?: React.CSSProperties;
    skeleton?: React.ReactNode;
    sliderLineColor?: string;
    sliderLineWidth?: number;
    sliderPositionPercentage?: number;
    vertical?: boolean;
}
declare const ReactCompareImage: React.FC<IProps>;
export default ReactCompareImage;
