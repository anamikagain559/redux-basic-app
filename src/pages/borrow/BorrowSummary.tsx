import { useGetBorrowSummaryQuery } from "@/redux/features/borrows/borrowApi";
import type { BorrowSummary } from "@/types";

const BorrowSummaryPage = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  console.log(data);
  const summary: BorrowSummary[] = data?.data ?? [];


  if (isLoading)
    return <p className="text-center mt-10">Loading borrow summary...</p>;

  if (isError)
    return <p className="text-center mt-10 text-red-500">Error loading borrow summary</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Borrow Summary</h2>

      {summary.length === 0 ? (
        <p className="text-center text-gray-600">No borrow data available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Book Title</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border">Total Quantity Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item) => (
              <tr key={item._id}>
                <td className="p-3 border">{item.book?.title || "N/A"}</td>
                <td className="p-3 border">{item.book?.isbn || "N/A"}</td>
                <td className="p-3 border">{item.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowSummaryPage;
