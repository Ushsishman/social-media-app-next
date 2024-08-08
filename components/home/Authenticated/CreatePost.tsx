"use client";
import { writeNewPost } from "../../../utilities/utility";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Oval } from "react-loader-spinner";

const schema = z.object({
  status: z.string(),
  file: z.any(),
});

type CreatePostInputs = z.infer<typeof schema>;

const CreatePost = () => {
  {
    /* THIS COMPONENT STAYS FOR CREATING POSTS */
  }
  const { data: session }: any = useSession();
  const [postState, setPostState] = useState<string>("Post");
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInputs>({
    resolver: zodResolver(schema),
  });

  const uploadFile = async (fileName: string) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(imageRef, imageUpload);
  };

  const onSubmit = (data: CreatePostInputs) => {
    setPostState("Posting...");

    if (imageUpload) {
      uploadFile(imageUpload.name);
    }

    writeNewPost({
      userId: `${session?.user.id}`,
      name: `${name}`,
      email: `${session?.user.email}`,
      status: data.status.length == 0 ? "no status" : `${data.status}`,
      fileName:
        data.file[0]?.name == undefined ? "no file" : `${data.file[0]?.name}`,
    }).finally(() => setPostState("Post"));
  };
  const name = `${session?.user.name}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-1/2 flex flex-col mt-8 border-2 border-black/15">
      <div className="bg-[#1E293B] min-h-12 flex items-center text-white">
        <div className="ml-4 my-4">
          {session?.user.picture ? (
            <Image
              width={40}
              height={40}
              className="rounded-full w-auto h-auto"
              src={`${session.user.picture}`}
              alt={`${session.user.picture}`}
            />
          ) : (
            <Oval
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
        <h3 className="ml-4">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      </div>
      <div className="min-h-32 flex flex-col justify-center items-center space-y-3">
        <div className="w-full flex items-center">
          <input
            {...register("status")}
            placeholder="Add a status"
            className="border border-gray-300 w-full p-2 mx-4 rounded focus:outline-none focus:ring-2 focus:ring-[#1E293B]"
          />
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="w-full flex items-start ml-14">
          <input
            {...register("file")}
            type="file"
            onChange={(e) => {
              if (e.target.files != null) {
                setImageUpload(e.target.files[0]);
              }
            }}
            name="file"
            placeholder="📷"
            className="text-[#1E293B] hover:text-[#374151]"
          />
        </div>
      </div>
      <div className="bg-[#1E293B] h-16 flex items-center justify-end">
        <button
          type="submit"
          className="py-2 px-8 mr-3 bg-[#3b5275] text-white rounded hover:bg-[#374151]">
          {postState}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
