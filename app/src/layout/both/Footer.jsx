// MUI
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const Footer = ()=> {

    const StyledFooter = styled(Box)(({ theme }) => ({
        position: 'fixed',
        bottom: 0,
        right: 0,
        backgroundColor: theme.palette.primary.light,
        borderTopLeftRadius: 10,
        padding: '2px 10px',
        color: theme.palette.primary.main
    }))

    const year = new Date().getFullYear()

    return (

        <StyledFooter>

            <Typography fontSize={'10px'}>&copy;{year} - MyReactFramework </Typography>

        </StyledFooter>

    )
}

export default Footer
