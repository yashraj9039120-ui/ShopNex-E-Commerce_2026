// import React, { useEffect, useState } from 'react';
// import '../UserStyles/Form.css'
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';
// import Loader from '../shared/Loader';

// function UpdateProfile() {
//     const [name,setName]=useState("");
//     const [email,setEmail]=useState("");
//     const [avatar,setAvatar]=useState("");
//     const [avatarPreview,setAvatarPreview]=useState('./images/profile.png');
//     const {user,error,success,message,loading}=useSelector(state=>state.user)
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const profileImageUpdate=(e)=>{
//         const reader=new FileReader();
//         reader.onload=()=>{
//             if(reader.readyState===2){
//                 setAvatarPreview(reader.result)
//                 setAvatar(reader.result)
//             }
//         }
//         reader.onerror=(error)=>{
//             toast.error('Error reading file')
            
//         }
//         reader.readAsDataURL(e.target.files[0]);
//     }
//     const updateSubmit=(e)=>{
//         e.preventDefault();
//         const myForm=new FormData();
//         myForm.set("name",name)
//         myForm.set("email",email)
//         myForm.set("avatar",avatar)
//         dispatch(updateProfile(myForm))
//     }
//       useEffect(()=>{
//         if(error){
//           toast.error(error,{position:'top-center',autoClose:3000});
//           dispatch(removeErrors())
//         }
//       },[dispatch,error])

//       useEffect(()=>{
//         if(success){
//           toast.success(message,{position:'top-center',autoClose:3000});
//           dispatch(removeSuccess());
//           navigate("/profile")
//         }
//       },[dispatch,success])
//       useEffect(()=>{
//         if(user){
//             setName(user.name)
//             setEmail(user.email)
//             setAvatarPreview(user.avatar?.url || './images/profile.png')
//         }
//       },[user])
//   return (
//     <>
//    {loading?(<Loader/>):( <>
//     <Navbar/>
//     <div className="container update-container">
//         <div className="form-content">
//             <form className="form" encType='multipart/form-data' onSubmit={updateSubmit}>
//                 <h2>Update Profile</h2>
//                 <div className="input-group avatar-group">
//                     <input type="file" accept="image/" className="file-input"   name="avatar" onChange={profileImageUpdate}/>
//                     <img src={avatarPreview} alt="User Profile" className="avatar" />
//                 </div>
//                 <div className="input-group">
//                     <input type="text" value={name} onChange={(e)=>setName(e.target.value)} name="name"/>
//                 </div>
//                 <div className="input-group">
//                     <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email"/>
//                 </div>
//                 <button className="authBtn">Update</button>
//             </form>
//         </div>
//     </div>

//     <Footer/>
//     </>)}
//     </>
//   )
// }

// export default UpdateProfile




import React, { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";
import PageTitle from "../../service/page/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeErrors, removeSuccess, updateProfile } from "../../redux/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../../shared/Loader";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/profile.png");

  const { user, error, success, message, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImageUpdate = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    reader.readAsDataURL(file);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success, message, navigate]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "/images/profile.png");
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <PageTitle title="Update Profile" />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Update Profile</h2>
          <form className="space-y-6" onSubmit={updateSubmit} encType="multipart/form-data">
            <div className="flex flex-col items-center space-y-4">
              <label
                htmlFor="avatar"
                className="cursor-pointer rounded-full border-4 border-gray-300 hover:border-indigo-600 transition"
              >
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="h-24 w-24 object-cover rounded-full"
                />
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={profileImageUpdate}
                className="hidden"
                aria-label="Upload new avatar"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Your username"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-5 py-3 text-lg placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold rounded-3xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UpdateProfile;
