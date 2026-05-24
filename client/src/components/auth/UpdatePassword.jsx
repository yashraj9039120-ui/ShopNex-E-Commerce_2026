// import React, { useEffect, useState } from 'react';
// import '../UserStyles/Form.css'
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import PageTitle from '../components/PageTitle';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice';
// import { toast } from 'react-toastify';
// import Loader from '../shared/Loader';

// function UpdatePassword() {
//     const {success,loading,error}=useSelector(state=>state.user)
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const [oldPassword,setOldPassword]=useState("");
//     const [newPassword,setNewPassword]=useState("");
//     const [confirmPassword,setConfirmPassword]=useState("");
//     const updatePasswordSubmit=(e)=>{
//         e.preventDefault();
//         const myForm=new FormData();
//         myForm.set("oldPassword",oldPassword)
//         myForm.set("newPassword",newPassword)
//         myForm.set("confirmPassword",confirmPassword);
//         for(let pair of myForm.entries()){
//             console.log(pair[0]+'-'+pair[1]);
//            }
//         dispatch(updatePassword(myForm))
//     }
//           useEffect(()=>{
//             if(error){
//               toast.error(error,{position:'top-center',autoClose:3000});
//               dispatch(removeErrors())
//             }
//           },[dispatch,error])
//      useEffect(()=>{
//             if(success){
//               toast.success("Password Updated successfully",{position:'top-center',autoClose:3000});
//               dispatch(removeSuccess());
//               navigate("/profile")
//             }
//           },[dispatch,success])
//   return (
//     <>
//    {loading?(<Loader/>):( <>
//     <Navbar/>
//     <PageTitle title="Password Update"/>
//     <div className="container update-container">
//           <div className="form-content">
//             <form className="form" onSubmit={updatePasswordSubmit}>
//                 <h2>Update Password</h2>
//                 <div className="input-group">
//                     <input type="password"  name="oldPassword" placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <input type="password"  name="newPassword" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <input type="password"  name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
//                 </div>
//                 <button className="authBtn">Update Password</button>
//             </form>
//         </div>
//     </div>
//     <Footer/>
//     </>)}
//     </>
//   )
// }

// export default UpdatePassword



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword, removeErrors, removeSuccess } from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageTitle from "../../service/page/PageTitle";
import Loader from "../../shared/Loader";

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      toast.error("New password and confirm password do not match", {position:"top-center", autoClose:3000});
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password updated successfully", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageTitle title="Update Password" />

      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Update Password</h2>

          <form onSubmit={updatePasswordSubmit} className="space-y-6">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="Old Password"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="New Password"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              aria-label="Confirm Password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-3xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default UpdatePassword;
