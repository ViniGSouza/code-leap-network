import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

interface Props {
  id: string,
  title: string,
  author: string,
  createdAt: string,
  content: string,
  onClickDelete: () => void,
  onClickEdit: () => void,
}

export const PostItem = (props: Props) => {
  const token = localStorage.getItem("token_id");

  return (
    <article className="rounded-2xl border-[1px] border-[#999] m-6 overflow-hidden">
      <div className="flex justify-between bg-[#7695EC] p-6 font-bold">
        <h2 className="text-white text-[22px] w-[80%] break-words">{props.title}</h2>
        {token === props.author && 
          <div className='flex flex-col md:flex-row justify-center items-center ml-4 gap-2 md:gap-x-[34px]'>
          <DeleteButton
            title='Are you sure you want delete this item?'
            onClick={props.onClickDelete}
          />
          <EditButton onClick={props.onClickEdit} />
          </div>
        }
      </div>


        <div className="flex justify-between m-6 text-[18px] text-[#777]">
          <p className="font-bold">@{props.author}</p>
          <span>{props.createdAt}</span>
        </div> 
      


      <div className="m-6">
        <p className="text-[18px] leading-[21px] break-words">{props.content}</p>
      </div>
   </article>
  )

}