// import React, { useEffect, useState } from 'react';
// import {
//   AddBox,
//   AttachMoney,
//   CheckCircle,
//   Dashboard as DashboardIcon,
//   Error,
//   Instagram,
//   Inventory,
//   LinkedIn,
//   People,
//   ShoppingCart,
//   Star,
//   YouTube,
//   Menu,
//   Close
// } from '@mui/icons-material';
// import Navbar from '../../components/home/Navbar';
// import PageTitle from '../../service/page/PageTitle';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminProducts, fetchAllOrders } from '../../redux/admin/adminSlice';

// function Dashboard() {
//   const { products, orders, totalAmount } = useSelector(state => state.admin);
//   const dispatch = useDispatch();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       await Promise.all([
//         dispatch(fetchAdminProducts()),
//         dispatch(fetchAllOrders())
//       ]);
//       setLoading(false);
//     };
//     loadData();
//   }, [dispatch]);

//   const totalProducts = products.length;
//   const totalOrders = orders.length;
//   const outOfStock = products.filter(product => product.stock === 0).length;
//   const inStock = products.filter(product => product.stock > 0).length;
//   const totalReviews = products.reduce((acc, product) => acc + (product.reviews.length || 0), 0);

//   const formattedTotalAmount = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0
//   }).format(totalAmount);

//   const stats = [
//     { icon: Inventory, title: 'Total Products', value: totalProducts, color: 'bg-blue-600' },
//     { icon: ShoppingCart, title: 'Total Orders', value: totalOrders, color: 'bg-green-600' },
//     { icon: Star, title: 'Total Reviews', value: totalReviews, color: 'bg-yellow-400' },
//     { icon: AttachMoney, title: 'Total Revenue', value: formattedTotalAmount, color: 'bg-emerald-600' },
//     { icon: Error, title: 'Out Of Stock', value: outOfStock, color: 'bg-red-600' },
//     { icon: CheckCircle, title: 'In Stock', value: inStock, color: 'bg-teal-600' },
//   ];

//   const socialStats = [
//     { icon: Instagram, name: 'Instagram', followers: '123K', posts: '12', color: 'bg-pink-500' },
//     { icon: LinkedIn, name: 'LinkedIn', followers: '55K', posts: '6', color: 'bg-blue-700' },
//     { icon: YouTube, name: 'YouTube', followers: '45K', posts: '500', color: 'bg-red-600' },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 overflow-x-hidden">
//       <Navbar />
//       <PageTitle title="Admin Dashboard" />

//       {/* Mobile sidebar toggle */}
//       <div className="fixed top-4 left-4 z-50 md:hidden">
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="p-3 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           aria-label={sidebarOpen ? "Close menu" : "Open menu"}
//           aria-expanded={sidebarOpen}
//         >
//           {sidebarOpen ? <Close fontSize="medium" /> : <Menu fontSize="medium" />}
//         </button>
//       </div>

//       <div className="flex pt-16">
//         {/* Sidebar */}
//         <aside
//           className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-300 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 rounded-r-lg shadow-xl
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//           aria-label="Sidebar Navigation"
//         >
//           <div className="flex items-center justify-center h-16 bg-gray-800 rounded-r-lg shadow-inner px-6 border-b border-gray-700">
//             <DashboardIcon className="text-white mr-3" fontSize="large" />
//             <h1 className="text-white font-extrabold text-xl tracking-wide select-none">Admin Dashboard</h1>
//           </div>

