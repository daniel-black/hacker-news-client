type ContainerProps = {
  children?: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return <div id="#top" className="cont mx-auto py-4 mb-8">{children}</div>
}

export default Container;