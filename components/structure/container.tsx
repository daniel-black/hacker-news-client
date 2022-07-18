type ContainerProps = {
  children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto py-4 mb-8 px-4 md:24 lg:px-32">{children}</div>
}

export default Container;