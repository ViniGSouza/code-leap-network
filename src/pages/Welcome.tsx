import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { setName } from "../redux/nameReducer";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

export const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('token_id', e.target.value);
    dispatch( setName(e.target.value) );
  }


  return (
    <div className="bg-white rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center border-[1px] border-[#CCCCCC] opacity-0 animate-enter">
      <div className="flex flex-col px-6 py-6 md:w-[500px]">
        <h2 className="text-black text-[22px] font-bold">Welcome to CodeLeap network!</h2>
        <p className="mt-[24px]">Please enter your username</p>
        <input
          type="text"
          placeholder="Type your name..."
          value={user.name}
          onChange={handleChangeInput}
          className="text-[14px] mt-1 px-2 py-1 border-[1px] border-[#777777] rounded-lg"
        />
        <button
          disabled={user.name ? false : true}
          className="bg-[#7695EC] text-white font-bold md:self-end px-[30px] py-[6px] rounded-lg mt-4 disabled:opacity-60 hover:scale-105 hover:bg-[#4874eb] duration-300"
          onClick={() => navigate('/posts')}
        >
          ENTER
        </button>
      </div>
    </div>
  )
}