import { useRouter } from "../../node_modules/next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants";
import { User } from "../../models";

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}user/${id}.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>User does not exist with id: {id}</p>;

  const renderData = () => {
    if (data) {
      const user = data as User;
      return (
        <div>
          <p>User: {user.id}</p>
          <p>About: <span dangerouslySetInnerHTML={{__html: user.about}}></span></p>
          <p>Karma: {user.karma}</p>
          <p>Joined: {new Date(user.created).toLocaleDateString()}</p>
          <p># of Posts: {user.submitted.length}</p>
        </div>  
      );
    }
  }

  return (
    <>
      <h1>User Profile:</h1>
      {renderData()}
    </>
  );
}

export default User;