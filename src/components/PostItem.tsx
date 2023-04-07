import { deletePost } from '../actions/deletePost';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

interface Props {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
}

export const PostItem = (props: Props) => {
  const token = localStorage.getItem("token_id");

  const handleClickDelete = () => {
    deletePost(props.id);
    location.reload();
  }

  return (
    <article className="rounded-2xl border-[1px] border-[#999] m-6 overflow-hidden">
      <div className="flex justify-between bg-[#7695EC] p-6 text-white text-[22px] font-bold">
        {props.title}
        {token === props.author && 
          <div className='flex items-center gap-2 md:gap-x-[34px]'>
          <DeleteButton
            title='Are you sure you want delete this item?'
            onClick={handleClickDelete}
          />
          <EditButton id={props.id} />
          </div>
        }
      </div>


        <div className="flex justify-between m-6 text-[18px] text-[#777]">
          <p className="font-bold">@{props.author}</p>
          <span className="">{props.createdAt}</span>
        </div> 
      


      <div className="m-6">
        <p className="text-[18px] leading-[21px]">{props.content}</p>
      </div>
   </article>
  )

}