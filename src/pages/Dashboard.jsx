import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CardDashboard from "../components/CardDashboard";
import Chart from "../components/charts/Charts";
import { GetDashboard } from "../utils/FetchChartDashboard";
import { IoIosNotifications } from "react-icons/io";
import ModalNotification from "../components/modal/Notification";
import UseAuth from "../hooks/UseAuth";
import { Notification } from "../utils/FetchSuratMasuk";

const DashboardPage = () => {
  const auth = UseAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifData, setNotifData] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setLoading(true);
    Notification().then((res) => {
      setNotifData(res.data.letter);
    });
    GetDashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (notifData.length > 0) {
      console.log("masuk notif",notifData.length);
      const intervalId = setInterval(() => {
        Notification().then((res) => {
          console.log(res.data.letter.length + "   " + notifData.length);
          if (res.data.letter.length != notifData.length) {
            console.log("masuk if true");
            setNotifData(() => res.data.letter);
            setUpdate(true);
          }
        });
      }, 100000000000);

      return () => {
        console.log("clear notif");
        return clearInterval(intervalId);
      };
    }
  }, [notifData]);

  return (
    <main className="grid grid-cols-5 h-screen gap-8 bg-gray-200 font-poppins">
      <Sidebar />
      <div className="content col-span-4 w-97/100">
        <div className="navbar flex justify-between pt-5 items-center">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <div
            id="month"
            className="text-xl bg-white rounded-xl p-1.5 shadow-xl cursor-pointer"
            onClick={() => {
              setNotif(!notif);
              setUpdate(false);
            }}
          >
            <IoIosNotifications />
            <div
              className={`${
                update ? "block" : "hidden"
              } p-1.5 bg-red-500 absolute rounded-full text-white z-50 text-xs -translate-x-2/3 -translate-y-1/3 shadow-xl`}
            ></div>
            <ModalNotification notif={notif} notifData={notifData} />
          </div>
        </div>
        <div className="rekap grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:grid-flow-col mt-4 font-semibold text-base">
          <CardDashboard
            title="Surat Masuk"
            count={data?.totalsurat}
            description="Total Seluruh Surat Masuk"
          />
          <CardDashboard
            title="Belum Ditindaklanjuti"
            count={data?.belum_ditindaklanjuti}
            description="Surat Belum Diproses"
          />
          <CardDashboard
            title="Sudah Didisposisi"
            count={data?.sudah_didisposisi}
            description="Surat Sudah Dialihkan"
          />
          <CardDashboard
            title="Sudah Ditindaklanjuti"
            count={data?.sudah_ditindaklanjuti}
            description="Surat Sudah Selesai"
          />
        </div>
        <div className="rekap mt-8 bg-white rounded-xl drop-shadow-custom p-4 pb-14">
          <Chart />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
