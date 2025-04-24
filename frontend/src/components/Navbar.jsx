import { Search, ShoppingCart, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DrawerComponent } from "./DrawerComponent";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { logoutUser } from "@/api/UserRelatedAPI";
import { logout } from "@/store/features/auth/authSlice";
import toast from "react-hot-toast";
const navItems = ["New in", "Men", "Women", "Baby", "Kids", "About"];

const Navbar = React.memo(() => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { cartProductQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticated, userInfo } = useSelector((state) => state.auth);

  const handleSearch = () => {
    if (searchValue.length > 0) {
      navigate(`/filter?search=${searchValue}`);
    } else {
      return;
    }
  };

  const handleMenuClick = (category) => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    navigate(`/filter?category=${category.toLowerCase()}&size=&price=&sort=`, {
      state: { navCategory:category },
    });
  };

  const handleLogout = async () => {
    try {
      let response = await logoutUser();
      dispatch(logout());
      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log("error in navbar logout function", error);
      toast.error(error?.response?.data.message || error.message);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto">
        {/* Main Navbar */}
        <div className="flex items-center justify-between py-3 px-4 lg:px-5">
          {/* Logo */}
          <Link
            to="/"
            className="font-lato text-xl sm:text-2xl font-bold text-gray-800 dark:text-white"
          >
            MaMart
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium">
            {navItems.map((item, index) => (
              <li
                onClick={
                  index === 0
                    ? () =>
                        navigate(`/filter?category=&size=&price=&sort=latest`)
                    : navItems.length - 1 === index
                    ? () => navigate("/about")
                    : () => handleMenuClick(item)
                }
                key={index}
                className="group relative cursor-pointer transition-all duration-300 hover:text-blue-500"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Search & Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block">
              <div
                className={`relative transition-all duration-300 ${
                  isSearchFocused ? "w-64" : "w-52"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-2 border-gray-400 dark:border-gray-600 rounded-md px-2 pr-10 py-1 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <Search
                  onClick={handleSearch}
                  className={`absolute h-full w-[30px] rounded-r-md p-1 top-1/2 right-0 -translate-y-1/2  dark:text-gray-300  cursor-pointer ${
                    searchValue.length > 0
                      ? "bg-blue-500 w-[40px] text-white"
                      : "bg-transparent text-gray-500 "
                  } transition-all`}
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 dark:text-gray-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>

            {/* Auth/Cart Icons */}
            {authenticated ? (
              <div className="flex items-center space-x-4">
                {/* // cart button */}
                <Drawer open={openDrawer} onOpenChange={setOpenDrawer}  direction="right">
                  <DrawerTrigger asChild>
                    <button className="relative transition-all duration-300 hover:scale-110">
                      <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                      <span className="absolute -top-2 -right-1 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center p-1 text-[11px] text-white ">
                        {cartProductQuantity}
                      </span>
                      <DrawerComponent
                        isOpen={openDrawer}
                        setIsOpen={setOpenDrawer}
                      />
                    </button>
                  </DrawerTrigger>
                </Drawer>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      loading="lazy"
                      src={
                        (userInfo && userInfo?.picture) ||
                        "https://github.com/shadcn.png"
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = "https://github.com/shadcn.png"; // fallback image jab fail ho
                      }}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            setOpenDialog(true);
                          }}
                        >
                          Logout
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription className="flex justify-end items-center gap-4 mt-2">
                          <button
                            onClick={() => setOpenDialog(false)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                          >
                            Logout
                          </button>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-100 hidden sm:inline-flex"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Shown below main navbar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border-2 border-gray-400 dark:border-gray-600 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-300 w-4" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="px-4 py-2">
            {navItems.map((item, index) => (
              <li
                onClick={
                  index === 0
                    ? () =>
                        navigate(`/filter?category=&size=&price=&sort=latest`)
                    : navItems.length - 1 === index
                    ? () => navigate("/about")
                    : () => handleMenuClick(item)
                }
                key={index}
                className="py-3 hover:text-blue-500 border-b dark:border-gray-800 last:border-0 text-gray-700 dark:text-gray-200"
              >
                {item}
              </li>
            ))}
            {!authenticated && (
              <li className="py-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-100">
                  Login
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
