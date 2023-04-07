import { useState } from "react";
import editIcon from '../assets/edit.svg';
import * as Dialog from "@radix-ui/react-dialog";
import { updatePost } from "../actions/updatePost";

interface Props {
  id: string,
};

export const EditButton = ({ id }: Props) => {
  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");

  const handleClickSave = () => {
     updatePost(id, titlePost, contentPost);
    location.reload();
  };

  return (
    <Dialog.Root>
    <Dialog.Trigger asChild>
      <button>
        <img src={editIcon} alt="delete icon" />
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
        <Dialog.Overlay
          className="bg-[#777]/80 fixed inset-0 animate-overlayShow"
        />
        <Dialog.Content
          className="fixed bg-white rounded-2xl shadow-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[660px] max-h-[85vh] p-6 animate-contentShow"
        >
          <Dialog.Title className="font-bold text-black text-[22px]">
            Edit Item
          </Dialog.Title>

          <div>
            <p className="mt-6">Title</p>
            <input
              type="text"
              placeholder="Hello world"
              value={titlePost}
              onChange={(e) => {setTitlePost(e.target.value)}}
              className="mt-2 border-[1px] border-[#777] rounded-lg pl-[10px] py-1 text-sm w-full"
            />
            <p className="mt-6">Content</p>
            <textarea
              placeholder="Content here"
              value={contentPost}
              onChange={(e) => {setContentPost(e.target.value)}}
              className="mt-2 border-[1px] border-[#777] rounded-lg pl-[10px] py-1 text-sm w-full h-[80px]"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Dialog.Close asChild>
              <button className="px-8 py-1 font-bold rounded-lg border-[1px] border-[#999] text-black">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="px-10 py-1 bg-[#47B960] text-white font-bold rounded-lg"
                onClick={handleClickSave}
              >
                Save
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  );
};
