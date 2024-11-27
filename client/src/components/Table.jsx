
const Table = ({ title, children, icon }) => {
  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "10px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>

        <div role="alert" className="alert alert-info rounded-md">
          {icon}
          <span className="font-abril text-xl">{title}</span>
        </div>

        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px 5px 5px 5px" }}>

          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Table