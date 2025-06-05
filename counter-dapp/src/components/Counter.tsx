import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import { Add, Remove, Refresh } from '@mui/icons-material';
import { useMidnightWallet } from './MidnightWallet';

export const Counter: React.FC = () => {
  const { 
    isConnected, 
    address, 
    count, 
    isLoading, 
    increment, 
    decrement, 
    refresh 
  } = useMidnightWallet();

  if (!isConnected) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Card sx={{ maxWidth: 400, mx: 'auto' }}>
          <CardContent sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Connect Your Wallet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please connect your Midnight wallet to interact with the counter contract.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
              Counter Contract
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A simple counter built on Midnight Network
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Counter Display */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              {count}
            </Typography>
            <Chip 
              label={`Current Value: ${count}`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 1 }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={decrement}
              variant="outlined"
              size="large"
              startIcon={isLoading ? <CircularProgress size={16} /> : <Remove />}
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              Decrement
            </Button>
            
            <Button
              onClick={refresh}
              variant="outlined"
              size="large"
              startIcon={isLoading ? <CircularProgress size={16} /> : <Refresh />}
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              Refresh
            </Button>
            
            <Button
              onClick={increment}
              variant="contained"
              size="large"
              startIcon={isLoading ? <CircularProgress size={16} /> : <Add />}
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              Increment
            </Button>
          </Box>

          {/* Status */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {isLoading ? 'Processing transaction...' : 'Ready for next action'}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About This DApp
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This is a simple counter decentralized application built on the Midnight Network. 
            It demonstrates basic smart contract interactions including increment and decrement operations.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connected Wallet: {address}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
