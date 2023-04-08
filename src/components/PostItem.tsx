import { useAppSelector } from '../redux/hooks/useAppSelector';
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
  const user = useAppSelector(state => state.user);

  return (
    <article className="rounded-2xl border-[1px] border-[#999] m-6 overflow-hidden">
      <div className="flex justify-between bg-[#7695EC] p-6 text-white text-[22px] font-bold">
        {props.title}
        {user.name === props.author && 
          <div className='flex items-center gap-2 md:gap-x-[34px]'>
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
        <p className="text-[18px] leading-[21px]">{props.content}</p>
      </div>
   </article>
  )

}