export const regFormControls=[
    {
        name:"UserName",
        label:"User Name",
        placeholder:"Please Enter Your name",
        componentType:"input", //in this project we use only input tags now but if you need other tags like select,textholder,checkboxes you can add in this
        type:"text"
    },
  
    {
        name:"email",
        label:"Email",
        placeholder:"Please Enter Your email",
        componentType:"input",
        type:"email"
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Please Enter Your Password",
        componentType:"input",
        type:"password"
    },
]


export const intialRegFormData={
    UserName:"",
    email:"",
    password:"",

}




export const loginFormControls=[
    {
        name:"email",
        label:"Email",
        placeholder:"Please Enter Your email",
        componentType:"input",
        type:"email"
    },
    {
        name:"password",
        label:"Password",
        placeholder:"Please Enter Your Password",
        componentType:"input",
        type:"password"
    }

]


export const initialLoginFormData={
    email:"",
    password:""
}



