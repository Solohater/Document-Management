import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Document } from "../types/document"

import { getReviewQueue } from "../services/documentServices"

import Pagination from "../components/pagination"
import PageLimitSelect from "../components/pageLimit"


const ReviewQueue = () => {

  const navigate = useNavigate()

  const [documents, setDocuments] = useState<Document[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [hasNextPage, setHasNextPage] = useState(true);

  

  useEffect(() => {
    fetchDocuments()
  }, [page,limit])

  const fetchDocuments = async () => {

   try{

      const data = await getReviewQueue(page,limit)

      setDocuments(data.documents)
      setHasNextPage(data.hasNextPage)

    }catch(err){

      console.log(err)

    }

  }
  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Review Queue
      </h1>
       <PageLimitSelect
        limit={limit}
        setLimit={setLimit}
        resetPage={() => setPage}
      />
      <div className="space-y-4">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="border p-4 rounded flex justify-between items-center"
          >

            <div>

              <h2 className="font-semibold text-lg">
                {doc.title}
              </h2>

              <p className="text-sm text-gray-600">
                Status: {doc.status}
              </p>

            </div>

            <button
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              {doc.status === "SUBMITTED" ? "Review" : "View"}
            </button>

          </div>

        ))}

      </div>
       <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
    </div>

  )

}

export default ReviewQueue 