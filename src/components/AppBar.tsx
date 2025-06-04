import { AppBar as MuiAppBar, Avatar, Box, Toolbar } from '@mui/material'

const AppBar = () => {
  return (
      <MuiAppBar position="static" component="nav" sx={{ bgcolor: '#000' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ width: '140px' }}>
            <img alt="foodcheri" src="/logo.svg" />
          </Box>
          <Avatar alt="Mika" src="https://avatars.githubusercontent.com/u/42656064?s=400&u=d2766a32fce7dbe6cd9727a1126ef900b2dd9ce1&v=4" />
        </Toolbar>
      </MuiAppBar>
  )
}

export default AppBar