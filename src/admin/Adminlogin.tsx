import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import getBaseurl from "@/utils/getBaseurl";
import { useForm } from "react-hook-form";
import { handleError, handleSuccess } from "@/utils/Toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  interface FromData {
    username: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FromData>();
  const onSubmit = async (data: FromData) => {
    try {
      const response = await axios.post(`${getBaseurl()}/admin/login`, data, {
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
        navigate("/admin-dashboard");
      }, 1000);
    } catch (error) {
      console.log(error);
      handleError("error occured cannot login");
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
              action="#"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  {...register("username", {
                    required: "username is required",
                  })}
                  type="username"
                  autoComplete="username"
                  required
                  className="mt-1"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
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
                  required
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
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
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
         
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
