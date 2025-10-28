import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { catalogAPI } from "../services/api";

/**
 * Example Component: CreateItemForm
 * Demonstrates how to make API calls triggered by user actions
 */
const CreateItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // useApi for manual API calls (not automatic on mount)
  const {
    execute: createItem,
    loading,
    error,
    data,
  } = useApi(catalogAPI.createItem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createItem({ name, description });

      // Success! Clear form
      setName("");
      setDescription("");
      alert("Item created successfully!");
    } catch (err) {
      // Error is already captured in the hook
      console.error("Failed to create item:", err);
    }
  };

  return (
    <div className="create-item-form">
      <h2>Create New Item</h2>

      {data && <div className="success">Item created: {data.item?.name}</div>}

      {error && <div className="error">Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;
