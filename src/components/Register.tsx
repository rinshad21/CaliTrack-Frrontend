import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { handleError, handleSuccess } from "@/utils/Toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import getBaseurl from "@/utils/getBaseurl";
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  interface FormData {
    username: string;
    email: string;
    password: string;
    level: string;
  }
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${getBaseurl()}/auth/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        localStorage.setItem("level", auth.level);
      }
      handleSuccess("login successfull");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
 if (axios.isAxiosError(error)) {
    
    handleError(error.response?.data?.message);
  } else {
    handleError("Something went wrong");
  }
    }
  };

  return (
    <div
      className="flex min-h-[760px] w-full bg-cover"
      style={{ backgroundImage: "url(/images/blog/01.jpg)" }}
    >
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none xl:px-24">
        <div className="bg-background mx-auto w-full max-w-sm rounded-lg p-6 lg:w-96 lg:p-10">
          <h2 className="text-center text-3xl font-bold">
            Sign in to your account
          </h2>

          <div className="mt-8 space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action="#"
              method="POST"
              className="space-y-6"
            >
              <div>
                <Label htmlFor="email">username</Label>
                <Input
                  id="username"
                  type="username"
                  autoComplete="username"
                  className="mt-1"
                  {...register("username", {
                    required: "username is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="mt-1"
                  {...register("email", { required: "username is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <Label htmlFor="level">Select Level</Label>
                <select
                  id="level"
                  {...register("level")}
                  className="w-full mt-1 px-3 py-2 bg-slate-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {/* <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/90 font-medium">
                    Forgot your password?
                  </Link>
                </div> */}
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
                <p className="mt-4 text-center text-sm text-gray-400">
                  Already a member?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-gray-800 hover:text-gray-400"
                  >
                    Login to your account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
