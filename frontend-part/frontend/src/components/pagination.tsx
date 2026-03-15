type PaginationProps = {
  page: number
  hasNextPage: boolean
  setPage: (page: number) => void
}

const Pagination = ({ page, hasNextPage, setPage }: PaginationProps) => {

  return (

    <div className="flex gap-4 mt-6 items-center">

      <button
        disabled={page === 1}
        onClick={()=>setPage(page - 1)}
        className="px-3 py-1 border rounded"
      >
        Previous
      </button>

      <span>
        Page {page}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={()=>setPage(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>

    </div>

  )

}

export default Pagination