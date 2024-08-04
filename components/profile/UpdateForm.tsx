"use client";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "../../utilities/utility";
import { useSession } from "next-auth/react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Invalid URL"),
});

const UpdateForm = ({
  modalIsOpen,
  setModalIsOpen,
}: {
  modalIsOpen: boolean;
  setModalIsOpen: Function;
}) => {
  const { data: session, update } = useSession();
  const closeModal = () => setModalIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      if (session?.user) {
        await updateUser(session.user.id, data);
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
            email: data.email,
            image: data.image,
          },
        });
      }

      closeModal();
    } catch (error) {
      console.error("Failed to update session:", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              {...register("image")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateForm;
