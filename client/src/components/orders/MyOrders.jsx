// import React, { useEffect } from 'react';
// import '../OrderStyles/MyOrders.css'
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import PageTitle from '../components/PageTitle';
// import { Link } from 'react-router-dom';
// import { LaunchOutlined } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllMyOrders, removeErrors } from '../features/order/orderSlice';
// import Loader from '../shared/Loader';

// function MyOrders() {
//     const {orders,loading,error}=useSelector(state=>state.order);
    
//     const dispatch=useDispatch();
//     useEffect(()=>{
//         dispatch(getAllMyOrders());
//         if(error){
//               toast.error(error,{position:'top-center',autoClose:3000});
//                   dispatch(removeErrors())
//         }
//     },[dispatch,error])
//   return (
//   <>
//   <Navbar/>
//   <PageTitle title="User Order"/>
//    {loading?(<Loader/>):orders.length>0?( <div className="my-orders-container">
//         <h1>My Orders</h1>
//         <div className="table-responsive">
//             <table className="orders-table">
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Items Count</th>
//                         <th>Status</th>
//                         <th>Total Price</th>
//                         <th>View Order</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                    { orders.map((order)=>(
//                     <tr key={order._id}>
//                         <td>{order._id}</td>
//                         <td>{order.orderItems.length}</td>
//                         <td>{order.orderStatus}</td>
//                         <td>{order.totalPrice}</td>
//                         <td><Link to={`/order/${order._id}` }className='order-link'><LaunchOutlined/></Link></td>
//                     </tr>
//                    ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>):(
//         <div className="no-orders">
//             <p className="no-order-message">No Orders Found</p>
//         </div>
//     )}

//   <Footer/>
//   </>
//   )
// }

// export default MyOrders




import React, { useEffect } from 'react';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import PageTitle from '../../service/page/PageTitle';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrders, removeErrors } from '../../redux/order/orderSlice';
import Loader from '../../shared/Loader';
import { toast } from 'react-toastify';

function MyOrders() {
  const { orders, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const statusColor = (status) => {
    if (status.toLowerCase().includes('delivered')) return 'bg-green-100 text-green-700';
    if (status.toLowerCase().includes('processing')) return 'bg-yellow-100 text-yellow-700';
    if (status.toLowerCase().includes('cancelled')) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <Navbar />
      <PageTitle title="My Orders" />

      <main className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg mt-10 shadow">
        {loading ? (
          <Loader />
        ) : orders.length > 0 ? (
          <>
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">My Orders</h1>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {['Order ID', 'Items Count', 'Status', 'Total Price', 'View Order'].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-indigo-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.orderItems.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.orderStatus)}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ₹{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-indigo-600 hover:text-indigo-800">
                        <Link to={`/order/${order._id}`} aria-label="View order details">
                          <LaunchOutlined fontSize="medium" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-60">
            <p className="text-gray-500 text-lg font-medium">No Orders Found</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default MyOrders;
