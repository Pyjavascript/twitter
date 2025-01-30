function Sidebaropt({ icon, text }) {
  return (
    <div className="flex gap-3 justify-start items-center text-xl p-2 px-5 rounded-full hover:bg-sky-100 hover:text-sky-500">
      <div className="text-xl">
        {icon}
      </div>
      <p className="hidden md:block lg:block">{text}</p>
    </div>
  );
}

export default Sidebaropt;
