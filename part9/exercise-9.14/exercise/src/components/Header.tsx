interface HeaderProps {
  heading: string
}

const Header = (props: HeaderProps) => (
  <>
    <h1>{props.heading}</h1>
  </>
)

export default Header
