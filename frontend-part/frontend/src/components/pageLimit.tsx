type PageLimitSelectProps = {
  limit: number
  setLimit: (limit: number) => void
  resetPage: () => void
}

const PageLimitSelect = ({
  limit,
  setLimit,
  resetPage
}: PageLimitSelectProps) => {

  return (

    <div className="mb-4">

      <label className="mr-2">
        Documents per page:
      </label>

      <select
        value={limit}
        onChange={(e)=>{
          setLimit(Number(e.target.value))
          resetPage()
        }}
        className="border p-1"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>

    </div>

  )

}

export default PageLimitSelect