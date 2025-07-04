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
import ProfilePage from './pages/ProfilePage'
import ResetPassword from './pages/ResetPassword'
import RequireAuth from './components/auth/RequireAuth'
import AddProduct from './pages/AddProduct'

function App() {

  return (

    <Routes>

      <Route element={<RequireAuth allowedRoles={['USER','ADMIN']} />}>
          <Route path='/quote' element={ <QuotePage/>}/>
          <Route path='/profile' element={ <ProfilePage/>}/>
          <Route path='/reset-password/:token' element={ <ResetPassword/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
        <Route path='/add-product' element={ <AddProduct/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={['USER']} />}>
        <Route path='/contact' element={ <ContactPage/>}/>
      </Route>

      <Route path='/' element={ <Homepage/>}/>
      <Route path='/about' element={ <AboutUsPage/>}/>
      <Route path='/products' element={ <ProductsPage/>}/>
      
      
      <Route path='/products/description' element={ <ProductDescription/>}/>
      <Route path='/register' element={ <RegisterPage/>}/>
      <Route path='/login' element={ <LoginPage/>}/>
      
      
      <Route path='*' element={ <PageNotFoundPage/>}/>

    </Routes>
  )
}

export default App
