import logo from "../assets/logo.png";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";

const Sidebar = ({ modal, modal2, modal3 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [togle, setTogle] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (
      location.pathname == "/surat-masuk" ||
      location.pathname == "/balasan-surat" ||
      location.pathname == "/surat-masuk/disposisi-surat"
    ) {
      setTogle((prev) => !prev);
    }
  }, []);

  const handlerTogglePersuratan = () => {
    setTogle((prev) => !prev);
  };

  const HandlerLogout = () => {
    sessionStorage.setItem("token", "");
    setAuth(null);
    toast.success("Berhasil logout", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className={`sidebar grid grid-rows-8 bg-white drop-shadow-custom font-poppins text-sm py-1 ${
        modal || modal2 || modal3 ? "blur-sm" : null
      }`}
    >
      <div className="self-center xl:flex items-center mx-auto justify-center">
        <div className="xl:w-1/4 xl:mx-0 ">
          <img src={logo} alt="" className="mx-auto xl:mx-0 w-2/5 xl:w-5/6" />
        </div>
        <h3 className="hidden text-base xl:block font-bold">
          ATR/BPN JEMBER
        </h3>
      </div>
      <div className="menu mx-8 row-start-3 row-end-8 xl:mx-6">
        <ul>
          <li
            className={`${
              location.pathname == "/dashboard"
                ? "bg-secondary rounded-lg text-white"
                : null
            } hover:cursor-pointer`}
          >
            <Link
              to={"/dashboard"}
              className="py-3 flex gap-3 items-center font-medium text-sm xl:px-3"
            >
              <GoHome size="1.5rem" />
              <p
                className={`${
                  location.pathname == "/dashboard"
                    ? "text-white"
                    : "text-custom"
                } font-semibold hidden xl:block`}
              >
                Beranda
              </p>
            </Link>
          </li>
          <li
            onClick={handlerTogglePersuratan}
            className={`${
              location.pathname == "/persuratan"
                ? "bg-secondary rounded-lg text-white"
                : null
            } hover:cursor-pointer py-3 grid grid-cols-4 gap-3 items-center font-medium text-sm xl:px-3 justify-between`}
          >
            <div className="left flex gap-3 col-start-1 col-end-4 justify-self-start">
              <SlEnvolopeLetter size="1.4rem" />
              <p className="text-custom font-semibold hidden xl:block">
                Persuratan
              </p>
            </div>
            <div className="right justify-self-end col-col-start-4 col-end-5">
              {togle ? (
                <FaChevronUp size="1rem" />
              ) : (
                <FaChevronDown size="1rem" />
              )}
            </div>
            <div
              className={`sub-menu col-start-1 col-end-5 ${
                togle ? "block" : "hidden"
              }`}
            >
              <ol className="xl:list-disc xl:list-inside ">
                <Link to={"/surat-masuk?page=1"}>
                  <li
                    className={`${
                      location.pathname == "/surat-masuk"
                        ? "bg-secondary text-white text-sm"
                        : "text-custom font-semibold"
                    } py-2 px-5 rounded-md`}
                  >
                    Surat Masuk
                  </li>
                </Link>
                <Link to={"/balasan-surat?page=1"}>
                  <li
                    className={`${
                      location.pathname == "/balasan-surat"
                        ? "bg-secondary text-white text-sm"
                        : "text-custom font-semibold"
                    } py-2 px-5 rounded-md`}
                  >
                    Balasan Surat
                  </li>
                </Link>
              </ol>
            </div>
          </li>
          <li
            className={`${
              location.pathname == "/rekap-surat"
                ? "bg-secondary rounded-lg text-white"
                : null
            } hover:cursor-pointer`}
          >
            <Link
              to={"/rekap-surat?page=1"}
              className="py-3 flex gap-3 items-center font-medium text-sm xl:px-3"
            >
              <CiViewList size="1.5rem" />
              <p
                className={`${
                  location.pathname == "/rekap-surat"
                    ? "text-white"
                    : "text-custom"
                } font-semibold hidden xl:block`}
              >
                Rekap Surat
              </p>
            </Link>
          </li>
          <li
            className={`${
              location.pathname == "/manajemen-user"
                ? "bg-secondary rounded-lg text-white"
                : null
            } hover:cursor-pointer`}
          >
            <Link
              to={"/manajemen-user"}
              className="hover:cursor-pointer py-3 flex gap-3 items-center font-semibold text-sm xl:px-3"
            >
              <CiUser size="1.5rem" />
              <p
                className={`${
                  location.pathname == "/manajemen-user"
                    ? "text-white"
                    : "text-custom"
                } font-semibold hidden xl:block`}
              >
                Manajemen User
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="account row-span-8 grid">
        <div className="grid items-center">
          <div
            className={` ${
              location.pathname == "/profile" ? "bg-secondary text-white" : null
            } flex flex-col xl:flex-row justify-between items-center mx-8 py-2 xl:px-5 rounded-lg gap-2 xl:gap-0`}
          >
            <Link to={"/profile"}>
              <div className="status hidden xl:block">
                <h4 className="font-bold text-sm">{auth?.name}</h4>
                <p className="text-xs">{auth?.email}</p>
              </div>
              <div className="xl:hidden">
                <CgProfile size="1.5rem" />
              </div>
            </Link>
            <button className="logout mx-2" onClick={HandlerLogout}>
              <HiOutlineLogout size="1.5rem" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
