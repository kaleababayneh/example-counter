import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './config/theme';
import { MidnightWalletProvider } from './components/MidnightWallet';
import { Header, Counter, Footer, ContractInfo, ContractManager } from './components';
import * as pino from 'pino';

const logger = pino.pino({
  level: 'info',
  browser: {
    serialize: true,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MidnightWalletProvider logger={logger}>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          
          <Box
            component="main"
            sx={{
              flex: 1,
              px: 2,
              py: 4,
            }}
          >
            <Counter />
            <ContractManager />
            <ContractInfo />
          </Box>
          
          <Footer />
        </Box>
      </MidnightWalletProvider>
    </ThemeProvider>
  );
};

export default App;
