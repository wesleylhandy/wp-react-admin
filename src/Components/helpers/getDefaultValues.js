/**
 * Takes in an object and fills with default values or returns existing value
 * @param {Boolean} editMode - only read existing config if in editMode
 * @param {String} type - "fonts, colors, spacing, email, form"
 * @param {Object} config - config file from DB or empty Object
 * @returns {Object} - config filled with defaults if values are missing
 */
export function getDefaultValues(editMode, type, config) {

    let defaultValues;
    
    switch (type.toLowerCase()) {
        case "fonts":
            defaultValues = {
                "--base-font-size": editMode && config.hasOwnProperty("--base-font-size") ? config["--base-font-size"] : '20px',
                "--base-font-family": editMode && config.hasOwnProperty("--base-font-family") ? config["--base-font-family"] : "proxima-nova, Arial, sans-serif",
                "--base-font-style": editMode && config.hasOwnProperty("--base-font-style") ? config["--base-font-style"]: "normal",
                "--base-font-weight": editMode && config.hasOwnProperty("--base-font-weight") ? config["--base-font-weight"] : "400",
                "--italic-font-family": editMode && config.hasOwnProperty("--italic-font-family") ? config["--italic-font-family"]: "proxima-nova, Arial, sans-serif",
                "--italic-font-style": editMode && config.hasOwnProperty("--italic-font-style") ? config["--italic-font-style"]: "italic",
                "--italic-font-weight": editMode && config.hasOwnProperty("--italic-font-weight") ? config["--italic-font-weight"]: "400",
                "--semibold-font-family": editMode && config.hasOwnProperty("--semibold-font-family") ? config["--semibold-font-family"]: "proxima-nova, Arial, sans-serif",
                "--semibold-font-style": editMode && config.hasOwnProperty("--semibold-font-style") ? config["--semibold-font-style"]: "normal",
                "--semibold-font-weight": editMode && config.hasOwnProperty("--semibold-font-weight") ? config["--semibold-font-weight"]: "600",
                "--semibold-italic-font-family": editMode && config.hasOwnProperty("--semibold-italic-font-family") ? config["--semibold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                "--semibold-italic-font-style": editMode && config.hasOwnProperty("--semibold-italic-font-style") ? config["--semibold-italic-font-style"]: "italic",
                "--semibold-italic-font-weight": editMode && config.hasOwnProperty("--semibold-italic-font-weight") ? config["--semibold-italic-font-weight"]: "600",
                "--bold-font-family": editMode && config.hasOwnProperty("--bold-font-family") ? config["--bold-font-family"]: "proxima-nova, Arial, sans-serif",
                "--bold-font-style": editMode && config.hasOwnProperty("--bold-font-style") ? config["--bold-font-style"]: "normal",
                "--bold-font-weight": editMode && config.hasOwnProperty("--bold-font-weight") ? config["--bold-font-weight"]: "700",
                "--bold-italic-font-family": editMode && config.hasOwnProperty("--bold-italic-font-family") ? config["--bold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                "--bold-italic-font-style": editMode && config.hasOwnProperty("--bold-italic-font-style") ? config["--bold-italic-font-style"]: "italic",
                "--bold-italic-font-weight": editMode && config.hasOwnProperty("--bold-italic-font-weight") ? config["--bold-italic-font-weight"]: "700",
                "--btn-font-family": editMode && config.hasOwnProperty("--btn-font-family") ? config["--btn-font-family"] : "proxima-nova, Arial, sans-serif",
                "--btn-font-style": editMode && config.hasOwnProperty("--btn-font-style") ? config["--btn-font-style"]: "normal",
                "--btn-font-weight": editMode && config.hasOwnProperty("--btn-font-weight") ? config["--btn-font-weight"] : "600",
                "--input-font-family": editMode && config.hasOwnProperty("--input-font-family") ? config["--input-font-family"]: "proxima-nova, Arial, sans-serif",
                "--input-font-style": editMode && config.hasOwnProperty("--input-font-style") ? config["--input-font-style"]: "normal",
                "--input-font-weight": editMode && config.hasOwnProperty("--input-font-weight") ? config["--input-font-weight"]: '400',
                "--label-font-family": editMode && config.hasOwnProperty("--label-font-family") ? config["--label-font-family"]: 'proxima-nova, Arial, sans-serif',
                "--label-font-style": editMode && config.hasOwnProperty("--label-font-style") ? config["--label-font-style"]: 'normal',
                "--label-font-weight": editMode && config.hasOwnProperty("--label-font-weight") ? config["--label-font-weight"]: "600",
                "--error-font-family": editMode && config.hasOwnProperty("--error-font-family") ? config["--error-font-family"]: "proxima-nova, Arial, sans-serif",
                "--error-font-style": editMode && config.hasOwnProperty("--error-font-style") ? config["--error-font-style"]: "normal",
                "--error-font-weight": editMode && config.hasOwnProperty("--error-font-weight") ? config["--error-font-weight"]: "700"
            }
            const keys = Object.keys(config)
            const externalFonts = keys.filter(k=> k.includes("externalFont"))
            externalFonts.forEach(externalFont=> defaultValues[externalFont] = config[externalFont] )
            break;
        case "colors":
            defaultValues = {
                "--primary-color": editMode && config.hasOwnProperty("--primary-color") ? config["--primary-color"] : "#1775BC",
                "--base-font-color": editMode && config.hasOwnProperty("--base-font-color") ? config["--base-font-color"]: "#333",
                "--base-bg-color": editMode && config.hasOwnProperty("--base-bg-color") ? config["--base-bg-color"] : "#333",
                "--form-bg-color": editMode && config.hasOwnProperty("--form-bg-color") ? config["--form-bg-color"] : '#fff',
                "--form-border-color": editMode && config.hasOwnProperty("--form-border-color") ? config["--form-border-color"]: 'transparent',
                "--form-text-color": editMode && config.hasOwnProperty("--form-text-color") ? config["--form-text-color"]: '#091d44',
                "--panel-bg-color": editMode && config.hasOwnProperty("--panel-bg-color") ? config["--panel-bg-color"] : '#f5f5f5',
                "--panel-border-color": editMode && config.hasOwnProperty("--panel-border-color") ? config["--panel-border-color"] : '#888',
                "--heading-color": editMode && config.hasOwnProperty("--heading-color") ? config["--heading-color"]: "#313131",
                "--label-color": editMode && config.hasOwnProperty("--label-color") ? config["--label-color"]: "#105fa5",
                "--error-color": editMode && config.hasOwnProperty("--error-color") ? config["--error-color"]: "crimson",
                "--input-bg-color": editMode && config.hasOwnProperty("--input-bg-color") ? config["--input-bg-color"]: '#fff',
                "--input-border-color": editMode && config.hasOwnProperty("--input-border-color") ? config["--input-border-color"] : '#ccc',
                "--input-text-color": editMode && config.hasOwnProperty("--input-text-color") ? config["--input-text-color"]: '#091d44',
                "--hover-bg-color": editMode && config.hasOwnProperty("--hover-bg-color") ? config["--hover-bg-color"]: '#fff',
                "--hover-border-color": editMode && config.hasOwnProperty("--hover-border-color") ? config["--hover-border-color"] : '#eb4d97',
                "--focus-box-shadow": editMode && config.hasOwnProperty("--focus-box-shadow") ? config["--focus-box-shadow"]: "rgba(235, 77, 151, .6)",
                "--placeholder-color": editMode && config.hasOwnProperty("--focus-box-shadow") ? config["--focus-box-shadow"]: '#7F8C9A',
                "--link-color": editMode && config.hasOwnProperty("--link-color") ? config["--link-color"]: "#1775BC",
                "--link-hover-color": editMode && config.hasOwnProperty("--link-hover-color") ? config["--link-hover-color"]: "#66afe9",
                "--btn-text-color": editMode && config.hasOwnProperty("--btn-text-color") ? config["--btn-text-color"] : '#fff'
            }
            break;
        case "spacing":
            defaultValues = {
                "--form-border-radius": editMode && config.hasOwnProperty("--form-border-radius") ? config["--form-border-radius"]: "20px",
                "--form-border-width": editMode && config.hasOwnProperty("--form-border-width") ? config["--form-border-width"]: '2px',
                "--form-padding": editMode && config.hasOwnProperty("--form-padding") ? config["--form-padding"] : '0',
                "--panel-border-radius": editMode && config.hasOwnProperty("--panel-border-radius") ? config["--panel-border-radius"]: "0",
                "--panel-border-width": editMode && config.hasOwnProperty("--panel-border-width") ? config["--panel-border-width"]: '0',
                "--panel-padding": editMode && config.hasOwnProperty("--panel-padding") ? config["--panel-padding"]: '10px',
                "--panel-space-between": editMode && config.hasOwnProperty("--panel-space-between") ? config["--panel-space-between"]: "20px"
            }
            break;
        case "email":
            defaultValues = {}
            break;
        case "form":
            defaultValues = {}
            break;
    }

    return defaultValues;

}