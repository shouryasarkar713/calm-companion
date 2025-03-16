
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  Apple, 
  AlertCircle, 
  ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import HomepageLayout from "@/components/layout/HomepageLayout";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string}>({});
  
  const { login, register, loginWithGoogle, loginWithApple, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return path from the location state or default to '/dashboard'
  const from = location.state?.from?.pathname || "/dashboard";
  
  const validateForm = () => {
    const newErrors: {name?: string; email?: string; password?: string} = {};
    
    if (!isLogin && !name) {
      newErrors.name = "Name is required";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!isResetPassword && !password) {
      newErrors.password = "Password is required";
    } else if (!isResetPassword && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isResetPassword) {
        await resetPassword(email);
        setIsResetPassword(false);
        setIsLogin(true);
      } else if (isLogin) {
        await login(email, password);
        navigate(from, { replace: true });
      } else {
        await register(name, email, password);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithApple();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAnonymousLogin = () => {
    toast({
      title: "Anonymous Mode",
      description: "You're now browsing anonymously. Note that your progress won't be saved.",
    });
    navigate("/chat");
  };
  
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };
  
  const toggleResetPassword = () => {
    setIsResetPassword(!isResetPassword);
    setErrors({});
  };

  return (
    <HomepageLayout>
      <section className="py-12 md:py-24">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {isResetPassword 
                  ? "Reset Password" 
                  : isLogin 
                    ? "Welcome Back" 
                    : "Create Your Account"}
              </h1>
              <p className="text-muted-foreground">
                {isResetPassword 
                  ? "Enter your email to receive reset instructions" 
                  : isLogin 
                    ? "Sign in to continue your journey" 
                    : "Join our community for better mental health"}
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Registration only) */}
              {!isLogin && !isResetPassword && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.name && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
              )}
              
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Password Field (Not for reset password) */}
              {!isResetPassword && (
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
              )}
              
              {/* Forgot Password Link (Login only) */}
              {isLogin && !isResetPassword && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={toggleResetPassword}
                    className="text-sm text-primary hover:underline"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isResetPassword ? "Sending..." : isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isResetPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            
            {/* Divider */}
            {!isResetPassword && (
              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-border w-full"></div>
                <span className="bg-card px-3 text-xs text-muted-foreground">OR</span>
                <div className="border-t border-border w-full"></div>
              </div>
            )}
            
            {/* Social Logins (Not for reset password) */}
            {!isResetPassword && (
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleAppleLogin}
                  disabled={isLoading}
                >
                  <Apple className="h-5 w-5 mr-2" />
                  Continue with Apple
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={handleAnonymousLogin}
                  disabled={isLoading}
                >
                  Continue Anonymously
                </Button>
              </div>
            )}
            
            {/* Toggle Login/Register */}
            {!isResetPassword ? (
              <p className="text-center mt-6 text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-primary font-medium hover:underline"
                  disabled={isLoading}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            ) : (
              <button
                type="button"
                onClick={toggleResetPassword}
                className="flex items-center justify-center w-full mt-6 text-sm text-primary font-medium hover:underline"
                disabled={isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </button>
            )}
            
            {/* Privacy Notice */}
            <div className="mt-8 text-xs text-center text-muted-foreground">
              <p>
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </HomepageLayout>
  );
};

export default AuthPage;
