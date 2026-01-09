import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [loginData, setloginData] = useState({
   email: "",
   password: "" 
  })

  const [data, setdata] = useState([]);
  const [activeForm, setactiveForm] = useState("register");
  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };
  const loginChange = (e) =>{
    const { name, value } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    })
  };
  const handleLogin = async (e) =>{
   e.preventDefault();
   
   console.log(loginData);

   try{
    const res =await axios.get("http://localhost:3000/users")
    const users = res.data;

   if(!Array.isArray(users) && users.length > 0){
    alert("User not found")
   }

    // users.filter(() =>{

    // })

   }catch(error){
   alert(error)
   }
   
   setloginData({
    email: "",
    password: ""
   })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/users", formData);
      alert("Data Saved successfully");
    }catch(error){
     alert(error)
    }
    // console.log(formData);

    getData();

    setformData({
      name: "",
      email: "",
      phoneNo: "",
      password: "",
    });
  };
  const getData = async () => {
    try {
      const promise = await axios({
        method: "GET",
        url: "https://fakestoreapi.com/products",
      });
      //  setdata(promise.data);
      console.log(promise.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen w-full bg-blue-300 ">
        <div className="flex items-center justify-center py-3">
          <div className="w-87 h-14 bg-blue-200 flex items-center justify-between rounded-md px-3">
            <button className="w-42 px-3 py-2 cursor-pointer transition duration-600 ease-in-out hover:bg-blue-600 bg-blue-200 text-black font-bold hover:text-white rounded-3xl"
            onClick={()=>{
              setactiveForm("register")
            }}>
              Register
              </button>
            <button className="w-42 px-3 py-2 cursor-pointer transition duration-600 ease-in-out hover:bg-blue-600 bg-blue-200 text-black font-bold hover:text-white rounded-3xl"
            onClick={() =>{
              setactiveForm("login")
            }}>
            Login
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {activeForm === "register" &&(
            
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="h-110 w-87 bg-blue-200 rounded-xl px-6 py-8"
          >
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="name" className="text-gray-800 font-bold">
                Name:
              </label>
              <input
                className="border rounded-md px-1 h-9 border-gray-600 focus:outline-none focus:border-blue-400"
                type="text"
                name="name"
                required
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="emailId" className="text-gray-800 font-bold">
                Email:
              </label>
              <input
                className="border rounded-md px-1 h-9 border-gray-600 focus:outline-none focus:border-blue-400"
                type="email"
                name="email"
                required
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="phoneNo" className="text-gray-800 font-bold">
                Phone No:
              </label>
              <input
                className="border px-1 rounded-md h-9 border-gray-600 focus:outline-none focus:border-blue-400"
                type="tel"
                name="phoneNo"
                required
                placeholder="Enter Your Phone No"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1 mb-6">
              <label htmlFor="password" className="text-gray-800 font-bold">
                Password:
              </label>
              <input
                className="border px-1 h-9 border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                type="password"
                name="password"
                required
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="w-full py-2 cursor-pointer hover:bg-blue-500 bg-blue-600 text-white font-bold rounded-md">
              Register
            </button>
          </form>
          )}
        </div>
        <div className="flex items-center justify-center mt-5">
          {activeForm === "login" && (
          <form onSubmit={(e) =>{handleLogin(e)}}
            action=""
            className="h-68 w-87 bg-blue-200 rounded-md px-6 py-8"
          >
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="" className="text-gray-800 font-bold">
                Email:
              </label>
              <input
                className="border px-1 h-9 border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                type="email"
                name="email"
                placeholder="Enter Your email"
                required
                value={loginData.email}
                onChange={loginChange}
              />
            </div>
            <div className="flex flex-col gap-1 mb-6">
              <label htmlFor="" className="text-gray-800 font-bold">
                Password:
              </label>
              <input
                className="border px-1 h-9 border-gray-600 rounded-md focus:outline-none focus:border-blue-400"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                required
                value={loginData.password}
                onChange={loginChange}
              />
            </div>
            <button className="w-full py-2 cursor-pointer hover:bg-blue-500 bg-blue-600 text-white font-bold rounded-md">
              Log in
            </button>
          </form>
          )}
        </div>
      </div>
    </>
  );
}