//           <nav className="mt-10 px-4" aria-label="Main navigation">
//             {[{
//               heading: 'Products',
//               links: [
//                 { to: "/admin/products", icon: Inventory, label: "All Products" },
//                 { to: "/admin/product/create", icon: AddBox, label: "Create Product" }
//               ]
//             }, {
//               heading: 'Users',
//               links: [
//                 { to: "/admin/users", icon: People, label: "All Users" }
//               ]
//             }, {
//               heading: 'Orders',
//               links: [
//                 { to: "/admin/orders", icon: ShoppingCart, label: "All Orders" }
//               ]
//             }, {
//               heading: 'Reviews',
//               links: [
//                 { to: "/admin/reviews", icon: Star, label: "All Reviews" }
//               ]
//             }].map(({ heading, links }, i) => (
//               <div key={i} className="mb-8">
//                 <h3 className="uppercase text-xs font-semibold tracking-wide text-gray-500 mb-4 pl-3 select-none">{heading}</h3>
//                 {links.map(({ to, icon: IconComp, label }) => (
//                   <Link
//                     key={label}
//                     to={to}
//                     onClick={() => setSidebarOpen(false)}
//                     className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <IconComp className="mr-3 text-lg" />
//                     <span>{label}</span>
//                   </Link>
//                 ))}
//               </div>
//             ))}
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 p-8 md:ml-0">
//           {/* Stats Grid */}
//           <section aria-label="Statistics overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             {stats.map(({ icon: IconComp, title, value, color }, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300 focus-within:ring-4 focus-within:ring-blue-400"
//                 tabIndex={0}
//               >
//                 <div className="flex items-center">
//                   <div className={`p-4 rounded-full ${color} text-white shadow-md mr-5 flex items-center justify-center`}>
//                     <IconComp fontSize="large" />
//                   </div>
//                   <div>
//                     <h2 className="text-gray-400 font-medium text-sm tracking-wide">{title}</h2>
//                     <p className="text-3xl font-extrabold text-gray-900">{value}</p>
//                   </div>
//                 </div>
//                 <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 select-none">Updated just now</p>
//               </div>
//             ))}
//           </section>

//           {/* Social Stats */}
//           <section aria-label="Social media overview" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {socialStats.map(({ icon: IconComp, name, followers, posts, color }, index) => (
//               <article
//                 key={index}
//                 className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 focus-within:ring-4 focus-within:ring-blue-400"
//                 tabIndex={0}
//               >
//                 <header className="flex items-center mb-4">
//                   <div className={`${color} p-3 rounded-full text-white shadow-md mr-4 flex items-center justify-center`}>
//                     <IconComp fontSize="large" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
//                 </header>
//                 <div className="space-y-2 text-gray-700 font-medium select-none">
//                   <p className="flex justify-between">
//                     <span>Followers:</span> <span>{followers}</span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span>Posts:</span> <span>{posts}</span>
//                   </p>
//                 </div>
//                 <button
//                   className="mt-6 w-full py-3 bg-gray-100 rounded-lg text-gray-900 font-semibold hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   aria-label={`View analytics for ${name}`}
//                 >
//                   View Analytics
//                 </button>
//               </article>
//             ))}
//           </section>

//           {/* Quick Actions */}
//           <section aria-label="Quick administrative actions" className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 select-none">Quick Actions</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               <Link
//                 to="/admin/product/create"
//                 className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400"
//                 aria-label="Add a new product"
//               >
//                 <AddBox className="text-blue-600 mb-3" fontSize="large" />
//                 <span className="text-blue-600 font-semibold text-lg">Add Product</span>
//               </Link>
//               <Link
//                 to="/admin/orders"
//                 className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-400"
//                 aria-label="View orders"
//               >
//                 <ShoppingCart className="text-green-600 mb-3" fontSize="large" />
//                 <span className="text-green-600 font-semibold text-lg">View Orders</span>
//               </Link>
//               <Link
//                 to="/admin/users"
//                 className="flex flex-col items-center justify-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400"
//                 aria-label="Manage users"
//               >
//                 <People className="text-purple-600 mb-3" fontSize="large" />
//                 <span className="text-purple-600 font-semibold text-lg">Manage Users</span>
//               </Link>
//               <Link
//                 to="/admin/reviews"
//                 className="flex flex-col items-center justify-center p-6 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-amber-400"
//                 aria-label="Check reviews"
//               >
//                 <Star className="text-amber-600 mb-3" fontSize="large" />
//                 <span className="text-amber-600 font-semibold text-lg">Check Reviews</span>
//               </Link>
//             </div>
//           </section>
//         </main>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           aria-label="Close sidebar"
//         />
//       )}
//     </div>
//   );
// }

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import {
  AddBox,
  AttachMoney,
  CheckCircle,
  Dashboard as DashboardIcon,
  Error,
  Inventory,
  People,
  ShoppingCart,
  Star,
  Menu,
  Close
} from '@mui/icons-material';
import Navbar from '../../components/home/Navbar';
import PageTitle from '../../service/page/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders } from '../../redux/admin/adminSlice';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

