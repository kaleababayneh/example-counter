import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import { Info, Code, Security } from '@mui/icons-material';

export const ContractInfo: React.FC = () => {
  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Info sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Contract Information</Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Contract Language
                </Typography>
                <Chip
                  icon={<Code />}
                  label="Compact"
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Network
                </Typography>
                <Chip
                  icon={<Security />}
                  label="Midnight Testnet"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Available Functions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip label="increment()" variant="outlined" size="small" />
                <Chip label="decrement()" variant="outlined" size="small" />
                <Chip label="getCurrentValue()" variant="outlined" size="small" />
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary">
            This smart contract demonstrates basic state management on the Midnight Network 
            using zero-knowledge proofs for privacy-preserving computation.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
