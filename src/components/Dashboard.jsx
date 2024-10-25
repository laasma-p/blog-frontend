const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-chetwode-blue text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Total Posts</h3>
          <p className="text-xl">3</p>
        </div>
        <div className="bg-east-side text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Pinned Posts</h3>
          <p className="text-xl">2</p>
        </div>
        <div className="bg-french-lilac text-white-smoke p-4 rounded-lg">
          <h3 className="text-2xl">Draft Posts</h3>
          <p className="text-xl">1</p>
        </div>
      </div>
      <div>
        <table className="table-auto w-full text-left bg-white-smoke">
          <thead>
            <tr className="bg-chetwode-blue text-white-smoke">
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Pinned</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">Post title</td>
              <td className="p-4">Post date</td>
              <td className="p-4">Post status</td>
              <td className="p-4">
                <button className="py-1 px-3 rounded bg-french-lilac">
                  Unpin
                </button>
              </td>
              <td className="p-4">
                <button className="text-nero hover:underline">Edit</button>
                <button className="ml-4 text-east-side hover:underline">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4">Post 2 title</td>
              <td className="p-4">Post 2 date</td>
              <td className="p-4">Post 2 status</td>
              <td className="p-4">
                <button className="py-1 px-3 rounded bg-french-lilac">
                  Pin
                </button>
              </td>
              <td className="p-4">
                <button className="text-nero hover:underline">Edit</button>
                <button className="ml-4 text-east-side hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
