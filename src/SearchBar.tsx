import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Space, Button } from "antd";
import { usePhotoStore } from "./stores";

const LIMIT = "20";
const ORIENTATION = "landscape";

const App = () => {
  const {
    setPhotos,
    setPage,
    setTotalPages,
    state: { page: storePage, photos },
  }: any = usePhotoStore();

  const [search, setSearch] = useState("");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setSearch(value);
  };

  const submit = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_API_URL}search?query=${search}&per_page=${LIMIT}&orientation=${ORIENTATION}&page=${storePage}`,
        {
          headers: {
            Authorization: process.env.REACT_API_TOKEN || "",
          },
        }
      );
      const { photos, page, total_results, per_page } = await result.json();
      setPhotos(photos);
      setPage(page);
      setTotalPages(Math.ceil(total_results / per_page));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (storePage && photos?.length) submit();
  }, [storePage]);

  return (
    <>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input
          placeholder="Search..."
          size="large"
          onChange={handleSearch}
          value={search}
        />
        <Button type="default" size="large" color="red" onClick={submit}>
          Submit
        </Button>
      </Space.Compact>
    </>
  );
};

export default App;
