interface Props {
  text: string
}

export default function Description({ text }: Props) {
  return <div className={'line-clamp-1 w-full'}>{text}</div>
}
