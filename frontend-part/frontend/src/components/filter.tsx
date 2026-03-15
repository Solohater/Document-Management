type StatusFilterProps = {
  currentFilter: string
  setStatusFilter: (status: string) => void
  resetPage: () => void
}

const StatusFilter = ({
  setStatusFilter,
  resetPage
}: StatusFilterProps) => {

  const handleClick = (status: string) => {
    setStatusFilter(status)
    resetPage()
  }

  return (

    <div className="flex gap-3 mb-4">

      <button
        onClick={()=>handleClick("ALL")}
        className="px-3 py-1 border rounded"
      >
        All
      </button>

      <button
        onClick={()=>handleClick("SUBMITTED")}
        className="px-3 py-1 border rounded"
      >
        Pending
      </button>

      <button
        onClick={()=>handleClick("APPROVED")}
        className="px-3 py-1 border rounded"
      >
        Approved
      </button>

      <button
        onClick={()=>handleClick("REJECTED")}
        className="px-3 py-1 border rounded"
      >
        Rejected
      </button>

    </div>

  )
}

export default StatusFilter