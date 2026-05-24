// import React, { useEffect } from 'react'
// import '../UserStyles/Profile.css'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import PageTitle from '../components/PageTitle'
// import Loader from '../shared/Loader'

// function Profile() {
//     const {loading,isAuthenticated,user}=useSelector(state=>state.user)
//   const navigate=useNavigate();
//   useEffect(()=>{
//     if(isAuthenticated===false){
//         navigate("/login")
//     }
//   },[isAuthenticated])
//     return (
//         <>
// { loading?(<Loader/>): (  <div className="profile-container">
//         <PageTitle title={`${user.name} Profile`}/>
//         <div className="profile-image">
//             <h1 className="profile-heading">My Profile</h1>
//             <img src={user.avatar.url ?user.avatar.url:'./images/profile.png'} alt="User Profile" className="profile-image" />
//             <Link to="/profile/update">Edit Profile</Link>
//         </div>
//         <div className="profile-details">
//             <div className="profile-detail">
//                 <h2>Username:</h2>
//                 <p>{user.name}</p>
//             </div>
//             <div className="profile-detail">
//                 <h2>Email:</h2>
//                 <p>{user.email}</p>
//             </div>
//             <div className="profile-detail">
//                 <h2>Joined On:</h2>
//                 <p>{user.createdAt?String(user.createdAt).substring(0,10):'N/A'}</p>
//             </div>
//         </div>
//         <div className="profile-buttons">
//             <Link to="/orders/user">My Orders</Link>
//             <Link to="/password/update">Change Password</Link>
//         </div>
//     </div>)}</>
    
//   )
  
// }

// export default Profile




import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageTitle from '../../service/page/PageTitle';
import Loader from '../../shared/Loader';

function Profile() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <PageTitle title={`${user.name} Profile`} />
      
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-10">
        {/* Profile Image and Edit Link */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={user.avatar?.url || '/images/profile.png'}
            alt="User Profile"
            className="w-40 h-40 object-cover rounded-full shadow-md"
          />
          <Link
            to="/profile/update"
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Details */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 className="text-lg font-semibold text-gray-700">Username:</h2>
            <p className="text-gray-900 text-lg">{user.name}</p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
            <p className="text-gray-900 text-lg">{user.email}</p>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 className="text-lg font-semibold text-gray-700">Joined On:</h2>
            <p className="text-gray-900 text-lg">
              {user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/orders/user"
              className="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              My Orders
            </Link>
            <Link
              to="/password/update"
              className="flex-1 text-center px-6 py-3 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 transition"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
