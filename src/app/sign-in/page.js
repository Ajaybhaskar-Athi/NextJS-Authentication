"use client";
import FormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { initialLoginFormData, loginFormControls } from "@/index";
import { loginUserAction } from "@/server-actions";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState(initialLoginFormData);
  const router=useRouter();

  const handleLogin = async () => {
      console.log("in sign up component");
        const result= await loginUserAction(formData);
        console.log(result);
    if(result?.success)router.push("/");
  
  };

  return (
    <div>
      <h1>Welcome Back to Our Page, Please Sign IN</h1>
      <form action={handleLogin}>
        {loginFormControls.map((controlEle, index) => (
          <div key={controlEle.name}>
            <Label>{controlEle.label}</Label>
            <FormElement
              item={controlEle}
              value={formData[controlEle.name]}
              onChange={(e) => {
                setFormData({ ...formData, [controlEle.name]: e.target.value });
              }}
            />
          </div>
        ))}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
