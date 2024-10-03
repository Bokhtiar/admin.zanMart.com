import { Link, useNavigate } from "react-router-dom";
import { removeToken } from '../../utils/helper'
import { IoIosNotifications } from "react-icons/io";


export const DashboardNavbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        removeToken()
        navigate('/')
    }

    const gradientStyle = {
      background: "#E5E7E9",
      // Adjust the gradient colors and image URL as needed
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      width: "100%",
    };

    return (
      <>
        <div className="bg-base-100 sticky top-0 z-50  ">
          <div className=" " style={gradientStyle}>
            <div className="navbar rounded-lg  px-10">
              {/* responsive navbar start */}
              <div className="navbar-start ">
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link
                        to="/dashboard"
                        className="font-content font-semibold"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/companies"
                        className="font-content font-semibold"
                      >
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/seeker"
                        className="font-content font-semibold"
                      >
                        Seeker
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/circular"
                        className="font-content font-semibold"
                      >
                        Circular
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/category"
                        className="font-content font-semibold"
                      >
                        Category
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/skill"
                        className="font-content font-semibold"
                      >
                        Skill
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/division"
                        className="font-content font-semibold"
                      >
                        Division
                      </Link>
                    </li>


                    <li>
                      <Link
                        to="/dashboard/district"
                        className="font-content font-semibold"
                      >
                        District
                      </Link>
                    </li>


                    <li>
                      <Link
                        to="/dashboard/upazila"
                        className="font-content font-semibold"
                      >
                        Upazila
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/education-board"
                        className="font-content font-semibold"
                      >
                        Education Board
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/degree"
                        className="font-content font-semibold"
                      >
                        Degree
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/subject"
                        className="font-content font-semibold"
                      >
                        Sujbect
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/dashboard/cv-request"
                        className="font-content font-semibold"
                      >
                        Cv Request
                      </Link>
                    </li>

                    


                    <li>
                      <span className=" cursor-pointer" onClick={() => logout()}>
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
                <Link className="" to="/">
                  <img
                    height={16}
                    width={60}
                    className="d-block border  rounded-md"
                    src="https://jobmedia.com.bd/images/assets/logo.png"
                    alt=""
                  />
                </Link>
              </div>
              {/* responsive navbar end */}

              <div className="navbar-end mt-1 ">
               
                 
                  <div className="flex">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <div className="indicator">
                        <IoIosNotifications className="text-xl"/>
                          <span className="badge badge-sm indicator-item ">
                            8
                          </span>
                        </div>
                      </div>
                      <div
                        tabIndex={0}
                        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                      >
                        <div className="card-body">
                          
                          <div className="card-actions">
                            <button className="btn btn-primary btn-block">
                              View Notification
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </a>
                        </li>
                        <li>
                          <a>Settings</a>
                        </li>
                      <li onClick={() => logout()}>
                          <a>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </>
    );
}