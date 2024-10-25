import { Route, Routes } from "react-router-dom";
import "./App.css";
import AccountInformationPage from "./pages/auth/AccountInformationPage";
import AuthLayout from "./components/layout/AuthLayout";
import MyNoticePage from "./pages/auth/MyNoticePage";
import AddressBookPage from "./pages/auth/AddressBookPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import OrderManagementPage from "./pages/auth/OrderManagementPage";
import ReturnManagementPage from "./pages/auth/ReturnManagementPage";
import ProductReviewsPage from "./pages/auth/ProductReviewsPage";
import ProductsYouViewedPage from "./pages/auth/ProductsYouViewedPage";
import MyCommentPage from "./pages/auth/MyCommentPage";
import FavoriteProductsPage from "./pages/auth/FavoriteProductsPage";
import AddressBookAddUpdatePage from "./pages/auth/AddressBookAddUpdatePage";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/public/home-page";
import PublicLayout from "./components/layout/PublicLayout";
import ProductByIdPage from "./pages/public/product-id-page";

function App() {
  return (
    <div>
      <Header />
      <div className="mt-4 max-w-[1416px] w-full px-2 mx-auto">
        <Routes>
          {/* public  */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product-id/:id" element={<ProductByIdPage />} />
          </Route>
          {/* auth  */}
          <Route path="/customer" element={<AuthLayout />}>
            <Route path="account" element={<AccountInformationPage />} />
            <Route path="notification" element={<MyNoticePage />} />
            <Route path="address-book" element={<AddressBookPage />} />
            <Route
              path="address-book/add"
              element={<AddressBookAddUpdatePage />}
            />
            <Route
              path="address-book/edit/:id"
              element={<AddressBookAddUpdatePage />}
            />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="order-management" element={<OrderManagementPage />} />
            <Route
              path="return-management"
              element={<ReturnManagementPage />}
            />
            <Route path="product-reviews" element={<ProductReviewsPage />} />
            <Route
              path="product-you-viewed"
              element={<ProductsYouViewedPage />}
            />
            <Route path="favorite-product" element={<FavoriteProductsPage />} />
            <Route path="my-comment" element={<MyCommentPage />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
