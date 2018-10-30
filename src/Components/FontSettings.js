import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

/**
 * Function that expects to receive a boolean flag plus an object of key/value pairs that represent css variable declarations for font-family
 * @param {Boolean} editMode 
 * @param {String} key - key to search for withing config
 * @param {Object} cssConfig 
 * @returns {Object} - fontInfo.fonts = Array, fontInfo.count = Number
 */
function getFontInfo(editMode = false, key = "", cssConfig = {}){
    if (editMode && key) {
        const fontKeys = Object.keys(cssConfig)
        const fontInfo = fontKeys.filter(el=> el.includes(key)).reduce((acc, font)=> {
            if ( acc.fonts.indexOf(cssConfig[font]) < 0 ) {
                acc.fonts.push(cssConfig[font]);
                acc.count++
            }
            return acc
        }, { fonts: [], count: 0 })
        return fontInfo
    } else {
        return { fonts: [], count: 0}
    }
}


export default class FontSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        const { fonts, count: numFonts } = getFontInfo(editMode, "font-family", props.cssConfig)
        const { fonts: externalFonts, count: numExternalFonts } = getFontInfo(editMode, "externalFont", props.cssConfig)
        this.state = {
            
            updated: false,
            saved: false,
            fields: {
                defaults: {
                    "--base-font-family": editMode ? props.cssConfig["--base-font-family"] : "proxima-nova, Arial, sans-serif",
                    "--base-font-style": editMode ? props.cssConfig["--base-font-style"]: "normal",
                    "--base-font-weight": editMode ? props.cssConfig["--base-font-weight"] : "400",
                    "--italic-font-family": editMode ? props.cssConfig["--italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--italic-font-style": editMode ? props.cssConfig["--italic-font-style"]: "italic",
                    "--italic-font-weight": editMode ? props.cssConfig["--italic-font-weight"]: "400",
                    "--semibold-font-family": editMode ? props.cssConfig["--semibold-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--semibold-font-style": editMode ? props.cssConfig["--semibold-font-style"]: "normal",
                    "--semibold-font-weight": editMode ? props.cssConfig["--semibold-font-weight"]: "600",
                    "--semibold-italic-font-family": editMode ? props.cssConfig["--semibold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--semibold-italic-font-style": editMode ? props.cssConfig["--semibold-italic-font-style"]: "italic",
                    "--semibold-italic-font-weight": editMode ? props.cssConfig["--semibold-italic-font-weight"]: "600",
                    "--bold-font-family": editMode ? props.cssConfig["--bold-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--bold-font-style": editMode ? props.cssConfig["--bold-font-style"]: "normal",
                    "--bold-font-weight": editMode ? props.cssConfig["--bold-font-weight"]: "700",
                    "--bold-italic-font-family": editMode ? props.cssConfig["--bold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--bold-italic-font-style": editMode ? props.cssConfig["--bold-italic-font-style"]: "italic",
                    "--bold-italic-font-weight": editMode ? props.cssConfig["--bold-italic-font-weight"]: "700",
                    "--btn-font-family": editMode ? props.cssConfig["--btn-font-family"] : "proxima-nova, Arial, sans-serif",
                    "--btn-font-style": editMode ? props.cssConfig["--btn-font-style"]: "normal",
                    "--btn-font-weight": editMode ? props.cssConfig["--btn-font-weight"] : "600",
                    "--input-font-family": editMode ? props.cssConfig["--input-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--input-font-style": editMode ? props.cssConfig["--input-font-style"]: "normal",
                    "--input-font-weight": editMode ? props.cssConfig["--input-font-weight"]: '400',
                    "--label-font-family": editMode ? props.cssConfig["--label-font-family"]: 'proxima-nova, Arial, sans-serif',
                    "--label-font-style": editMode ? props.cssConfig["--label-font-style"]: 'normal',
                    "--label-font-weight": editMode ? props.cssConfig["--label-font-weight"]: "600",
                    "--error-font-family": editMode ? props.cssConfig["--error-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--error-font-style": editMode ? props.cssConfig["--error-font-style"]: "normal",
                    "--error-font-weight": editMode ? props.cssConfig["--error-font-weight"]: "700"
                },
                "--base-font-size": editMode ? props.cssConfig["--base-font-size"] : '20px',
                numFonts,
                fonts,
                externalFonts,
                numExternalFonts
            },
            errors: {
                defaults: {
                    "--base-font-family": "",
                    "--base-font-style": "",
                    "--base-font-weight": "",
                    "--italic-font-family": "",
                    "--italic-font-style": "",
                    "--italic-font-weight": "",
                    "--semibold-font-family": "",
                    "--semibold-font-style": "",
                    "--semibold-font-weight": "",
                    "--semibold-italic-font-family": "",
                    "--semibold-italic-font-style": "",
                    "--semibold-italic-font-weight": "",
                    "--bold-italic-font-family": "",
                    "--bold-italic-font-style": "",
                    "--bold-italic-font-weight": "",
                    "--bold-font-family": "",
                    "--bold-font-style": "",
                    "--bold-font-weight": "",
                    "--btn-font-family": "",
                    "--btn-font-style": "",
                    "--btn-font-weight": "",
                    "--input-font-family": "",
                    "--input-font-style": "",
                    "--input-font-weight": "",
                    "--label-font-family": "",
                    "--label-font-style": "",
                    "--label-font-weight": "",
                    "--error-font-family": "",
                    "--error-font-style": "",
                    "--error-font-weight": ""
                },
                "--base-font-size": "",
                numFonts: '',
                fonts: fonts.map(el => ''),
                numExternalFonts: '',
                externalFonts: externalFonts.map(el => '')
            }            
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderFontInputs = this.renderFontInputs.bind(this)
        this.renderDefaults = this.renderDefaults.bind(this)
    }


    handleButtonClick(e, ctx) {
        
    }


    handleInputChange(e) {
       
    }

    /**
     * Creates several inputs per type and number passed to function
     * @param {Number} num - Single Digit Integer >= 0
     * @param {String} type - either "fonts" or "externalFont"
     * @returns {jsx}
     */
    renderFontInputs(num, type) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            return (
                <React.Fragment key={`${type}-${ind}`}>
                    <InputGroup
                        type="text"
                        id={`${type}-${ind}`}
                        specialStyle="" 
                        label={`Enter ${type.substring(0, type.length - 1)} ${ind+1}: ${type == "fonts" ? "CSS" : "URL"}`}
                        placeholder={type == "fonts" ? "proxima-nova, Arial, sans-serif" : "https://use.typekit.net/zon7onf.css"}
                        maxLength={1} 
                        required={true} 
                        value={this.state.fields[type][ind]} 
                        handleInputChange={this.handleInputChange} 
                        error={this.state.errors[type][ind]} 
                    />
                </React.Fragment>
            )
        })
    }

    renderDefaults(defaults) {
        const fieldNames = Object.keys(defaults);
        const groups = fieldNames.reduce((acc, name) => {
            const fieldGroup = name.substring(2).split("-")[0];
            if ( !acc[fieldGroup] ) {
                acc[fieldGroup] = [name]
            } else {
                acc[fieldGroup].push(name)
            }
            return acc
        }, {})
        const returnArray = [];
        for ( let group in groups) {
            returnArray.push(groups[group].map((el, ind)=>{
                return (
                    <div key={`${group}-${ind}`} styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`defaults-${el}`}
                            specialStyle="" 
                            label={el.substring(2)}
                            placeholder="CSS"
                            maxLength={32} 
                            required={true} 
                            value={this.state.defaults[el]} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.defaults[el]} 
                        />
                    </div>
                )
            }));
        }
        return returnArray.map((arr, i)=>{
            return (
                <fieldset key={`groups-${i}`} styleName='form.fieldset__bordered'>
                    {arr}
                </fieldset>
            )
        })
    }
   
    render() {
        const {fields, errors} = this.state;
        console.log({externalFonts: fields.externalFonts, numExternalFonts: fields.numExternalFonts, fonts: fields.fonts, numFonts: fields.numFonts})
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Style Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="--base-font-size"
                                specialStyle="" 
                                label="Base Font Size"
                                placeholder="19px or 20px recommended" 
                                maxLength={4} 
                                required={true} 
                                value={fields["--base-font-size"]} 
                                handleInputChange={this.handleInputChange} 
                                error={errors["--base-font-size"]} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="numFonts"
                                specialStyle="" 
                                label="How many Fonts do you want to use?"
                                placeholder="1 or more" 
                                maxLength={1} 
                                required={true} 
                                value={fields["numFonts"]} 
                                handleInputChange={this.handleInputChange} 
                                error={errors["numFonts"]} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            {
                                this.renderFontInputs(fields.numFonts, 'fonts')
                            }
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="numExternalFonts"
                                specialStyle="" 
                                label="Of these, how many are external fonts?"
                                placeholder="0 or more" 
                                maxLength={1} 
                                required={true} 
                                value={fields["numExternalFonts"]} 
                                handleInputChange={this.handleInputChange} 
                                error={errors["numExternalFonts"]} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            {
                                this.renderFontInputs(fields.numExternalFonts, "externalFonts")
                            }
                        </div>
                    </fieldset>
                    {
                        fields.numFonts > 1 ? (
                            <fieldset>
                                <h3>Please Specify Font Usage Below</h3>
                                {
                                    this.renderDefaults(fields.defaults)
                                }
                            </fieldset>
                        ) : null
                    }
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: "store", val: '', type: 'cssConfig'}} />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}