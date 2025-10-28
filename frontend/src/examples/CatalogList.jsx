import { useFetch } from "../hooks/useApi";
import { catalogAPI } from "../services/api";

/**
 * Example Component: CatalogList
 * Demonstrates how to fetch data automatically on component mount
 */
const CatalogList = () => {
  // Automatically fetches data when component mounts
  const { data, loading, error, refetch } = useFetch(() =>
    catalogAPI.getAllItems()
  );

  if (loading) {
    return <div className="loading">Loading catalog items...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="catalog-list">
      <h2>Catalog Items</h2>
      <button onClick={refetch}>Refresh</button>

      {data?.items?.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {data?.items?.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CatalogList;
