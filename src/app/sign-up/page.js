"use client";

import FormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import { regFormControls, intialRegFormData } from "@/index";
import { RegisterUser, RegisterUserAction } from "@/server-actions";
import {  useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUp = () => {
  const [formData,setFormData]=useState(intialRegFormData);
  const router=useRouter();
  const handleDisabled=()=>{
    return Object.keys(formData).every((key)=>formData[key].trim()!=="");
  }

  const handleSignUp=async()=>{
    console.log("in sign up component");
    const result=await RegisterUserAction(formData);
    console.log(result);
    if(result?.data)router.push("/sign-in");
  }

  return (
    <div>
      <h1>Welcome to Registration</h1>
      <form action={handleSignUp}>
        {regFormControls.map((controlEle, index) => (
          <div key={index}>
            <label>{controlEle.label}</label>
            {
              <FormElement item={controlEle} value={formData[controlEle.name]}
              onChange={(e)=>{
                setFormData({...formData,[controlEle.name]:e.target.value})
              }}
              />
            }
          </div>
        ))}
        <Button className="disabled:opacity-55" disabled={!handleDisabled()} > Sign Up</Button>
        
      </form>
    </div>
  );
};

export default SignUp;
