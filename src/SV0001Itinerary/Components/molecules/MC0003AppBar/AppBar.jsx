import { useTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const MC0003AppBar = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h6' component='div'>
            {t('PROJECT.NAME')}
          </Typography>
          <Typography variant='h10' component='div' sx={{ flexGrow: 1 }}>
            {' ~' + t('旅のしおり簡単作成アプリ') + '~'}
          </Typography>
          {/* <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MC0003AppBar;
