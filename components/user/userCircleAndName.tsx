type IdProps = { id: string };

const UserCircleAndName = (props: IdProps) => {
  const { id } = props;
  return (
    <div className="flex">
      <div className="h-14 w-14 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full mr-5 bg-gradient-to-br from-rose-200 to-indigo-400 shadow-lg"></div>
      <p className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold flex items-center">{id}</p>
      
    </div>
  );
}

export default UserCircleAndName;