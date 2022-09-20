import {makeStyles} from "@material-ui/core/styles";

/**
 * Factory function that uses JSS to generate a css file based on a generic parameter.
 * The parameter is a function without any arguments that returns an object containing css classes.
 * See more about makeStyles:https://material-ui.com/styles/api/ and JSS:https://cssinjs.org/?v=v10.6.0
 *
 * @param componentStyleFunction references a function that contains component specific css. The componentStyleFunction
 * accepts one argument, that represents the currently used MaterialUI theme.
 *
 * @return an object containing css classes. Also as a side effect see JSS, generates a css file from js.
 */
export const useStyles = (componentStyleFunction) => {
    const useStyle = makeStyles((theme) => componentStyleFunction(theme), { index: 1 } );
    return useStyle();
}
