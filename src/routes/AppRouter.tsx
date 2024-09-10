
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

//pages


import HomePage from '../pages/HomePage/HomePage';



const router = createBrowserRouter([{
 path: '/',
 element:  <HomePage/>

//  children:[
//     {
//         index:true,
//         element:<PageSuspenseFallback><Home/></PageSuspenseFallback> 
//     },
//     {
//       path: "cart",
//       element: <Suspense fallback="we are loading wait ..."><Cart/></Suspense> 
//   },
//   {
//     path: "wishlist",
//     element: <ProtectedRoutes>
//             <PageSuspenseFallback><WishList/></PageSuspenseFallback>  
//             </ProtectedRoutes>

// },
//     {
//         path: "categories",
//         element: <PageSuspenseFallback><Categories/></PageSuspenseFallback>  
//     },
//     {
//         path: "about-us",
//         element:<PageSuspenseFallback><AboutUs/></PageSuspenseFallback>  

//     },
//     {
//       path: "profile",
//       element:(  <ProtectedRoutes>
//                 <PageSuspenseFallback><ProfileInfo/></PageSuspenseFallback>  
//                  </ProtectedRoutes>) ,
//       children :[
//         {
//           index:true ,
//           element:<PageSuspenseFallback><Account/></PageSuspenseFallback> 
//         },
//         {
//           path: "orders",
//           element:   <PageSuspenseFallback><Orders/></PageSuspenseFallback>  
//       }
//       ]
//   },
//     {
//         path: "categories/products/:prefix",
//         element: <Suspense fallback="we are loading wait ..."><Products/></Suspense>, 
//         loader: ({params})=>{
//             if (
//                 typeof params.prefix !== "string" ||
//                 !/^[a-z]+$/i.test(params.prefix)
//               ) {
//                 throw new Response("Bad Request", {
//                   statusText: "Category not found",
//                   status: 400,
//                 });
//               }
//             return true;
//         }

//     },
//     {
//         path: "login",
//         element: <PageSuspenseFallback><Login/></PageSuspenseFallback>  
      
//     },
//     {
//         path: "register",
//         element: <PageSuspenseFallback><Register/></PageSuspenseFallback> 
//     },
//  ]
}])

function AppRouter() {
  return (
    <RouterProvider router={router}/>
  )
}

export default AppRouter