import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import {
  FaUsers,
  FaCalendarAlt,
  FaAmazonPay,
  FaUmbrellaBeach,
  FaUserAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import logoCapz from "../assets/logoCapz.png";

const adminLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "My info",
    link: "profile",
    icon: <FaUserAlt />,
  },
  {
    label: "Approvel",
    link: "approvel",
    icon: <FaCalendarAlt />,
  },
  {
    label: "Payroll",
    link: "payroll",
    icon: <FaAmazonPay />,
  },
  {
    label: "Attendance",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "User Management",
    link: "allEmployee",
    icon: <FaUmbrellaBeach />,
  },
];

const userLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "My info",
    link: "profile",
    icon: <FaUserAlt />,
  },
  {
    label: "Leaves",
    link: "leave",
    icon: <FaCalendarAlt />,
  },
];

const managerLinks = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "My info",
    link: "profile",
    icon: <FaUserAlt />,
  },
  {
    label: "Leaves",
    link: "leave",
    icon: <FaCalendarAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  
  let sidebarLinks = [];
  if (user.isAdmin) {
    sidebarLinks = adminLinks;
  } else if (user.isManager) {
    sidebarLinks = managerLinks;
  } else {
    sidebarLinks = userLinks;
  }

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <img src={logoCapz} className="p-4 w-48 h-20" alt="Logo" />
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
