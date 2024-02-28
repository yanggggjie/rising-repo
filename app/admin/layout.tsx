interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <div>{children}</div>
}
