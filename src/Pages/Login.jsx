import axios from "axios"
import React from "react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router"
import { Link } from "react-router"


function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  let navigate = useNavigate()


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !pass) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const res = await axios.get("https://683d578b199a0039e9e508e2.mockapi.io/auth"); 
    const user = res.data.find(u => u.email === email);

    if (!user) {
      toast.error("Email not found");
      return;
    }

    if (user.pass !== pass) {
      toast.error("Incorrect password");
      return;
    }

    toast.success("Login successful");
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong. Please try again.");
  }
};



  return (
    <div>
      <Toaster />
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-20 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500">
            Sign in to continue
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            class="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-balance"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full ps-2 rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-black"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  value={pass}
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block ps-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-400">
            you dont have account
            <Link
              to={"/singup"}
              class="font-semibold leading-6 text-red-500 hover:text-red-400"
            >
              {" "}
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
