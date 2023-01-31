import { FC, PropsWithChildren } from "react"
import { Dashboard, Inventory, Logo, User } from "../assets/svgs/svgs"
import { logOut } from "../utils/functions"
// import Logo from "../assets/logo.svg";
// import User from "../assets/user.svg";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="layout">
            <div className="header">
                <div className="brand">
                    <Logo />
                </div>
                <div className="rightNav">
                    <div className="userAvatar">
                        <User />
                        <div className="text">Igor Cruz</div>
                    </div>
                    <div className="logoutButton">
                        <div className="text" onClick={logOut}>Sair</div>
                    </div>
                </div>
            </div>
            <div className="bodyHolder">
                <div className="sideBar">
                    <ul>
                        <li>
                            <Dashboard />
                            <div className="text">Dashboard</div>
                        </li>
                        <li>
                            <Inventory />
                            <div className="text">Inventory</div>
                        </li>
                    </ul>
                </div>
                <div className="mainContent">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout