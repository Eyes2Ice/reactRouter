import { useState } from "react";

const BlogFilter = ({ postQuery, latest, setSearchParams }) => {
  const [search, setSearch] = useState(postQuery);
  const [checked, setChecked] = useState(latest);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const query = form.search.value;
    const isLatest = form.latest.checked;

    const params = {};

    if (query) params.post = query;
    if (isLatest) params.latest = true;

    setSearchParams(params);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        width: "100%",
        marginBlock: 30,
      }}
    >
      <input
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label>
        <input
          name="latest"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default BlogFilter;
