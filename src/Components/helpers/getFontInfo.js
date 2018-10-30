/**
 * Function that expects to receive a boolean flag plus an object of key/value pairs that represent css variable declarations for font-family
 * @param {Boolean} editMode 
 * @param {String} key - key to search for withing config
 * @param {Object} cssConfig 
 * @returns {Object} - fontInfo.fonts = Array, fontInfo.count = Number
 */
export function getFontInfo(editMode = false, key = "", config = {}){
    if (editMode && key) {
        const fontKeys = Object.keys(config)
        const fontInfo = fontKeys.filter(el=> el.includes(key)).reduce((acc, font)=> {
            if ( acc.fonts.indexOf(config[font]) < 0 ) {
                acc.fonts.push(config[font]);
                acc.count++
            }
            return acc
        }, { fonts: [], count: 0 })
        return fontInfo
    } else {
        return { fonts: [], count: 0}
    }
}