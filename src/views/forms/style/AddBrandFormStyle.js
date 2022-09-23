export const addBrandFormStyle = (theme) => {
    return {
        inputField: {
            ...theme.common?.inputField
        },
        modalBodyBgColor: {
            ...theme.common?.modalBodyBgColor
        },
        errorText: {
            ...theme.common?.errorText
        },
    }
};