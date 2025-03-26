import { Outlet } from "react-router"
import { Nav } from "../components/nav"
import { Footer } from "../components/footer"

export const Layout = () => {
    return(
        <>
        <header><Nav /></header>
        <main><Outlet /></main>
        <footer><Footer /></footer>
        </>
    )
}