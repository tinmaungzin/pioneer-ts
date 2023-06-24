import Link from "next/link";
type Props = {
  newPageLink: string;
};
function AddNewPage({ newPageLink }: Props) {
  return (
    <>
      <Link href={newPageLink}>
        <i className="fa-solid fa-plus text-2xl text-gray-600 hover:text-gray-800 cursor-pointer"></i>
      </Link>
    </>
  );
}

export default AddNewPage;
