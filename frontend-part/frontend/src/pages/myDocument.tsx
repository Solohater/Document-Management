import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Document } from "../types/document";
import { getUserDocuments } from "../services/documentServices";

import StatusFilter from "../components/filter"
import Pagination from "../components/pagination"
import PageLimitSelect from "../components/pageLimit"


const MyDocuments = () => {

  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [hasNextPage, setHasNextPage] = useState(true);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    fetchDocuments();
  }, [page, limit, statusFilter]);

  const fetchDocuments = async () => {

    try {

      const res = await getUserDocuments(
        page,
        limit,
        statusFilter,
        userId
      )
      setDocuments(res.documents)
      setHasNextPage(res.hasNextPage);

    } catch (err) {
      console.log("Failed to fetch documents", err);
    }

  };

  const getStatusColor = (status: string) => {

    if (status === "APPROVED") return "text-green-600";
    if (status === "REJECTED") return "text-red-600";
    if (status === "SUBMITTED") return "text-yellow-600";

    return "text-gray-600";

  };

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        My Documents
      </h1>

      {/* Status Filter */}

        <StatusFilter
        currentFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        resetPage={() => setPage(1)}
      />

      {/* Page Limit Dropdown */}

     <PageLimitSelect
        limit={limit}
        setLimit={setLimit}
        resetPage={() => setPage(1)}
      />
      {/* Document List */}

      <div className="space-y-4">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="border p-4 rounded flex justify-between items-center shadow-sm"
          >

            <div>

              <h2 className="font-bold text-lg">
                {doc.title}
              </h2>

              <p className="text-gray-600 text-sm">
                {doc.description}
              </p>

              <p className="mt-2 text-sm">
                Status:
                <span className={`ml-2 font-semibold ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </p>

            </div>

            <button
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              View
            </button>

          </div>

        ))}

      </div>

      {/* Pagination */}

      <Pagination
        page={page}
        hasNextPage={hasNextPage}
        setPage={setPage}
      />

    </div>

  );

};

export default MyDocuments;