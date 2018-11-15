/**
 * Receives request for a type of Obj and fills with default values
 * @param {String} type - "fonts, colors, spacing, email, form"
 * @returns {Object} - obj filled with defaults
 */
export function getNewObj(type) {

    let newObj;
    
    switch (type.toLowerCase()) {
        case "funds":
            newObj = {
                Title: '',
                FundDescription: '',
                DetailName: '',
                DetailCprojMail: '',
                DetailCprojCredit: '',
                DetailDescription: ''
            }
            break;
        case "products":
            newObj = {
                productTitle: '',
                productMessage: '',
                productImgUrl: '',
                DetailName: '',
                DetailCprojMail: '',
                DetailCprojCredit: '',
                DetailDescription: '',
                PledgeAmt:''
            }
        case "subscriptions":
            newObj = {
                key: '', 
                value : ''
            }
            break;
    }

    return newObj;
}