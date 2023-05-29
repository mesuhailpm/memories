import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/system';

const theme = createTheme();


export default makeStyles({
    paper: {
        width:'fit-content',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        // border:'2px solid blue' //test
      },
    root: {
        '& .MuiTextField-root': {
          margin: `${theme.spacing(1)} !important` ,
        },
        '& .MuiInputBase-root':{
          marginBottom: '5px !important'
        },

      },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary?.main // was. secondary.main
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
            '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':{
              marginBottom: '5px !important',
            }
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
          googleButton: {
            marginBottom: theme.spacing(2),
          }
});