function Dashboard() {
  const { products, orders, totalAmount } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([dispatch(fetchAdminProducts()), dispatch(fetchAllOrders())]);
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const inStock = products.filter(p => p.stock > 0).length;
  const totalReviews = products.reduce((acc, p) => acc + (p.reviews?.length || 0), 0);
  const formattedTotalAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalAmount);

  const stats = [
    { icon: Inventory, title: 'Total Products', value: totalProducts, color: 'bg-blue-600' },
    { icon: ShoppingCart, title: 'Total Orders', value: totalOrders, color: 'bg-green-600' },
    { icon: Star, title: 'Total Reviews', value: totalReviews, color: 'bg-yellow-400' },
    { icon: AttachMoney, title: 'Total Revenue', value: formattedTotalAmount, color: 'bg-emerald-600' },
    { icon: Error, title: 'Out Of Stock', value: outOfStock, color: 'bg-red-600' },
    { icon: CheckCircle, title: 'In Stock', value: inStock, color: 'bg-teal-600' }
  ];

  // Chart data
  const lineChartData = {
    labels: orders.map(o => new Date(o.createdAt).toLocaleDateString()),
    datasets: [{
      label: "Revenue",
      data: orders.map(o => o.totalPrice),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.2)",
      tension: 0.3,
      fill: true
    }]
  };

  const barChartData = {
    labels: products.map((p, idx) => p.name || `Product ${idx+1}`),
    datasets: [{
      label: "Stock Quantity",
      data: products.map(p => p.stock),
      backgroundColor: products.map((_, idx) => `hsl(${(idx*50)%360},70%,50%)`)
    }]
  };

  const doughnutChartData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [{
      data: [inStock, outOfStock],
      backgroundColor: ["#10b981", "#ef4444"],
      hoverOffset: 10
    }]
  };

  const pieChartData = {
    labels: ["Electronics", "Fashion", "Beauty", "Home", "Other"],
    datasets: [{
      data: [12, 19, 16, 8, 6], 
      backgroundColor: ["#3b82f6", "#facc15", "#8b5cf6", "#10b981", "#ef4444"]
    }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <PageTitle title="Admin Dashboard" />

      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition duration-200">
          {sidebarOpen ? <Close /> : <Menu />}
        </button>
      </div>

      <div className="flex pt-0"> {/* Reduced top padding */}
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-300 transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-center h-16 bg-gray-800 px-6 border-b border-gray-700">
            <DashboardIcon className="text-white mr-3" />
            <h1 className="text-white font-bold text-xl">Admin Dashboard</h1>
          </div>
          <nav className="mt-6 px-4">
            {[{
              heading: 'Products',
              links: [
                { to: "/admin/products", icon: Inventory, label: "All Products" },
                { to: "/admin/product/create", icon: AddBox, label: "Create Product" }
              ]
            }, {
              heading: 'Users',
              links: [{ to: "/admin/users", icon: People, label: "All Users" }]
            }, {
              heading: 'Orders',
              links: [{ to: "/admin/orders", icon: ShoppingCart, label: "All Orders" }]
            }, {
              heading: 'Reviews',
              links: [{ to: "/admin/reviews", icon: Star, label: "All Reviews" }]
            }].map(({ heading, links }, i) => (
              <div key={i} className="mb-6">
                <h3 className="uppercase text-xs font-semibold text-gray-500 mb-3">{heading}</h3>
                {links.map(({ to, icon: IconComp, label }) => (
                  <Link key={label} to={to} onClick={() => setSidebarOpen(false)} className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
                    <IconComp className="mr-3" /> {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:ml-0">
          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map(({ icon: IconComp, title, value, color }, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 flex items-center hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className={`p-4 rounded-full ${color} text-white mr-4`}><IconComp /></div>
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[{
              title: "Revenue Over Time",
              type: Line,
              data: lineChartData
            }, {
              title: "Product Stock",
              type: Bar,
              data: barChartData
            }, {
              title: "Stock Status",
              type: Doughnut,
              data: doughnutChartData
            }, {
              title: "Category Distribution",
              type: Pie,
              data: pieChartData
            }].map(({ title, type: ChartComp, data }, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-md h-80 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <h3 className="font-semibold mb-2">{title}</h3>
                <ChartComp data={data} options={chartOptions} />
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
