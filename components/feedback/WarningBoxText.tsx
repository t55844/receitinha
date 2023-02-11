import { Typography } from "@mui/material"
import WarningIcon from '@mui/icons-material/Warning';

export default props => {
    const { text } = props
    if (text) {

        return (
            <Typography
                sx={{
                    color: '#4d0000',
                    fontSize: '16px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: '2px solid #9c1f12 ',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    background: '#fb6a47'
                }}
                variant="body1">
                {text}
                <WarningIcon />
            </Typography>
        )
    }
}