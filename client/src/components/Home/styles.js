import { makeStyles } from '@mui/styles'

import { createTheme } from '@mui/system';

const theme = createTheme();

export default makeStyles({
  loadingContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'70%',
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  root:{
    border:'5px solid black !important'
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  paginate: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    '& .css-neb4x5-MuiGrid-root':{
    padding:'0 !important'
    }
  },
});
