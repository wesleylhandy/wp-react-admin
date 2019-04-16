import React from 'react';
import { SketchPicker } from 'react-color';

import styles from './styles/color-picker.css'

function ColorPicker({color, field, handlePickerChange}) {
    return (
        <div styleName="styles.color-picker">
            <SketchPicker
                color={ color }
                onChangeComplete={ (newColor) => handlePickerChange(field, newColor) }
            />
        </div>
    )
}

export default ColorPicker;