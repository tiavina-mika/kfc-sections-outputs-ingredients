import { Box, CssBaseline } from '@mui/material'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import Sections from './containers/Sections'
import { recipe } from './utils/data'
// import { getAllIngredientsFromSection } from './utils/step.utils'

const App = () => {
  // console.log("supplier items", getAllIngredientsFromSection(recipe.sections[0]));
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: "column", flexGrow: 1 }}>
      <CssBaseline />
      <AppBar />
      <Box sx={{ p: 4 }}>
        <Sections sections={recipe.sections} />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
