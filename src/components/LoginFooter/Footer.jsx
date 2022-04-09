import React from 'react';
import { Typography } from '@material-ui/core/';

export default function Footer() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
        @{new Date().getFullYear()}{" "}
      {'Lixtagram'}
    </Typography>
  );
}
