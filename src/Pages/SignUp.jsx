import axios from "axios"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router"

function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  let navigate = useNavigate()

    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://683d578b199a0039e9e508e2.mockapi.io/auth', {
        userName,
        email,
        pass,
      });
      if (response.status === 201) {
navigate("/")
      }
    } catch (error) {
      setError('Registration failed.');
    }
  };
  return (
    <div>
      <Toaster />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500">
            signup
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="name"
                className="block text-sm font-medium leading-6 text-balance"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={userName}
                  name="name"
                  type="name"
                  required
                  className="block w-full ps-2 rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-balance"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  required
                  className="block w-full ps-2 rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={pass}
                  name="password"
                  type="password"
                  required
                  className="block w-full ps-2 rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            you have account
            <Link
              to={"/"}
              href="#"
              className="font-semibold leading-6 text-red-500 hover:text-red-400"
            >
              {" "}
              login{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
