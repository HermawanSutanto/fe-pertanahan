import { AiOutlineCloseSquare } from "react-icons/ai";
import {
  PostManagemenUser,
  GetDetailMnagemenUser,
} from "../../../utils/FetchmanagemenUser";
const ModalTambah = (props) => {
  const { modal, HandlerTambah, setUsers } = props;
  const HandlerSubmit = async (event) => {
    event.preventDefault();
    const data = {
      nama: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      type: event.target.type.value,
    };
    const response = await PostManagemenUser(data);
    if (response.status === true) {
      const { data } = await GetDetailMnagemenUser(response.userId);
      setUsers((prev) => [...prev, data]);
      HandlerTambah({ status: response.status });
    } else {
      HandlerTambah({ status: false });
    }
  };
  if (!modal) {
    return null;
  }
  return (
    <form
      onSubmit={HandlerSubmit}
      className="fixed bg-white py-4 border-solid rounded-lg drop-shadow-custom z-50 inset-x-38/100 inset-y-1/10"
    >
      <div className="header flex justify-between py-4 w-10/12 m-auto items-center">
        <h3 className="font-semibold text-xl text-custom">Tambah User</h3>
        <AiOutlineCloseSquare
          size={"1.5rem"}
          className="text-custom"
          onClick={HandlerTambah}
        />
      </div>
      <div className="input w-10/12 m-auto grid gap-3">
        <div className="name relative grid gap-1">
          <label htmlFor="name" className="text-custom font-semibold">
            Nama Lengkap
          </label>
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="name"
          />
        </div>
        <div className="email relative grid gap-1">
          <label htmlFor="email" className="text-custom font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Tambahkan email"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="email"
          />
        </div>
        <div className="password relative grid gap-1">
          <label htmlFor="password" className="text-custom font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="password"
          />
        </div>
        <div className="repassword relative grid gap-1">
          <label htmlFor="repassword" className="text-custom font-semibold">
            Konfirmasi Password
          </label>
          <input
            type="password"
            placeholder="Masukkan konfirmasi password"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            id="repassword"
          />
        </div>
        <div className="type grid gap-1">
          <label htmlFor="type" className="text-custom text-base font-semibold">
            Role
          </label>
          <select
            id="type"
            className="outline-none border-2 border-quaternary w-full py-2.5 px-3 text-sm text-custom rounded-lg"
            name="type"
          >
            <option className="font-normal" value="0">
              Admin
            </option>
            <option className="font-normal" value="1">
              Kepala Kantor
            </option>
            <option className="font-normal" value="2">
              Kasubag. TU
            </option>
            <option className="font-normal" value="3">
              Seksi Penetapan Hak & Pendaftaran
            </option>
            <option className="font-normal" value="4">
              Seksi Survei & Pemetaan
            </option>
            <option className="font-normal" value="5">
              Seksi Penataan & Pemberdayaan
            </option>
            <option className="font-normal" value="6">
              Seksi Pengadaan Tanah & Pengembangan
            </option>
            <option className="font-normal" value="7">
              Seksi Pengendalian & Penanganan Sengketa
            </option>
          </select>
        </div>
        <div className="button grid gap-8 grid-flow-col text-white font-semibold text-center">
          <button
            type="button"
            onClick={HandlerTambah}
            className="grid grid-flow-col gap-2 items-center py-2 bg-red-500 rounded-lg"
          >
            <p>Batal</p>
          </button>
          <button
            type="submit"
            className="grid grid-flow-col gap-2 items-center py-2 bg-secondary rounded-lg"
          >
            <p>Simpan</p>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ModalTambah;
