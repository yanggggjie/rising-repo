interface Props {
  updateTime: string
}

export default function UpdateTime({ updateTime }: Props) {
  return <span>{updateTime}</span>
}
