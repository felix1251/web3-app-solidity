import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Footer from '../LoginFooter/Footer';
import { theme, useStyle } from './styles';

export default function Layout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>{children}</Paper>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
