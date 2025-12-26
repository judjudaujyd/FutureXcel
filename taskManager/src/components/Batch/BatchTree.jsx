export default function BatchTree({
  batches,
  deleteBatch,
  deleteMember,
}) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <div
            key={batch._id}
            className="bg-white rounded-md border border-blue-500 shadow-sm p-4 hover:shadow-md transition"
          >
            {/* Batch Header */}
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 font-semibold text-blue-700 text-lg">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                {batch.name}
              </div>

              {/* Delete Batch */}
              <button
                onClick={() => deleteBatch(batch._id)}
                className="text-red-500 text-sm opacity-0 group-hover:opacity-100 transition hover:text-red-700"
                title="Delete batch"
              >
                🗑
              </button>
            </div>

            {/* Members */}
            <div className="ml-4 mt-3 border-l-2 border-blue-200">
              {batch.members.map((member, i) => (
                <div
                  key={i}
                  className="relative flex items-start justify-between pl-4 py-2 group"
                >
                  {/* Connector */}
                  <span className="absolute left-0 top-4 w-4 border-t-2 border-blue-200"></span>

                  {/* Left content */}
                  <div className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-gray-400 rounded-full"></span>

                    <div className="leading-tight">
                      <div className="text-gray-800 font-medium group-hover:text-blue-600 transition">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Drop Student */}
                  <button
                    onClick={() =>
                      deleteMember(batch._id,member.name)
                    }
                    className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition hover:text-red-700"
                    title="Drop student"
                  >
                    Drop
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
