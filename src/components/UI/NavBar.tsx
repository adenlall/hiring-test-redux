import Link from "next/link"
import SessionTypeToggle from "../Triggers/sessiontypeToggle"

export default function NavBar() {

    return <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href={"/"} className="btn btn-ghost text-md md:text-xl">Hiring Test - Janah Bilal</Link>
        </div>
        <SessionTypeToggle/>
        <div className="flex-none">
            
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn mx-1 btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><Link href="/settings">Settings</Link></li>
                    <li><Link href="https://github.com/adenlall/hiring-test-redux">Source Code</Link></li>
                </ul>
            </div>

        </div>
    </div>
}