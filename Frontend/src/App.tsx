import './App.css'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import AboutUsPage from './pages/AboutUsPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import PageNotFoundPage from './pages/PageNotFoundPage'
import QuotePage from './pages/QuotePage'

function App() {

  return (
    // <Homepage />

    <Routes>

        <Route path='/' element={ <Homepage/>}/>
        <Route path='/about' element={ <AboutUsPage/>}/>
        <Route path='/products' element={ <ProductsPage/>}/>
        <Route path='/contact' element={ <ContactPage/>}/>
        <Route path='/quote' element={ <QuotePage/>}/>
        <Route path='*' element={ <PageNotFoundPage/>}/>

    </Routes>
  )
}

export default App
