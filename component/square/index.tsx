
export default function Square({ value, onClick }: { value: string | null, onClick: () => void }) {
    return (
        <button className="bg-white border border-gray-300 float-left text-2xl font-bold leading-[34px] h-[34px] -mr-[1px] -mt-[1px] p-0 text-center w-[34px] text-black" onClick={onClick}>
            {value}
        </button>
    );
}