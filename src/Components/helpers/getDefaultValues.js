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
            const keys = config ? Object.keys(config) : []
            const externalFonts = keys.length ? keys.filter(k=> k.includes("externalFont")) : [];
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
            defaultValues = {
                header: editMode && config.hasOwnProperty('header') ? config.header : "<body><table width='553' border='0' align='center' cellpadding='0' cellspacing='5'><tr><td height='43' align='left' valign='top'><img src='http://www.cbn.com/images/CBN-header-email.gif' alt='CBN.com' width='553' height='41' /></td></tr><tr><td align='left' valign='top'>",
                single: editMode && config.hasOwnProperty('single') ? config.single : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />",
                monthly: editMode && config.hasOwnProperty('monthly') ? config.monthly : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />",
                product: editMode && config.hasOwnProperty('product') ? config.products : "<p>Dear #FirstName#,</p><p>Thank you for giving to CBN. It is with the help of friends like you that CBN is able to take  the Gospel to the nations - and people are hearing a message of hope in Jesus  Christ.&nbsp; Every day, through <em>The 700 Club</em>,  CBN News, and other CBN programs, the truth of God's Word is being broadcast to  precious people through satellite, terrestrial television, and cable, as well  as the Internet.</p><p>Thank you for your  help in making all of this possible. May God richly bless you for your  faithfulness to Him.</p><p>In Christ,<br /><img src='http://www.cbn.com/images/PRobertson_signature.jpg' alt='Signature' width='124' height='49' /><br />Pat Robertson<br /></p><p><a href='http://www1.cbn.com/cbn-partners'>Find out more about CBN Ministries</a></p><hr />",
            }
            break;
        case "settings":
            defaultValues = {
                thankYouUrl: editMode && config.hasOwnProperty("thankYouUrl") ? config.thankYouUrl : '',
                AddContactYN: editMode && config.hasOwnProperty("AddContactYN") ? config.AddContactYN : "Y",
                ContactSource: editMode && config.hasOwnProperty("ContactSource") ? config.ContactSource : '',
                SectionName: editMode && config.hasOwnProperty("SectionName") ? config.SectionName : '',
                ActivityName : editMode && config.hasOwnProperty("ActivityName") ? config.ActivityName : '',
                MotivationText: editMode && config.hasOwnProperty("MotivationText") ? config.MotivationText : '042712'
            }
            break;
        case "name/address":
            defaultValues = {
                getMiddleName: editMode && config.hasOwnProperty("getMiddleName") ? config.getMiddleName : false,
                getSuffix: editMode && config.hasOwnProperty("getSuffix") ? config.getSuffix: false,
                getSpouseInfo: editMode && config.hasOwnProperty("getSpouseInfo") ? config.getSpouseInfo : false,
                getPhone: editMode && config.hasOwnProperty("getPhone") ? config.getPhone : true,
                international: editMode && config.hasOwnProperty("international") ? config.international : true,
                shipping: editMode && config.hasOwnProperty("shipping") ? config.shipping: true
            }
            break;
        case "gifts":
            defaultValues = {
                showGivingArray: editMode && config.hasOwnProperty("showGivingArray") ? config.showGivingArray : true,
                monthlyOption: editMode && config.hasOwnProperty("monthlyOption") ? config.monthlyOption : true,
                singleOption: editMode && config.hasOwnProperty("singleOption") ? config.singleOption : true,
                numMonthlyAmounts: editMode && config.hasOwnProperty("monthlyAmounts") ? config.monthlyAmounts.length : 0,
                monthlyAmounts: editMode && config.hasOwnProperty("monthlyAmounts") ? [...config.monthlyAmounts] : [],
                numSingleAmounts: editMode && config.hasOwnProperty("singleAmounts") ? config.singleAmounts : 0,
                singleAmounts: editMode && config.hasOwnProperty("singleAmounts") ? [...config.singleAmounts] : [],
                defaultOption: editMode && config.hasOwnProperty("defaultOption") ? config.defaultOption : "",
                defaultAmount: editMode && config.hasOwnProperty("defaultAmount") ? config.defaultAmount : -1
            }
            break;
        case "products":
            defaultValues = {
                addProducts: editMode && config.hasOwnProperty("numProducts") ? config.numProducts > 0 : false,
                numProducts: editMode && config.hasOwnProperty("numProducts") ? config.numProducts : 0,
                products: editMode && config.hasOwnProperty("products") ? [...config.products] : []
            }
            break;
        case "funds":
            defaultValues = {
                addFunds: editMode && config.hasOwnProperty("numFunds") ? config.numFunds > 0 : false,
                numFunds: editMode && config.hasOwnProperty("numFunds") ? config.numFunds : 0,
                funds: editMode && config.hasOwnProperty("funds") ? [...config.funds] : []
            }
            break;
        case "subscriptions":
            defaultValues = {
                subscriptions: editMode && config.hasOwnProperty("subscriptions") ? [...config.subscriptions] : []
            }
            break;
    }

    return defaultValues;

}