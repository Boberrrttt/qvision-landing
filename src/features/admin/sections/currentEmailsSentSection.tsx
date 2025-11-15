const CurrentEmailsSentSection = () => {
  return (
    <section className="flex flex-col rounded-lg shadow-[0_3px_2px_rgba(0,0,0,0.3)] justify-center py-7 mt-20">
      <h2 className="text-[#202020] font-semibold text-xl ml-5">Current Emails Sent</h2>
      <div className="flex flex-col mt-4">
        <div className="flex bg-[#F4F4F4] justify-between px-5 py-2">
          <p className="flex-[3] font-semibold text-[#5E5E5E]">EMAIL</p>
          <p className="flex-1 font-semibold text-[#5E5E5E]">DATE</p>
          <p className="flex-1 font-semibold text-[#5E5E5E]">TIME</p>
          <p className="flex-1 font-semibold text-[#5E5E5E]">STATUS</p>
        </div>  
      
      </div>

    </section>
  )
}

export default CurrentEmailsSentSection
