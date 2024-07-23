import Link from "next/link";

const NewUser = () => {
  return (
    <ul className="flex flex-row space-x-4">
      <li>
        <Link href="/signin">
          <button className="hover:text-gray-400">Sign In</button>
        </Link>
      </li>
    </ul>
  );
};

export default NewUser;
