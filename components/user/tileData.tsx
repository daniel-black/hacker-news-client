type TileDataProps = { title: string, value: number };

const TileData = ({ title, value }: TileDataProps) => (
  <>
    <span className='tileTitle'>{title}</span>
    <span className='font-mega'>{value}</span>
  </>
);

export default TileData;