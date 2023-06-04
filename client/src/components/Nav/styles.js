import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material';
import { deepPurple } from '@mui/material/colors'

const theme=createTheme()

export default makeStyles({
  appBar: {
  borderRadius: 15,
  margin: '30px 0',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 50px',
  '& .css-1cjrmu8-MuiPaper-root-MuiAppBar-root':{
    display:'flex',
    flexDirection:'row',

    // take precedence
    'flex-direction': 'row !important'
  },
  '&.MuiAppBar-root': {
    flexDirection: 'row',
  }


},

image: {
  marginLeft: '15px',
  padding: '3px',
  border:'1px solid grey',
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
purple: {
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
},
});
