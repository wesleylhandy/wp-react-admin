const defaultMarkDown = `# This is an h1 header 
## This is an h2 header
**This is Bold**, *This is Italicized*, This is plain text

1. This is an ordered list
2. Next item

* This is an unordered list
* Next Item

Click &ldquo;Preview&rdquo; -> to see more!

[This is a link](http://www1.cbn.com)`;

const defaultHTML = `<h1 id="this-is-an-h1-header">This is an h1 header</h1>
<h2 id="this-is-an-h2-header">This is an h2 header</h2>
<p><strong>This is Bold</strong>, <em>This is Italicized</em>, This is plain text</p>
<ol>
<li>This is an ordered list</li>
<li>Next item</li>
</ol>
<ul>
<li>This is an unordered list</li>
<li>Next Item</li>
</ul>
<p>Click &ldquo;Preview&rdquo; -&gt; to see more!</p>
<p><a href="http://www1.cbn.com">This is a link</a></p>`

/**
 * Takes in an object and fills with default values or returns existing value
 * @param {Boolean} editMode - only read existing config if in editMode
 * @param {String} type - "fonts, colors, spacing, email, form"
 * @param {Object} config - config file from DB or empty Object
 * @returns {Object} - config filled with defaults if values are missing
 */
export function getDefaultValues(editMode, type, config) {

    let defaultValues, errors;
    
    switch (type.toLowerCase()) {
        case "fonts":
            defaultValues = {
                "--form-font-family": editMode && config.hasOwnProperty("--form-font-family") ? config["--form-font-family"] : "proxima-nova, Arial, sans-serif",
                "--form-font-style": editMode && config.hasOwnProperty("--form-font-style") ? config["--form-font-style"]: "normal",
                "--form-font-weight": editMode && config.hasOwnProperty("--form-font-weight") ? config["--form-font-weight"] : "400",
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
                "--bold-italic-font-weight": editMode && config.hasOwnProperty("--bold-italic-font-weight") ? config["--bold-italic-font-weight"]: "700"
            }
            const keys = config ? Object.keys(config) : []
            const externalFonts = keys.length ? keys.filter(k=> k.includes("externalFont")) : [];
            externalFonts.forEach(externalFont=> defaultValues[externalFont] = config[externalFont] )
            break;
        case "colors":
            defaultValues = {
                "--primary-color": editMode && config.hasOwnProperty("--primary-color") ? config["--primary-color"] : "#1775BC",
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
                "--placeholder-color": editMode && config.hasOwnProperty("--placeholder-color") ? config["--placeholder-color"]: '#7F8C9A',
                "--link-color": editMode && config.hasOwnProperty("--link-color") ? config["--link-color"]: "#1775BC",
                "--link-hover-color": editMode && config.hasOwnProperty("--link-hover-color") ? config["--link-hover-color"]: "#66afe9",
                "--btn-text-color": editMode && config.hasOwnProperty("--btn-text-color") ? config["--btn-text-color"] : '#fff',
                "--amt-tab-bg-color": editMode && config.hasOwnProperty("----amt-tab-bg-color") ? config["----amt-tab-bg-color"] :"transparent",
                "--amt-tab-hover-bg-color": editMode && config.hasOwnProperty("--amt-tab-hover-bg-color") ? config["--amt-tab-hover-bg-color"] :"#73bf43",
                "--amt-tab-text-color": editMode && config.hasOwnProperty("--amt-tab-text-color") ? config["--amt-tab-text-color"] :"#091d44",
                "--tab-bg-color": editMode && config.hasOwnProperty("--tab-bg-color") ? config["--tab-bg-color"] :"transparent",
                "--tab-border-color": editMode && config.hasOwnProperty("--tab-border-color") ? config["--tab-border-color"] :"#73bf43",
                "--tab-hover-text-color": editMode && config.hasOwnProperty("--tab-hover-text-color") ? config["--tab-hover-text-color"] :"#fff",
                "--tab-hover-bg-color": editMode && config.hasOwnProperty("--tab-hover-bg-color") ? config["--tab-hover-bg-color"] :"#73bf43",
                "--tab-hover-border-color": editMode && config.hasOwnProperty("--tab-hover-border-color") ? config["--tab-hover-border-color"] :"#091d44",
                "--tab-text-color": editMode && config.hasOwnProperty("--tab-text-color") ? config["--tab-text-color"] :"#091d44",
                "--submit-btn-bg-color": editMode && config.hasOwnProperty("--submit-btn-bg-color") ? config["--submit-btn-bg-color"] : "#262626",
                "--submit-btn-border-color": editMode && config.hasOwnProperty("--submit-btn-border-color") ? config["--submit-btn-border-color"] : "#262626",
                "--submit-btn-txt-color": editMode && config.hasOwnProperty("--submit-btn-txt-color") ? config["--submit-btn-txt-color"] : "#fff",
                "--submit-btn-hover-txt-color": editMode && config.hasOwnProperty("--submit-btn-hover-txt-color") ? config["--submit-btn-hover-txt-color"] : "#262626",
                "--submit-btn-hover-bg-color": editMode && config.hasOwnProperty("--submit-btn-hover-bg-color") ? config["--submit-btn-hover-bg-color"] : "#fff",
                "--submit-btn-hover-border-color": editMode && config.hasOwnProperty("--submit-btn-hover-border-color") ? config["--submit-btn-hover-border-color"] : "#262626"
            }
            break;
        case "spacing":
            defaultValues = {
                "--btn-border-radius": editMode && config.hasOwnProperty("--btn-border-radius") ? config["--btn-border-radius"]: "0",
                "--amt-tab-border-radius": editMode && config.hasOwnProperty("--amt-tab-border-radius") ? config["--amt-tab-border-radius"] :"4px",
                "--tab-border-radius": editMode && config.hasOwnProperty("--tab-border-radius") ? config["--tab-border-radius"] :"4px",
                "--input-border-radius": editMode && config.hasOwnProperty("--input-border-radius") ? config["--input-border-radius"]: "0",
                "--form-border-radius": editMode && config.hasOwnProperty("--form-border-radius") ? config["--form-border-radius"]: "20px",
                "--form-border-width": editMode && config.hasOwnProperty("--form-border-width") ? config["--form-border-width"]: '2px',
                "--form-max-width": editMode && config.hasOwnProperty("--form-max-width") ? config["--form-max-width"]: '680px',
                "--form-padding": editMode && config.hasOwnProperty("--form-padding") ? config["--form-padding"] : '0',
                "--panel-border-radius": editMode && config.hasOwnProperty("--panel-border-radius") ? config["--panel-border-radius"]: "0",
                "--panel-border-width": editMode && config.hasOwnProperty("--panel-border-width") ? config["--panel-border-width"]: '0',
                "--panel-padding": editMode && config.hasOwnProperty("--panel-padding") ? config["--panel-padding"]: '10px',
                "--panel-space-between": editMode && config.hasOwnProperty("--panel-space-between") ? config["--panel-space-between"]: "20px"
            }
            break;
        case "emails":
            defaultValues = {
                fields: {
                    EmailSubjectLine: editMode && config.hasOwnProperty('EmailSubjectLine') ? config.EmailSubjectLine : "", 
                    header: editMode && config.hasOwnProperty('header') ? config.header : `<img src="https://source.unsplash.com/900x300/?art,color" alt="Random Unsplash Colorful and Artistic Image"/>`,
                    headerMarkdown: editMode && config.hasOwnProperty('headerMarkdown') ? config.headerMarkdown : `![Random Unsplash Colorful and Artistic Image](https://source.unsplash.com/900x300/?art,color)`,
                    single: editMode && config.hasOwnProperty('single') ? config.single : defaultHTML,
                    singleMarkdown: editMode && config.hasOwnProperty('singleMarkdown') ? config.singleMarkdown : defaultMarkDown,
                    monthly: editMode && config.hasOwnProperty('monthly') ? config.monthly : defaultHTML,
                    monthlyMarkdown: editMode && config.hasOwnProperty('monthlyMarkdown') ? config.monthlyMarkdown : defaultMarkDown,
                    product: editMode && config.hasOwnProperty('product') ? config.product : defaultHTML,
                    productMarkdown: editMode && config.hasOwnProperty('productMarkdown') ? config.productMarkdown : defaultMarkDown
                },
                errors: {
                    EmailSubjectLine: '',
                    header: '',
                    single: '',
                    monthly: '',
                    product: '',
                    formError: ''
                }
            }
            break;
        case "settings":
            defaultValues = {
                fields: {
                    thankYouUrl: editMode && config.hasOwnProperty("thankYouUrl") ? config.thankYouUrl : '',
                    AddContactYN: editMode && config.hasOwnProperty("AddContactYN") ? config.AddContactYN : "Y",
                    ContactSource: editMode && config.hasOwnProperty("ContactSource") ? config.ContactSource : '',
                    SectionName: editMode && config.hasOwnProperty("SectionName") ? config.SectionName : '',
                    ActivityName : editMode && config.hasOwnProperty("ActivityName") ? config.ActivityName : '',
                    showSeals: editMode && config.hasOwnProperty("showSeals") ? config.showSeals : false,
                    form_status: config.form_status
                },
                errors : {
                    thankYouUrl: '',
                    AddContactYN: '',
                    ContactSource: '',
                    SectionName: '',
                    ActivityName: '',
                    formError: '',
                    form_status: ''
                }
            }
            break;
        case "name/address":
            defaultValues = {
                fields: {
                    getMiddleName: editMode && config.hasOwnProperty("getMiddleName") ? config.getMiddleName : false,
                    getSuffix: editMode && config.hasOwnProperty("getSuffix") ? config.getSuffix: false,
                    getSpouseInfo: editMode && config.hasOwnProperty("getSpouseInfo") ? config.getSpouseInfo : false,
                    getPhone: editMode && config.hasOwnProperty("getPhone") ? config.getPhone : true,
                    international: editMode && config.hasOwnProperty("international") ? config.international : true,
                    shipping: editMode && config.hasOwnProperty("shipping") ? config.shipping: true
                },
                errors: {
                    formError: '',
                }
            }
            break;
        case "gifts":
            const monthlyPledgeData = {
                DetailName: editMode && config.hasOwnProperty('monthlyPledgeData') ? config.monthlyPledgeData.DetailName: '',
                DetailDescription: editMode && config.hasOwnProperty('monthlyPledgeData') ? config.monthlyPledgeData.DetailDescription: '',
                DetailCprojCredit: editMode && config.hasOwnProperty('monthlyPledgeData') ? config.monthlyPledgeData.DetailCprojCredit: '',
                DetailCprojMail: editMode && config.hasOwnProperty('monthlyPledgeData') ? config.monthlyPledgeData.DetailCprojMail: '', 
            }
            const singlePledgeData = {
                DetailName: editMode && config.hasOwnProperty('singlePledgeData') ? config.monthlyPledgeData.DetailName: '',
                DetailDescription:editMode && config.hasOwnProperty('singlePledgeData') ? config.monthlyPledgeData.DetailDescription: '',
                DetailCprojCredit: editMode && config.hasOwnProperty('singlePledgeData') ? config.monthlyPledgeData.DetailCprojCredit: '',
                DetailCprojMail: editMode && config.hasOwnProperty('singlePledgeData') ? config.monthlyPledgeData.DetailCprojMail: '', 
             }
            defaultValues = {
                fields: {
                    monthlyPledgeData,
                    singlePledgeData,
                    showGivingArray: editMode && config.hasOwnProperty("showGivingArray") ? config.showGivingArray : true,
                    monthlyOption: editMode && config.hasOwnProperty("monthlyOption") ? config.monthlyOption : true,
                    singleOption: editMode && config.hasOwnProperty("singleOption") ? config.singleOption : true,
                    monthlyAmounts: editMode && config.hasOwnProperty("monthlyAmounts") ? [...config.monthlyAmounts] : [],
                    singleAmounts: editMode && config.hasOwnProperty("singleAmounts") ? [...config.singleAmounts] : [],
                    defaultOption: editMode && config.hasOwnProperty("defaultOption") ? config.defaultOption : "",
                    defaultAmount: editMode && config.hasOwnProperty("defaultAmount") ? config.defaultAmount : -1,
                    givingFormat: editMode && config.hasOwnProperty("givingFormat") ? config.givingFormat : "buttons"
                }, 
                errors: {
                    monthlyPledgeData : {
                        DetailName: '',
                        DetailDescription: '',
                        DetailCprojCredit: '',
                        DetailCprojMail: ''
                    },
                    singlePledgeData : {
                        DetailName: '',
                        DetailDescription: '',
                        DetailCprojCredit: '',
                        DetailCprojMail: ''
                    },
                    showGivingArray: '',
                    monthlyOption: '',
                    singleOption: '',
                    monthlyAmounts: '',
                    singleAmounts: '',
                    defaultOption: '',
                    defaultAmount: '',
                    givingFormat: ''
                }
            }
            if (editMode) {
                for (let i = 0; i < defaultValues.fields.monthlyAmounts.length; i++) {
                    defaultValues.fields["monthlyAmt-" + i] = config.monthlyAmounts[i]
                    defaultValues.errors["monthlyAmt-" + i] = '';
                }
                for (let j = 0; j < defaultValues.fields.singleAmounts.length; j++) {
                    defaultValues.fields["singleAmt-" + j] = config.singleAmounts[j]
                    defaultValues.errors["singleAmt-" + j] = '';
                }
            }
            break;
        case "products":
            errors = {
                addProducts: '',
                numProducts: '',
                products: [],
                additionalGift: {
                    "display": '',
                    "additionalGiftMessage": '',
                    "DetailDescription": '',
                    "DetailCprojMail": '',
                    "DetailName":''
                }
            }
            defaultValues = {
                fields: {
                    addProducts: editMode && config.hasOwnProperty("numProducts") ? config.numProducts > 0 : false,
                    numProducts: editMode && config.hasOwnProperty("products") ? config.products.length : 0,
                    products: editMode && config.hasOwnProperty("products") ? [...config.products] : [],
                    "additionalGift": editMode && config.hasOwnProperty("additionalGift") ? {...config.additionalGift} : {
                        "display": false,
                        "additionalGiftMessage": "",
                        "DetailDescription": "",
                        "DetailCprojCredit": "",
                        "DetailCprojMail": "",
                        "DetailName": ""
                    },
                },
                errors
            }
            for (let i = 0; i < defaultValues.fields.products.length; i++) {
                defaultValues.errors.products.push({
                    productTitle: '',
                    productMessage: '',
                    productImgUrl: '',
                    DetailName: '',
                    DetailCprojMail: '',
                    DetailCprojCredit: '',
                    DetailDescription: '',
                    PledgeAmt:''
                });
            }
            break;
        case "designations":
            errors = {
                addFunds: '',
                numFunds: '',
                funds: []
            }
            defaultValues = {
                fields: {
                    addFunds: editMode && config.hasOwnProperty("numFunds") ? config.numFunds > 0 : false,
                    numFunds: editMode && config.hasOwnProperty("funds") ? config.funds.length : 0,
                    funds: editMode && config.hasOwnProperty("funds") ? [...config.funds] : []
                },
                errors
            }
            for (let i = 0; i < defaultValues.fields.funds.length; i++) {
                defaultValues.errors.funds.push({
                    fundTitle: '',
                    fundDescription: '',
                    DetailName: '',
                    DetailCprojMail: '',
                    DetailCprojCredit: '',
                    DetailDescription: ''
                });
            }
            break;
        case "subscriptions":
            errors = {
                subscriptions: []
            }
            defaultValues = {
                fields: {
                    subscriptions: editMode && config.hasOwnProperty("subscriptions") ? [...config.subscriptions] : []
                }, 
                errors
            }
            for (let i = 0; i < defaultValues.fields.subscriptions.length; i++) {
                defaultValues.errors.subscriptions.push({key: '', value : ''});
            }
            break;
    }
    return defaultValues;
}