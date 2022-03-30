import React from 'react';
import { Link, Typography } from '@material-ui/core/';

export default function Footer() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
        @{new Date().getFullYear()}{" "}
      {'Lixtagram'}
    </Typography>
  );
}
