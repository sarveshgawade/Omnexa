"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, UserPlus,LogOut, FunctionSquare  } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import axiosInstance from "@/helpers/axiosInstance"
import { signout } from "@/redux/slices/authSlice"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  // const {isLoggedIn, role,data} = useSelector((state:RootState) => state.auth)

  // useEffect(()=> {
  //   console.log(isLoggedIn);
  //   console.log(role);
  //   console.log(data);
    
  // },[])

  async function handleLogout() {

    const response = await  dispatch(signout())
    // console.log(';in header payload');
    
    // console.log(response.payload);
    
  }

  return (
    <header className="bg-white shadow-sm border-b ">
      
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-XXXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@omnexaglobal.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Exporting Quality Since 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">Omnexa Global Trade</div>
              <div className="text-sm text-gray-600">Premium Agricultural Exports</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-700 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-700 font-medium">
              About Us
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-700 font-medium">
              Products
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-green-700 font-medium">
              Gallery
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-700 font-medium">
              Contact
            </Link>
            
            {/* {
              !isLoggedIn && (
                <> */}
                    <Link to="/register" className="text-gray-700 hover:text-green-700 font-medium">
                      Register
                    </Link>
                    <Link to="/login" className="text-gray-700 hover:text-green-700 font-medium">
                      Login
                    </Link>
                {/* </>
              )
            } */}
            {/* {
              isLoggedIn && ( */}
                <Link to="#" onClick={handleLogout} className="text-gray-700 hover:text-green-700 font-medium">
                  Logout
                </Link>
              {/* )
            } */}


          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-green-700 font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-700 font-medium">
                About Us
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-green-700 font-medium">
                Products
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-green-700 font-medium">
                Gallery
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-700 font-medium">
                Contact
              </Link>
              <Button asChild className="bg-green-700 hover:bg-green-800 w-fit">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
