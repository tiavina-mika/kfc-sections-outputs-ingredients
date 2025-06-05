import { Box, CssBaseline, Typography } from '@mui/material'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import Sections from './containers/Sections'
import { recipe } from './utils/data'

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: "column", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Open the modal to split a section by ingredients
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li">Modal label: Split your section by distributing ingredients into each part and giving them a name.</Typography>
          <Typography component="li">You can add a new part.</Typography>
          <Typography component="li">Part names are editable text inputs.</Typography>
          <Typography component="li">You can drag and drop ingredients from one part to another.</Typography>
          <Typography component="li">If a part has no ingredients, a "skeleton" is displayed instead.</Typography>
          <Typography component="li">You can delete all parts except the first two.</Typography>
        </Box>
        <Sections sections={recipe.sections} />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
