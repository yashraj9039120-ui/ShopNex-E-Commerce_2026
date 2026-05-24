// import React, { useEffect, useState } from 'react';
// import '../UserStyles/Form.css'
// import PageTitle from '../components/PageTitle';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
// import { toast } from 'react-toastify';
// import Loader from '../shared/Loader';

// function ForgotPassword() {
//     const {loading,error,success,message}=useSelector(state=>state.user);
//     const dispatch=useDispatch();
//     const [email,setEmail]=useState("");
//     const forgotPasswordEmail=(e)=>{
//         e.preventDefault();
//         const myForm=new FormData();
//         myForm.set('email',email)
//         dispatch(forgotPassword(myForm))
//         setEmail("");
//     }
//         useEffect(()=>{
//                 if(error){
//                   toast.error(error,{position:'top-center',autoClose:3000});
//                   dispatch(removeErrors())
//                 }
//               },[dispatch,error])

//         useEffect(()=>{
//                 if(success){
//                   toast.success(message,{position:'top-center',autoClose:3000});
//                   dispatch(removeSuccess());
//                 }
//               },[dispatch,success])
//   return (
//     <>
// {loading?(<Loader/>):(    <>
//     <PageTitle title="Forgot Password"/>
//     <Navbar/>
//         <div className="container forgot-container">
//             <div className="form-content email-group">
//             <form className="form" onSubmit={forgotPasswordEmail}>
//                 <h2>Forgot Password</h2>
//                 <div className="input-group">
//                     <input type="email" placeholder='Enter your registered email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//                 </div>
//                 <button className="authBtn">Send</button>
//             </form>
//             </div>
//         </div>

//     <Footer/>
//     </>)}
//     </>
//   )
// }

// export default ForgotPassword



import React, { useEffect, useState } from 'react';
import PageTitle from '../../service/page/PageTitle';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../../redux/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../../shared/Loader';

function ForgotPassword() {
  const { loading, error, success, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const forgotPasswordEmail = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Forgot Password" />
          <Navbar />

          <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg">
              <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">Forgot Password</h2>

              <form onSubmit={forgotPasswordEmail} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-lg font-bold rounded-lg shadow hover:from-indigo-700 hover:to-purple-800 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-400"
                >
                  Send
                </button>
              </form>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default ForgotPassword;

