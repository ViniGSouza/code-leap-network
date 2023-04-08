import deleteIcon from '../assets/delete.svg';
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  title: string,
  onClick: () => void
}

export const DeleteButton = ({ title, onClick }: Props) => {

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <img src={deleteIcon} alt="delete icon" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
          <Dialog.Overlay
            className="bg-[#777]/80 fixed inset-0 animate-overlayShow"
          />
          <Dialog.Content
            className="fixed bg-white rounded-2xl shadow-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90vw] max-w-[660px] max-h-[85vh] p-6 animate-contentShow"
            aria-label={title}
            aria-modal="true"
            role="dialog"
          >
            <Dialog.Title className="font-bold text-black text-[22px]">
              {title}
            </Dialog.Title>
            <div className="flex justify-end gap-4 mt-6">
              <Dialog.Close asChild>
                <button className="px-8 py-1 font-bold rounded-lg border-[1px] border-[#999] text-black">
                  Cancel
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  className="px-8 py-1 bg-[#ff5151] text-white font-bold rounded-lg"
                  onClick={onClick}
                >
                  Confirm
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}