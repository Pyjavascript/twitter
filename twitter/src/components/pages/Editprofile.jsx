import { useState, useEffect } from "react";
import Upload from "../icons/Upload";

function Editprofile({ user, loggedInUser, open, Setopen }) {
  const [name, Setname] = useState("");
  const [bio, Setbio] = useState("");
  const [location, Setlocation] = useState("");
  const [website, Setwebsite] = useState("");
  const [dob, Setdob] = useState("");
  const [pop, Setpop] = useState(false);
  const [dobinfo, Setdobinfo] = useState(false);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index); // Last 100 years

  const daysInMonth = (month, year) => {
    const date = new Date(year, month, 0);
    return date.getDate();
  };
  const [days, setDays] = useState([]);

  // Update days based on the selected month and year
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    if (month && selectedYear) {
      const totalDays = daysInMonth(months.indexOf(month) + 1, selectedYear);
      setDays(Array.from({ length: totalDays }, (_, index) => index + 1));
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    if (selectedMonth) {
      const totalDays = daysInMonth(months.indexOf(selectedMonth) + 1, year);
      setDays(Array.from({ length: totalDays }, (_, index) => index + 1));
    }
  };
  const handleDateChange = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      // Format the date as 'YYYY-MM-DD'
      const formattedDob = `${selectedYear}-${months.indexOf(selectedMonth) + 1}-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`;
      Setdob(formattedDob); // Set the formatted date into the dob state
    }
  };
  
  useEffect(() => {
    handleDateChange();
  }, [selectedDay, selectedMonth, selectedYear]);
  return (
    <>
      {/* Outer box for modal background */}
      <div
        className={`h-screen w-screen bg-slate-400 bg-opacity-50 flex justify-center items-center fixed left-0 top-0 z-10 sm:p-2 ${
          open ? "block" : "hidden"
        }`}
      >
        {pop ? (
          <div className="flex justify-center items-center absolute h-screen w-screen bg-black bg-opacity-20 z-50">
            <div className="bg-white p-8 flex flex-col gap-8 rounded-2xl">
              <div>
                <h1 className="font-semibold text-xl">Edit date of birth?</h1>
                <p className="font-normal text-slate-500">
                  This can only be changed a few
                  <br />
                  times. Make sure you enter the age
                  <br />
                  of the person using the account.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="w-full rounded-full bg-black text-white font-semibold py-2"
                  onClick={() => {
                    Setdobinfo(true);
                    Setpop(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="w-full rounded-full bg-white text-black border-2 font-semibold py-2"
                  onClick={() => Setpop((prev) => !prev)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Main container for the form */}
        <div className="bg-white md:max-h-[90vh] h-full w-full sm:w-2/5 overflow-y-auto rounded-lg relative pb-10">
          {/* Header */}
          <div className="backdrop-blur-sm w-full bg-[rgba(255,255,255,.7)] flex justify-between items-center sticky top-0 py-3 px-4 z-20">
            <div className="flex items-center gap-4">
              <button onClick={() => Setopen(false)} className="text-3xl">
                <ion-icon name="close-outline"></ion-icon>
              </button>
              <p className="font-bold text-xl">Edit Profile</p>
            </div>
            <button className="bg-black text-white h-8 w-16 rounded-full font-semibold">
              Save
            </button>
          </div>

          {/* Profile image section */}
          <div className="relative mt-0 px-1">
            <div className="flex justify-center items-center w-full h-48 bg-slate-300">
              <Upload />
            </div>
            <div className="border-4 border-white h-28 w-28 bg-sky-500 rounded-full overflow-hidden absolute -bottom-14 left-4">
              <img
                className="h-full w-full object-cover"
                src={
                  loggedInUser[0]?.profilePhoto ||
                  "https://wallpapers.com/images/hd/tanjiro-pictures-d95tyjljedvuafjf.jpg"
                }
                alt="Profile"
              />
            </div>
          </div>

          {/* Form fields */}
          <div className="mt-20 flex flex-col gap-6 px-4">
            {[
              { label: "Name", value: "name", setValue: Setname },
              { label: "Bio", value: "bio", setValue: Setbio },
              { label: "Location", value: "location", setValue: Setlocation },
              { label: "Website", value: "website", setValue: Setwebsite },
            ].map(({ label, value, setValue }, index) => (
              <div
                key={index}
                className="w-full h-14 flex flex-col gap-1 border border-slate-300 rounded-md p-2 py-1 group transition-all"
              >
                <label className="text-slate-500 text-lg group-focus-within:text-sm group-focus-within:top-0 relative top-3 z-10 transition-all">
                  {label}
                </label>
                <input
                  type="text"
                  value={
                    loggedInUser[0]?.[value] ? loggedInUser[0]?.[value] : ""
                  }
                  onChange={(e) => setValue(e.target.value)}
                  className="z-20 w-full bg-transparent focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="w-full p-4 flex flex-col gap-4">
            <div className="mb-3">
              <div className="flex justify-start flex-col gap-1">
                <div className="flex justify-start items-center gap-1">
                  <p
                    className={`${
                      dobinfo ? "text-black font-semibold" : "text-slate-500"
                    }`}
                  >
                    Birth date
                  </p>
                  <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                  <p className="cursor-pointer text-sky-400">
                    {dobinfo ? (
                      <p onClick={() => Setdobinfo((prev) => !prev)}>Cancel</p>
                    ) : (
                      <p onClick={() => Setpop((prev) => !prev)}>Edit</p>
                    )}
                  </p>
                </div>
                {dobinfo ? (
                  <p className="text-sm text-slate-400">
                    This should be the date of birth of the person using the
                    account. Even if you’re making an account for your business,
                    event, or cat.
                    <br />X uses your age to customize your experience,
                    including ads, as explained in our{" "}
                    <span className="text-sky-400">Privacy Policy</span>.
                  </p>
                ) : (
                  ""
                )}
              </div>

              {dobinfo ? (
                <div className="flex gap-4 mt-2">
                  {/* Month Selector */}
                  <div className="relative">
                    <select
                      id="month"
                      value={selectedMonth}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      className="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 sm:text-sm"
                    >
                      <option value="" disabled>
                        Month
                      </option>
                      {months.map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Day Selector */}
                  <div className="relative">
                    <select
                      id="day"
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm  focus:outline-none focus:ring-sky-400 focus:border-sky-400 sm:text-sm"
                    >
                      <option value="" disabled>
                        Day
                      </option>
                      {[...Array(31).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Selector */}
                  <div className="relative">
                    <select
                      id="year"
                      value={selectedYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      className="block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 sm:text-sm"
                    >
                      <option value="" disabled>
                        Year
                      </option>
                      {years.map((year, index) => (
                        <option key={index} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  {loggedInUser[0]?.dob ? (
                    <p className="text-xl">{`${loggedInUser[0]?.dob}`}</p>
                  ) : (
                    <p className="text-xl">Add your date of birth</p>
                  )}
                </div>
              )}
            </div>

            {/* Additional options */}
            <div className="w-full flex justify-between items-end cursor-pointer">
              <p className="text-xl">Create expanded bio</p>
              <div className="text-slate-500">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            </div>
            <div className="w-full flex justify-between items-end cursor-pointer">
              <p className="text-xl">Switch to professional</p>
              <div className="text-slate-500">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editprofile;
