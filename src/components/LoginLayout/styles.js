import {
    createTheme,
    responsiveFontSizes,
    makeStyles
  } from '@material-ui/core/styles';
  import { purple } from '@material-ui/core/colors';
  
  let theme = createTheme({
    palette: {
      type: 'dark',
      primary: purple,
      secondary: purple
    }
  });
  theme = responsiveFontSizes(theme);
  const useStyle = makeStyles(() => ({
    root: {
      width: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    },
    paper: {
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        padding: theme.spacing(3),
      }
    }
  }));
  
  export { theme, useStyle };
  