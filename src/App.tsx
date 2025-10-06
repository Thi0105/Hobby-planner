import { useState } from 'react'
import './App.css'
import { createBrowserRouter, Outlet, NavLink, RouterProvider } from 'react-router-dom'
import Overall from './Overall'
import Details from './Details'
import Create from './Create'

function App() {

  const router = createBrowserRouter ([
        {
            path: "/",
            element: (
                <div>
                    <h1>Join our activities</h1>
                    <NavLink 
                      to="/"
                      style={({ isActive }) => ({
                        color: "#5f7d55",
                        fontWeight: isActive ? "bold" : "500",
                        fontSize: "1.3rem",
                        padding: "0.5rem",
                        borderBottom: isActive ? "1px solid #5f7d55" : "none"
                      })}>Overall</NavLink>

                    <NavLink 
                      to="/overview"
                      style={({ isActive }) => ({
                        color: "#5f7d55",
                        margin: "0 2rem",
                        fontSize: "1.3rem",
                        fontWeight: isActive ? "bold" : "500",
                        padding: "0.5rem",
                        borderBottom: isActive ? "1px solid #5f7d55" : "none"
                      })} end >Details</NavLink>

                    <NavLink 
                      to="/overview/create"
                      style={({ isActive }) => ({
                        color: "#5f7d55",
                        fontSize: "1.3rem",
                        padding: "0.5rem",
                        fontWeight: isActive ? "bold" : "500",
                        borderBottom: isActive ? "1px solid #5f7d55" : "none"
                      })}>Create</NavLink>   

                      <Outlet/>                 
                </div> 
            ),
            children: [
                {
                  path: "/",
                  element: <Overall/>
                },
                {
                  path: "/overview/*",
                  element: <Details/>,
                  children: [
                    { 
                      path: "create",
                      element: <Create/>
                    }
                  ]
                }
            ]
        }
    ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
