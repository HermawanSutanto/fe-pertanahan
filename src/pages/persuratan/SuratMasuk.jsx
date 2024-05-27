import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdModeEdit, MdQuickreply } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import ModalTambahSurat from "../../components/modal/persuratan/TambahSurat";
import ModalEditSurat from "../../components/modal/persuratan/EditSurat";
import ModalDetailSurat from "../../components/modal/persuratan/DetailSurat";
import {
  GetSuratMasuk,
  GetDetailSuratMasuk,
  DeleteSuratMasuk,
  GetSearchSuratMasuk
} from "../../utils/FetchSuratMasuk";
import ModalTambahBalasan from "../../components/modal/persuratan/TambahBalasan";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsReplyAll } from "react-icons/bs";
import UseAuth from "../../hooks/UseAuth";
import { useSearchParams } from "react-router-dom";

const hideActionKakan = ["kakan"];
const hideActionSeksi = [
  "tatausaha",
  "seksi1",
  "seksi2",
  "seksi3",
  "seksi4",
  "seksi5"
];

const SuratMasukPage = () => {
  const auth = UseAuth();
  let [searchParams, setSearchParams] = useSearchParams();
  const idNotif = searchParams.get("id");
  const page = searchParams.get("page") || 1;
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [surat, setSurat] = useState([]);
  const [detail, setDetail] = useState(false);
  const [tambah, setTambah] = useState(false);
  const [id, setId] = useState(null);
  const [searchResults, setSearchResults] = useState([]); // State untuk hasil pencarian

  const HandlerSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      GetSearchSuratMasuk(value)
        .then((res) => {
          setSearchResults(res.data.letter); // Update state dengan hasil pencarian
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setSearchResults([]); // Set state kembali menjadi array kosong
        });
    } else {
      setSearchResults([]); // Jika pencarian kosong, set state menjadi array kosong
    }
  };

  useEffect(() => {
    GetSuratMasuk(page).then((res) => {
      setSurat(res.data);
      setLoading(true);
    });
  }, [page]);

  useEffect(() => {
    if (idNotif) {
      GetDetailSuratMasuk(idNotif).then((res) => {
        setDetail(res.data);
        setModal3(true);
      });
    }
  }, [idNotif]);

  const HandlerDeleteSurat = (id) => {
    Swal.fire({
      title: "Anda yakin ingin menghapus data ini?",
      text: "Data yang dihapus tidak dapat dipulihkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#828282",
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus"
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteSuratMasuk(id).then((res) => {
          setSurat((prev) => {
            const updatedLetter = prev.letter
              ? prev.letter.filter((surat) => surat.id !== id)
              : [];

            const updatedFile = prev.file
              ? prev.file.filter((surat) => surat.id !== id)
              : [];
            return {
              ...prev,
              letter: updatedLetter,
              file: updatedFile
            };
          });
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil dihapus",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  };

  const HandlerTambahSurat = ({ status }) => {
    if (status) {
      setModal(false);
      toast.success("Surat berhasil ditambah", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else if (status == false) {
      Swal.fire({
        title: "Gagal",
        text: "Lengkapi data yang kosong!",
        icon: "warning",
        iconColor: "#FB0017",
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      setModal(!modal);
    }
  };

  const HandlerEditSurat = ({ id, status }) => {
    if (status) {
      toast.success("Surat berhasil diedit", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
    if (id) {
      GetDetailSuratMasuk(id).then((res) => {
        setDetail(res.data);
        setModal2(!modal2);
      });
    } else {
      setModal2(!modal2);
    }
  };

  const HandlerDetailSurat = (id) => {
    GetDetailSuratMasuk(id).then((res) => {
      setDetail(res.data);
      setModal3(!modal3);
    });
  };

  const HandlerTambahBalasan = ({ id, status }) => {
    if (id) {
      setId(id);
    }
    if (status) {
      setTambah(false);
      toast.success("Surat berhasil dibalas", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else if (status == false) {
      Swal.fire({
        title: "Gagal",
        text: "Lengkapi data yang kosong!",
        icon: "warning",
        iconColor: "#FB0017",
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      setTambah(!tambah);
    }
  };

  return (
    <main className="grid grid-cols-5 h-screen gap-8 bg-quinary font-poppins">
      <ModalTambahSurat
        modal={modal}
        HandlerTambahSurat={HandlerTambahSurat}
        setSurat={setSurat}
        id={id}
      />
      <ModalEditSurat
        modal={modal2}
        HandlerEditSurat={HandlerEditSurat}
        surat={detail}
        setSurat={setSurat}
      />
      <ModalDetailSurat
        modal={modal3}
        HandlerDetailSurat={HandlerDetailSurat}
        surat={detail}
      />
      <ModalTambahBalasan
        modal={tambah}
        HandlerTambahBalasan={HandlerTambahBalasan}
        id={id}
      />
      <Sidebar modal={modal} modal2={modal2} modal3={modal3} />
      <div
        className={`content col-start-2 col-end-6 w-97/100 ${
          tambah || modal || modal2 || modal3 ? "blur-sm" : ""
        }`}
      >
        <div className="navbar pt-5">
          <h2 className="font-bold text-2xl">Surat Masuk</h2>
        </div>
        <div className="rekap mt-5 bg-white rounded-xl drop-shadow-custom p-6">
          <div className="search flex gap-4 justify-between">
            <div className="left w-1/3 flex relative">
              <input
                type="text"
                className="outline-none rounded-lg w-full outline-2 outline-quaternary text-quaternary outline-offset-0 text-xs py-3 px-3 font-light italic"
                onChange={HandlerSearch}
                value={search}
                placeholder="Cari disini..."
              />
              <FaSearch className="absolute right-2 top-3 text-secondary" />
            </div>
            {hideActionKakan.includes(auth?.type) ||
            hideActionSeksi.includes(auth?.type) ? null : (
              <div
                className="right bg-secondary rounded-lg text-white grid justify-center content-center px-5 cursor-pointer"
                onClick={HandlerTambahSurat}
              >
                <div className="grid grid-flow-col gap-2 text-sm items-center py-2">
                  <GoPlus size="1rem" />
                  <button>Tambah Surat</button>
                </div>
              </div>
            )}
          </div>
          <div className="tabel mt-7 h-100 overflow-y-auto">
            <table className="table-auto w-full text-center text-sm font-normal font-poppins">
              <thead className="text-white bg-secondary">
                <tr>
                  <th className="py-2">No</th>
                  <th className="py-2">Pengirim</th>
                  <th className="py-2">Jenis Surat</th>
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Aksi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading
                  ? null
                  : (
                      (searchResults.length > 0
                        ? searchResults
                        : surat?.letter || []) || []
                    ).map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          (index + 1) % 2 === 0 ? "bg-quinary" : ""
                        }`}
                      >
                        <td className="py-2.5 text-sm">
                          {index + 1 + (page - 1) * 10}
                        </td>
                        <td className="py-2.5 text-sm">{item.from}</td>
                        <td className="py-2.5 text-sm">{item.letters_type}</td>
                        <td className="py-2.5 text-sm">{item.letter_date}</td>
                        <td className="py-2.5 text-sm">
                          <p
                            className={`${
                              item.status !== "Pending"
                                ? "bg-green-200 text-green-500"
                                : "bg-red-300 text-red-600"
                            } rounded-lg py-1 text-s`}
                          >
                            {item.status}
                          </p>
                        </td>
                        <td className="py-2">
                          <div className="aksi flex justify-center gap-2">
                            {hideActionKakan.includes(auth?.type) ||
                            hideActionSeksi.includes(auth?.type) ? null : (
                              <MdModeEdit
                                className="text-secondary cursor-pointer text-xl"
                                type="button"
                                onClick={() =>
                                  HandlerEditSurat({ id: item.id })
                                }
                              />
                            )}
                            <IoMdEye
                              className="text-yellow-300 cursor-pointer text-xl"
                              type="button"
                              onClick={() => HandlerDetailSurat(item.id)}
                            />
                            {hideActionKakan.includes(auth?.type) ||
                            hideActionSeksi.includes(auth?.type) ? null : (
                              <MdDeleteOutline
                                className="text-red-500 cursor-pointer text-xl"
                                type="button"
                                onClick={() => HandlerDeleteSurat(item.id)}
                              />
                            )}
                            <Link to={`/surat-masuk/daftar-balasan/${item.id}`}>
                              <BsReplyAll
                                className="text-red-500 cursor-pointer text-xl"
                                type="button"
                              />
                            </Link>
                          </div>
                        </td>
                        <td className="grid grid-flow-col grid-cols-2 gap-4 p-2">
                          {hideActionKakan.includes(auth?.type) ? null : (
                            <div
                              onClick={() =>
                                HandlerTambahBalasan({ id: item.id })
                              }
                              className="right bg-secondary rounded-xl text-white grid m-fixed"
                            >
                              <div className="grid grid-flow-col gap-1 items-center py-1">
                                <button className="font-medium">
                                  Tambah Balasan
                                </button>
                              </div>
                            </div>
                          )}
                          <Link to={`/surat-masuk/disposisi-surat/${item.id}`}>
                            <div className="right bg-secondary rounded-xl text-white grid m-auto">
                              <div className="grid grid-flow-col items-center py-1">
                                <p className="font-medium">Disposisi Surat</p>
                              </div>
                            </div>
                          </Link>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <ToastContainer />
        </div>
        <div className="pagination grid grid-flow-col w-1/6 gap-5 justify-self-center mt-3.5 m-auto">
          <button
            onClick={() => setSearchParams({ page: parseInt(page) - 1 })}
            className={`${
              page == 1 ? "hidden" : ""
            } left bg-secondary text-white font-semibold rounded-lg text-sm self-center py-0.5 text-center`}
          >
            back
          </button>
          <button
            onClick={() => setSearchParams({ page: parseInt(page) + 1 })}
            className={`${
              surat?.letter?.length === 0 ? "hidden" : ""
            } right bg-secondary text-white font-semibold rounded-lg text-sm self-center py-0.5 text-center`}
          >
            next
          </button>
        </div>
      </div>
    </main>
  );
};

export default SuratMasukPage;
