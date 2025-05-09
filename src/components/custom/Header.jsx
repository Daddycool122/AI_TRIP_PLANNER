import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, X } from 'lucide-react';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    console.log(user);
  }, []);
  
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.error(error);
      toast.error("Google login failed. Please try again.");
    },
    scope: 'profile email' // Add profile and email scopes
  });
  
  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json'
        }
      });
      console.log(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logoo.svg" className="h-10 w-10 p-1 shadow-sm rounded" alt="DestiNova Logo" />
            <h1 className="ml-2 italic text-orange-500 font-bold text-xl sm:text-2xl md:text-3xl">DestiNova</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <a href="/create-trip">
                  <Button variant="outline" className="rounded-full text-sm px-4">
                    +Create Trip
                  </Button>
                </a>
                <a href="/my-trips">
                  <Button variant="outline" className="rounded-full text-sm px-4">
                    My Trips
                  </Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <img 
                      src={user?.picture} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-orange-300 transition-all cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-700 truncate">
                        {user?.name || user?.email}
                      </div>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left rounded-md transition-colors"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button 
                onClick={() => setOpenDialog(true)}
                className="rounded-md bg-orange-500 hover:bg-orange-600 text-white"
              >
                Sign in
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-2 px-2">
                <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                  <img 
                    src={user?.picture} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border border-gray-200" 
                  />
                  <div className="text-sm font-medium truncate">
                    {user?.name || user?.email}
                  </div>
                </div>
                <a href="/create-trip" className="block">
                  <Button variant="outline" className="w-full text-left justify-start">
                    +Create Trip
                  </Button>
                </a>
                <a href="/my-trips" className="block">
                  <Button variant="outline" className="w-full text-left justify-start">
                    My Trips
                  </Button>
                </a>
                <Button 
                  variant="ghost" 
                  className="w-full text-left justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="px-2">
                <Button 
                  onClick={() => setOpenDialog(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Sign in
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <img src="/logoo.svg" alt="DestiNova Logo" className="h-12 w-12" />
            </div>
            <DialogTitle className="text-center text-xl font-bold">Sign in to DestiNova</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mt-2 text-gray-600">Sign in to the app with Google authentication securely.</p>
              <Button
                className="w-full mt-6 flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300"
                onClick={login}
              >
                <FcGoogle className="h-5 w-5" />
                <span>Sign in with Google</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;