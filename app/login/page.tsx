export default function Login() {
   return (
      <div className="min-h-screen grid place-items-center text-white">
         <div className="w-full max-w-sm mx-auto text-center">
            <h2 className="text-2xl xl:text-4xl text-center">Login Form</h2>
            <div className="mt-8 space-y-4">
               <div className="flex flex-col items-start w-full gap-1">
                  <label htmlFor="username" className="block text-sm/6 font-medium">Username</label>
                  <input type="text" name="username" id="username" autoComplete="username" className="w-full border-0 bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200" placeholder="John Doe" />
               </div>
               <div className="flex flex-col items-start w-full">
                  <label htmlFor="password" className="block text-sm/6 font-medium">Password</label>
                  <input type="text" name="password" id="password" autoComplete="password" className="w-full border-0 bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200" placeholder="failword911" />
               </div>
            </div>
            <div className="w-full flex justify-center mt-8">
               <input type="submit" value="Log in to your account" className="py-2 px-8 rounded-lg bg-gradient-to-r from-purple-400 to-pink-300 transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200" />
            </div>
         </div>
      </div>
   )
}