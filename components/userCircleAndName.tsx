type IdProps = { id: string };

const UserCircleAndName = (props: IdProps) => {
  const { id } = props;
  return (
    <div className="flex">
      <div className="h-32 w-32 rounded-full mr-5 bg-gradient-to-br from-rose-200 to-indigo-400 shadow-lg"></div>
      <p className="text-8xl font-bold flex items-center">{id}</p>
    </div>
  );
}

export default UserCircleAndName;