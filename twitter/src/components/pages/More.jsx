import React, { useEffect,useState } from "react";
import { useUserAuth } from "../../context/userauth";
import { useNavigate } from "react-router-dom";
import Arrowback from "../icons/Arrowback";
import { useTranslation } from "react-i18next";
function More() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deviceInfo, SetdeviceInfo] = useState([]);
  const { user } = useUserAuth();
  useEffect(() => {
    if (user?.email) {
      fetch(`https://twitter-jfq3.onrender.com/api/loggedinuser?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          SetdeviceInfo(data[0].deviceInfo);
          // console.log(data);
          
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [user]);
  // console.log(deviceInfo[0]);
  
  return (
    <div className="h-full w-full p-4">
       <div className="flex justify-start items-center gap-2 w-full py-1 pb-1">
        <div onClick={() => navigate("/")}>
          <Arrowback />
        </div>
      <h1 className="text-2xl font-medium">{t('more.history')}</h1>
      </div>
      <div className="overflow-scroll md:w-full">
      <table className="w-full mt-4 border border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <thead className="bg-gray-200 text-gray-700">
    <tr>
      <th className="p-3 text-left">{t('more.date')}</th>
      <th className="p-3 text-left">{t('more.device')}</th>
      <th className="p-3 text-left">{t('more.browser')}</th>
      <th className="p-3 text-left">{t('more.os')}</th>
      <th className="p-3 text-left">{t('more.ip')}</th>
    </tr>
  </thead>
  <tbody>
    {deviceInfo.length > 0 ? (
      deviceInfo.map((device) => (
        <tr key={device._id} className="even:bg-gray-100 hover:bg-gray-200 transition text-sm">
          <td className="p-3 border-b">{device.loginTime}</td>
          <td className="p-3 border-b">{device.deviceType}</td>
          <td className="p-3 border-b">{device.browser}</td>
          <td className="p-3 border-b">{device.os}</td>
          <td className="p-3 border-b">{device.ipAddress}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" className="p-4 text-center text-gray-500">No login history available.</td>
      </tr>
    )}
  </tbody>
</table>
      </div>

    </div>
  );
}

export default More;
