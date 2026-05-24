import { BrowserRouter, Routes,Route } from 'react-router-dom'
import AdminLogin from './pages/auth/AdminLolgin'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import PendingOrders from './pages/PendingOrders'
import AllProducts from './pages/AllProducts'
import AddProduct from './pages/AddProduct'
import Reviews from './pages/Reviews'
import Brands from './pages/Brands'
import Transactions from './pages/Transactions'
import Customers from './pages/Customers'
import Sellers from './pages/Sellers'
import AdminPaymentRequests from './pages/PaymentRequests'
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Layout />} >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/category" element={<Categories />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/pending-orders" element={<PendingOrders />} />
              <Route path="/admin/all-products" element={<AllProducts />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/reviews" element={<Reviews />} />
              <Route path="/admin/brands" element={<Brands />} />
              <Route path="/admin/transactions" element={<Transactions />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/sellers" element={<Sellers />} />
              <Route path="/admin/payment-requests" element={<AdminPaymentRequests />} />
          </Route>
          <Route path="/" element={<AdminLogin />} />
          
        </Routes>
    
    </BrowserRouter>
  )
}

export default App
