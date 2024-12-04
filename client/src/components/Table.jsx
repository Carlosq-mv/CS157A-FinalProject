const Table = ({ title, children, icon }) => {
   return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-6 w-full">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-xl  font-abril font-bold text-gray-800">{title}</span>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Table;
