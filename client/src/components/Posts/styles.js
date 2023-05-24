import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/system';
import {deepPurple} from '@mui/material/colors'
const theme = createTheme();
export default makeStyles(() => ({
  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 15px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: deepPurple[500].contrastText,// was color: theme.palette.getContrastText(deepPurple[500]), changed to this as chatGPT suggestion
    backgroundColor: deepPurple[500]
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 20px',
    },
    heading: {
      display: 'none',
    },
    userName: {
      display: 'none',
    },
    image: {
      marginLeft: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },

  actionDiv: {
    textAlign: 'center',
  }
}));
