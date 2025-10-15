interface Props {
  name: string;
}

export function TableItemHeader({ name }: Readonly<Props>) {
  return (
    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
        {name}
      </p>
    </th>
  );
}
