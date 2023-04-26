interface Props {}

export default function TopHeader({}: Props) {
  return (
    <div className={"h-full w-full"}>
      <div className={"flex h-full items-center pl-4"}>
        <div className={"font-bold text-lg"}>Data Entry Helper</div>
      </div>
    </div>
  );
}
