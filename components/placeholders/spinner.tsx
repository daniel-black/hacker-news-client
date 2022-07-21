
const Spinner = (props: { spin: boolean }) => {
  return (
    <span 
      className={`${props.spin ? ' animate-loading opacity-100' : 'opacity-0 animate-none'} spinner-base`}>🌀</span>
  )
}

export default Spinner;