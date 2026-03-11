import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import BlogPage from './pages/BlogPage'
import PostPage from './pages/PostPage'
import NotFound from './pages/NotFound'



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element={<HomePage/>}/>
        <Route path="shop" element={<ShopPage/>}/>
        <Route path="shop/:id" element={<ProductPage/>}/>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="blog" element={<BlogPage/>}/>
        <Route path="blog/:id" element={<PostPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route> 
    </Routes>
  )
}

export default App
