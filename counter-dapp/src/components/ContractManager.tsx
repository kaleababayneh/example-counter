import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import { Add, Link, Launch, ContentCopy } from '@mui/icons-material';
import { useWallet } from '../hooks/useWallet';

export const ContractManager = () => {
  const { wallet, deployContract } = useWallet();
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [joinContractAddress, setJoinContractAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleDeployNew = async () => {
    setIsDeploying(true);
    try {
      // Call the actual deployContract function from the wallet context
      await deployContract();
      setIsDeployDialogOpen(false);
    } catch (error) {
      console.error('Failed to deploy contract:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const handleJoinExisting = async () => {
    if (!joinContractAddress.trim()) return;
    
    setIsJoining(true);
    try {
      // Call the actual joinContract function from the wallet context
      await joinContract(joinContractAddress.trim());
      setIsJoinDialogOpen(false);
      setJoinContractAddress('');
    } catch (error) {
      console.error('Failed to join contract:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isConnected) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Alert severity="info">
            <AlertTitle>Contract Management</AlertTitle>
            Connect your wallet to deploy or join a counter contract.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Launch sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Contract Management</Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {contractAddress ? (
            <Alert severity="success" sx={{ mb: 3 }}>
              <AlertTitle>Contract Active</AlertTitle>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Contract Address:</strong>
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'grey.100', 
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'monospace',
                      fontSize: '0.9em',
                      wordBreak: 'break-all',
                      mr: 1
                    }}
                  >
                    {contractAddress}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopy />}
                    onClick={() => copyToClipboard(contractAddress)}
                  >
                    Copy
                  </Button>
                </Box>
              </Box>
            </Alert>
          ) : (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <AlertTitle>No Contract</AlertTitle>
              Deploy a new contract or join an existing one to start interacting with the counter.
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsDeployDialogOpen(true)}
              disabled={!!contractAddress}
            >
              Deploy New Contract
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Link />}
              onClick={() => setIsJoinDialogOpen(true)}
              disabled={!!contractAddress}
            >
              Join Existing Contract
            </Button>
          </Box>

          {contractAddress && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Contract Status
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Deployed" color="success" size="small" />
                <Chip label="Connected" color="primary" size="small" />
                <Chip label="Ready" color="secondary" size="small" />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Deploy New Contract Dialog */}
      <Dialog open={isDeployDialogOpen} onClose={() => setIsDeployDialogOpen(false)}>
        <DialogTitle>Deploy New Counter Contract</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This will deploy a new counter contract to the Midnight Network. 
            The contract will be initialized with a counter value of 0.
          </Typography>
          
          <Box sx={{ 
            p: 2, 
            bgcolor: 'grey.50', 
            borderRadius: 1,
            mb: 2
          }}>
            <Typography variant="subtitle2" gutterBottom>
              Contract Features:
            </Typography>
            <Typography variant="body2" component="div">
              • Private state management<br/>
              • Zero-knowledge proofs<br/>
              • Increment/decrement operations<br/>
              • Persistent on-chain storage
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            Deployment typically takes 10-30 seconds and requires network fees.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeployDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleDeployNew}
            disabled={isDeploying}
          >
            {isDeploying ? 'Deploying...' : 'Deploy Contract'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Existing Contract Dialog */}
      <Dialog open={isJoinDialogOpen} onClose={() => setIsJoinDialogOpen(false)}>
        <DialogTitle>Join Existing Contract</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the address of an existing counter contract to join it.
            You'll be able to interact with the shared counter state.
          </Typography>
          
          <TextField
            fullWidth
            label="Contract Address"
            value={joinContractAddress}
            onChange={(e) => setJoinContractAddress(e.target.value)}
            placeholder="Enter contract address..."
            sx={{ mb: 2 }}
            helperText="The contract address should start with 'contract_' or be a valid Midnight contract address"
          />
          
          <Alert severity="warning">
            Make sure the contract address is correct. Joining an invalid contract will fail.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsJoinDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleJoinExisting}
            disabled={isJoining || !joinContractAddress.trim()}
          >
            {isJoining ? 'Joining...' : 'Join Contract'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
