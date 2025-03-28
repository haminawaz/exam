"use client";

import { User, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              How to I get started lorem ipsum dolor at?
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Username"
                  className="pl-10 bg-orange-50/50"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-orange-50/50"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700">
              Login Now
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Login with Others
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="flex items-center justify-center gap-3 w-full border rounded-lg p-2 hover:bg-gray-50 transition-colors">
                <img
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                  alt="Google"
                  className="h-5 object-contain"
                />
                <span className="text-sm">Login with Google</span>
              </button>

              <button className="flex items-center justify-center gap-3 w-full border rounded-lg p-2 hover:bg-gray-50 transition-colors">
                {/* <Facebook className="h-5 w-5 text-blue-600" /> */}
                <span className="text-sm">Login with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden admin-login-bg">
        <div className="relative z-10 flex items-center justify-center h-full">
          <img
            src="/images/admin/login-students.png"
            alt="Children illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
