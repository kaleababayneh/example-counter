import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { useMidnightWallet } from './MidnightWallet';

export const Header: React.FC = () => {
  const { widget } = useMidnightWallet();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.paper' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Counter DApp
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {widget}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
