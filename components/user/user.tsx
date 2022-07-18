import { UserModel } from "../../models"

const User = (props: UserModel) => {
  return (
    <div className="bg-slate-300 p-3 rounded m-3">
      <p>User: {props.id}</p>
      <p>About: {props.about}</p>
      <p>Joined: {new Date(props.created * 1000).toLocaleDateString()}</p>
      <p>Karma: {props.karma}</p>
      <p>Posts: [{props.submitted?.toString()}]</p>
    </div>
  );
}

export default User;