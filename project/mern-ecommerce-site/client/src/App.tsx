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
import AddressBookCreateUpdatePage from "./pages/auth/AddressBookCreateUpdatePage";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/public/home-page";
import PublicLayout from "./components/layout/PublicLayout";
import ProductByIdPage from "./pages/public/product-id-page";
import CustomerSupportPage from "./pages/auth/CustomerSupportPage";
import SearchPage from "./pages/public/search-page";
import ProductPage from "./pages/admin/ProductPage";
import ProductCreateUpdatePage from "./pages/admin/ProductCreateUpdatePage";
import AdminLayout from "./components/layout/AdminLayout";
import CategoryPage from "./pages/admin/CategoryPage";
import CategoryCreateUpdatePage from "./pages/admin/CategoryCreateUpdatePage";
import BrandPage from "./pages/admin/BrandPage";
import BrandPageCreateUpdatePage from "./pages/admin/BrandPageCreateUpdatePage";
import UserPage from "./pages/admin/UserPage";
import UserCreatePage from "./pages/admin/UserCreatePage";
import WishlistProductsPage from "./pages/auth/WishlistProductsPage";
import BookmarkProductsPage from "./pages/auth/BookmarkProductsPage";
import CartPage from "./pages/auth/CartPage";
import AuthProtected from "./components/layout/AuthProtected";
import CategoryIdPage from "./pages/public/category-id-page";
import BrandIdPage from "./pages/public/brand-id-page";

function App() {
  return (
    <div>
      <Header />
      <div className="my-4 max-w-[1416px] w-full px-2 mx-auto">
        <Routes>
          {/* public  */}
          <Route path="/*" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product-id/:id" element={<ProductByIdPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="brand/:id" element={<BrandIdPage />} />
            <Route path="category/:id" element={<CategoryIdPage />} />
          </Route>
          {/* auth  */}
          <Route path="customer/*" element={<AuthProtected />}>
            <Route path="cart" element={<CartPage />} />
            <Route element={<AuthLayout />}>
              <Route path="account" element={<AccountInformationPage />} />
              <Route path="notification" element={<MyNoticePage />} />
              <Route path="address-book" element={<AddressBookPage />} />
              <Route
                path="address-book/add"
                element={<AddressBookCreateUpdatePage />}
              />
              <Route
                path="address-book/edit/:id"
                element={<AddressBookCreateUpdatePage />}
              />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route
                path="order-management"
                element={<OrderManagementPage />}
              />
              <Route
                path="return-management"
                element={<ReturnManagementPage />}
              />
              <Route path="product-reviews" element={<ProductReviewsPage />} />
              <Route
                path="product-you-viewed"
                element={<ProductsYouViewedPage />}
              />
              <Route
                path="product-wishlist"
                element={<WishlistProductsPage />}
              />
              <Route
                path="product-bookmark"
                element={<BookmarkProductsPage />}
              />
              <Route path="my-comment" element={<MyCommentPage />} />
              <Route path="help-center" element={<CustomerSupportPage />} />
            </Route>
          </Route>
          {/* admin */}
          <Route path="admin/*" element={<AdminLayout />}>
            <Route path="account" element={<AccountInformationPage />} />
            <Route path="management/*">
              <Route path="product" element={<ProductPage />} />
              <Route
                path="product/create"
                element={<ProductCreateUpdatePage />}
              />
              <Route
                path="product/update-id/:id"
                element={<ProductCreateUpdatePage />}
              />
              <Route path="category" element={<CategoryPage />} />
              <Route
                path="category/create"
                element={<CategoryCreateUpdatePage />}
              />
              <Route
                path="category/update-id/:id"
                element={<CategoryCreateUpdatePage />}
              />
              <Route path="brand" element={<BrandPage />} />
              <Route
                path="brand/create"
                element={<BrandPageCreateUpdatePage />}
              />
              <Route
                path="brand/update-id/:id"
                element={<BrandPageCreateUpdatePage />}
              />
              <Route path="user" element={<UserPage />} />
              <Route path="user/create" element={<UserCreatePage />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
