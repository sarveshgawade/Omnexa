import './App.css'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import AboutUsPage from './pages/AboutUsPage'
import ProductsPage from './pages/ProductsPage'
import ContactPage from './pages/ContactPage'
import PageNotFoundPage from './pages/PageNotFoundPage'
import QuotePage from './pages/QuotePage'
import ProductDescription from './pages/ProductDescription'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    // <Homepage />

    <Routes>

        <Route path='/' element={ <Homepage/>}/>
        <Route path='/about' element={ <AboutUsPage/>}/>
        <Route path='/products' element={ <ProductsPage/>}/>
        <Route path='/contact' element={ <ContactPage/>}/>
        <Route path='/quote' element={ <QuotePage/>}/>
        <Route path='/products/description' element={ <ProductDescription/>}/>
        <Route path='/register' element={ <RegisterPage/>}/>
        <Route path='/login' element={ <LoginPage/>}/>
        <Route path='*' element={ <PageNotFoundPage/>}/>

    </Routes>
  )
}

export default App
