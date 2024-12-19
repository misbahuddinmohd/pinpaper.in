// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import { LoadingProvider } from "./contexts/LoadingContext";
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { EditProvider } from './contexts/EditContext';
import { UserProvider } from './contexts/UserContext';

import ProtectedRoute from './components/ProtectedRoute';

import GlobalAlert from './components/GlobalAlert';

// import LoginPage from './pages/LoginPage';
import LoginPageB from './pages/LoginPageB';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookServicePage from './pages/BookServicePage';
import CartPage from './pages/CartPage';
import DeliveryPage from './pages/DeliveryPage';
import AccountPage from './pages/AccountPage';
import UserDetails from './pages/User/UserDetails';
import UserAddresses from './pages/User/UserAddresses';
import AddEditAddress from './pages/User/AddEditAddress';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import HelplinePage from './pages/HelplinePage';
import OrderSuccess from './pages/OrderSuccess';
import TermsAndConditions from './pages/TermsAndConditions';
import CancellationRefundPolicy from './pages/CancellationAndRefund';
import ContactUs from './pages/ContactUs';
import PaymentPage from './pages/PaymentPage';



const App = () => {

  return (
    <AuthProvider>
      <UserProvider>
        <OrdersProvider>
          <EditProvider>
            <CartProvider>
              <AlertProvider>
                <LoadingProvider>
                  <Router>
                    <Layout>
                      <Routes>

                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        {/* <Route path="/login" element={<LoginPage />} /> */}
                        <Route path="/login" element={<LoginPageB />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/helpline" element={<HelplinePage />} />
                        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
                        <Route path="/cancellationAndRefund" element={<CancellationRefundPolicy />} />
                        <Route path="/contactUs" element={<ContactUs />} />

                        {/* Protected Routes
                      <Route element={<ProtectedRoute />}>
                        <Route path="/services/book" element={<BookServicePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/delivery" element={<DeliveryPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/orderDetails" element={<OrderDetailsPage />} />
                      </Route> */}

                        {/* Protected Routes */}
                        <Route path="/services/book" element={
                          <ProtectedRoute>
                            <BookServicePage />
                          </ProtectedRoute>
                        } />
                        <Route path="/cart" element={
                          <ProtectedRoute>
                            <CartPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/delivery" element={
                          <ProtectedRoute>
                            <DeliveryPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/account" element={
                          <ProtectedRoute>
                            <AccountPage />
                          </ProtectedRoute>
                        } />
                        <Route path='/account/getUser' element={
                          <ProtectedRoute>
                            <UserDetails />
                          </ProtectedRoute>
                        }
                        />
                        <Route path='/account/getAddress' element={
                          <ProtectedRoute>
                            <UserAddresses />
                          </ProtectedRoute>
                        }
                        />
                        <Route path='/account/addEditAddress' element={
                          <ProtectedRoute>
                            <AddEditAddress />
                          </ProtectedRoute>
                        }
                        />
                        <Route path="/orders" element={
                          <ProtectedRoute>
                            <OrdersPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/orderDetails" element={
                          <ProtectedRoute>
                            <OrderDetailsPage />
                          </ProtectedRoute>
                        } />
                        <Route path='/makePayment' element={
                          <ProtectedRoute>
                            <PaymentPage />
                          </ProtectedRoute>
                        } />
                        <Route path='/orderSuccess' element={
                          <ProtectedRoute>
                            <OrderSuccess />
                          </ProtectedRoute>
                        } />

                      </Routes>
                    </Layout>
                  </Router>
                  <GlobalAlert />
                </LoadingProvider>
              </AlertProvider>
            </CartProvider>
          </EditProvider>
        </OrdersProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;




// // App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import HomePage from './pages/HomePage';
// import BookServicePage from './pages/BookServicePage';
// import CartPage from './pages/CartPage';
// import AccountPage from './pages/AccountPage';
// import OrdersPage from './pages/OrdersPage';
// import HelplinePage from './pages/HelplinePage';


// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/book" element={<BookServicePage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/account" element={<AccountPage />} />
//           <Route path="/orders" element={<OrdersPage />} />
//           <Route path="/helpline" element={<HelplinePage />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;