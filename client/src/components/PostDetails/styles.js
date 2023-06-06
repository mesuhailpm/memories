import { createTheme } from "@mui/system";
import { makeStyles } from "@mui/styles";

export default makeStyles({
    postDetails:{
        display:'flex'
    },
    image:{
        // border:'2px solid blue',//test
        width:'100%',
        borderRadius:'5px'
    },
    section:{
        padding:'15px',
        width:'60%'
    },
    imageSection:{
        width:'40%'
    },
    card:{
        padding: '15px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        borderRadius:'15px',
        justifyContent:'space-between'
    },
    commentsOuterContainer:{
        display:'flex',
        justifyContent:'space-between',
        margin:'1rem 0',
        // border:'2px solid' //test
    },
    commentsInnerContainer:{
        maxHeight: '200px',
        width: '600px',
        // border:'2px solid',// test
        overflowY:'auto',
        marginRight: '30px',
        padding: '1rem'

    },
    form:{
        display:'flex',
        flexDirection:'column',

    },
    recommended:{
        margin:'1rem',
        '& h6':{
            margin:'1rem'
        }
    }


})
