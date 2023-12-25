import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartContext, ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignOut from '../SignOut'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'
import { useContext } from 'react'

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext)
  const isUserSignOut = context.signOut
  let routes = useRoutes([
    { path: '/', element: isUserSignOut ? <SignOut/> :<Home /> },
    { path: '/clothes', element: isUserSignOut ? <SignOut/> : <Home /> },
    { path: '/electronics', element: isUserSignOut ? <SignOut/> : <Home /> },
    { path: '/furnitures', element: isUserSignOut ? <SignOut/> : <Home /> },
    { path: '/toys', element: isUserSignOut ? <SignOut/> : <Home /> },
    { path: '/others', element: isUserSignOut ? <SignOut/> : <Home /> },
    { path: '/my-account', element: isUserSignOut ? <SignOut/> : <MyAccount /> },
    { path: '/my-order', element: isUserSignOut ? <SignOut/> : <MyOrder /> },
    { path: '/my-orders', element: isUserSignOut ? <SignOut/> : <MyOrders /> },
    { path: '/my-orders/last', element: isUserSignOut ? <SignOut/> : <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignOut /> },
    { path: '/*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
