import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Register() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

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

  const loginChange = (e) => {
    const { name, value } = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    });
  };
  const { setUser } = useCart();
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(loginData);

    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      if (users.length === 0) {
        alert("No users found");
        return;
      }

      const validUser = users.find(
        (user) =>
          user.email === loginData.email &&
          user.password === loginData.password,
      );
      if (validUser) {
        localStorage.setItem("user", JSON.stringify(validUser));
        alert("Login Successfull");
        setUser(validUser);
        navigate("/products", { replace: true });
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      alert(error);
    }

    setloginData({
      email: "",
      password: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        ...formData,
        cart: [],
      };
      await axios.post("http://localhost:3000/users", newUser);
      alert("Data Saved successfully");
    } catch (error) {
      alert(error);
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
      <div className="h-screen w-full bg-blue-300 flex items-center justify-center">
        <div className="w-96 bg-blue-200 rounded-xl py-10 px-8">
          <div className="flex justify-between mb-6 bg-blue-300 rounded-full">
            <button
              className={`w-1/2 py-2.5 rounded-full text-[17px] hover:bg-blue-500 hover:text-white font-bold transition duration-400 ease-in-out cursor-pointer ${
                activeForm === "register"
                  ? "bg-blue-600 text-white"
                  : "text-black"
              }`}
              onClick={() => setactiveForm("register")}
            >
              Register
            </button>
            <button
              className={`w-1/2 py-2.5 rounded-full font-bold text-[17px] hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out cursor-pointer ${
                activeForm === "login" ? "bg-blue-600 text-white" : "text-black"
              }`}
              onClick={() => setactiveForm("login")}
            >
              Login
            </button>
          </div>
          {activeForm === "register" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="" className="text-gray-800 font-bold">
                Name:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded "
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="" className="text-gray-800 font-bold">
                Email:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="" className="text-gray-800 font-bold">
                Phone No:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded"
                type="tel"
                name="phoneNo"
                placeholder="Enter Your Phone No"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
              <label htmlFor="" className="text-gray-800 font-bold">
                Password:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="w-full bg-blue-600 text-white py-2.5 text-[17px] cursor-pointer hover:bg-blue-500 rounded-md font-bold">
                Register
              </button>
            </form>
          )}
          {activeForm === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <label htmlFor="" className="text-gray-800 font-bold">
                Email:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={loginData.email}
                onChange={loginChange}
                required
              />
              <label htmlFor="" className="text-gray-800 font-bold">
                Password:
              </label>
              <input
                className="w-full border px-2 py-2.5 rounded"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={loginData.password}
                onChange={loginChange}
                required
              />

              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[17px] cursor-pointer py-2.5 rounded-md font-bold">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
