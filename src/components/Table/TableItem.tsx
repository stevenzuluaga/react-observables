interface Props {
  name: string;
  img: string;
  gender: string;
  species: string;
  status: string;
  type: string;
}

export function TableItem({
  name,
  img,
  gender,
  species,
  status,
  type,
}: Readonly<Props>) {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt={name}
            className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
          />
          <div className="flex flex-col">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              {name}
            </p>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
              {species}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {gender}
          </p>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
            {type}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="w-max">
          <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
            <span className="">{status}</span>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <button
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
              </svg>
            </span>
          </span>
        </button>
      </td>
    </tr>
  );
}
