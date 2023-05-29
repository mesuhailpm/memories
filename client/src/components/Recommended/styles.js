import { makeStyles } from "@mui/styles";

export default makeStyles({
    container:{
        display:'flex',
        border:'2px solid',
        padding:'15px',
        overflowX:'auto',
    },
    grid:{
        margin:'0 10px',
        '& img':{
            width:'150px',
        },
    }
})
