import {createTheme } from "@material-ui/core/styles";
export const theme = createTheme  ({
    common: {
        inputField: {
            backgroundColor: 'white',
            "& label.Mui-focused": {
                color: 'rgb(26,179,148)'
            },
            // "&:hover label": {
            //     color: 'rgb(26,179,148)',
            // },
            "& .MuiOutlinedInput-root": {
                '& fieldset': {
                    border: '1px solid #E8E8E8',
                },
                // "&:hover fieldset": {
                //     borderColor: `rgb(26,179,148)`,
                // },
                "&.Mui-focused fieldset": {
                    border: '1px solid rgb(26,179,148)',
                },
            }
        },
        modalBodyBgColor: {
            backgroundColor: '#f9f9f9'
        },
        checkboxColor: {
            color: '#939393',
            "&.Mui-checked": {
                color: 'rgba(26,179,148)',
            },
        },
        cursorPointerHover: {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        greyHover: {
            '&:hover': {
                backgroundColor: '#fafafa',
                // fontWeight: 'bold'
            }
        },
        mainColorHover: {
            '&:hover': {
                color: 'rgb(26,179,148)',
            }
        },
        mainColorHoverBg: {
            '&:hover': {
                backgroundColor: 'rgba(26,179,148, .032)',
                color: 'rgb(26,179,148)'
            },

        },
        mainColorText: {
            color: 'rgb(26,179,148)',
        },
        errorText: {
            color: 'rgba(200,0,0, 0.7)',
            margin: '0',
            fontSize: '0.75rem',
            marginTop: '3px',
            textAlign: 'left',
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
            fontWeight: '400',
            lineHeight: '1.66',
            letterSpacing: '0.03333em'
        },
        popoverBodyStyle: {
            backgroundColor: '#fbfafa',
            boxShadow: '3px 7px 8px rgba(0,0,0,0.3 )',
            border: '1px solid #e1e1e1',
            borderRadius: '4px',
            borderRight: '1px solid #e1e1e1',
            backgroundColorRight: '#fbfafa',
            maxWidth: '460px',
            zIndex: 30
        },
        progressBarStyle: {
            "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: 'rgb(26,179,148)',
            },
        }
    }
})