// import React, { useEffect, useState } from 'react';
// import '../UserStyles/Form.css'
// import PageTitle from '../components/PageTitle';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
// import { toast } from 'react-toastify';

// function ResetPassword() {
//     const {success,loading,error}=useSelector(state=>state.user)
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//         const [password,setPassword]=useState("");
//         const [confirmPassword,setConfirmPassword]=useState("");
//         const {token}=useParams()
        
//     const resetPasswordSubmit=(e)=>{
//         e.preventDefault();
//         const data={
//             password,
//             confirmPassword,
//         }
//         dispatch(resetPassword({token,userData:data}))
        
//     }
//         useEffect(()=>{
//                 if(error){
//                   toast.error(error,{position:'top-center',autoClose:3000});
//                   dispatch(removeErrors())
//                 }
//               },[dispatch,error])

//       useEffect(()=>{
//                 if(success){
//                   toast.success("Password Reset Successful",{position:'top-center',autoClose:3000});
//                   dispatch(removeSuccess());
//                   navigate("/login")
//                 }
//               },[dispatch,success])
//   return (
//    <>
//   <PageTitle title="Reset Password"/>
//     <div className="container form-container">
//           <div className="form-content">
//             <form className="form" onSubmit={resetPasswordSubmit}>
//                 <h2>Reset Password</h2>
//                 <div className="input-group">
//                     <input type="password"  name="password" placeholder='Enter your new Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <input type="password"  name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
//                 </div>
//                 <button className="authBtn">Reset Password</button>
//             </form>
//         </div>
//     </div>
//    </>
//   )
// }

// export default ResetPassword




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeErrors, removeSuccess, resetPassword } from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import PageTitle from "../../service/page/PageTitle";

function ResetPassword() {
  const { success, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, userData: { password, confirmPassword } }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password Reset Successful", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, success, navigate]);

  return (
    <>
      <PageTitle title="Reset Password" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
          <form className="space-y-5" onSubmit={resetPasswordSubmit}>
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600 font-semibold">
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-gray-600 font-semibold">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                autoComplete="new-password"
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
              type="submit"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm">
            Remembered your password?
            <span
              className="ml-1 text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
