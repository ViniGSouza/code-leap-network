import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../actions/getPosts';
import { Post } from '../types/Post';
import { PostItem } from '../components/PostItem';
import { parseISO, formatDistanceStrict, format } from 'date-fns';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { createPost } from '../actions/createPost';
import { deletePost } from '../actions/deletePost';
import { updatePost } from '../actions/updatePost';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/reducers/nameReducer';

export const Posts = () => {
  const [posts, setPosts] = useState<Post>();
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");
  const user = useAppSelector(state => state.user);
  const post = useAppSelector(state => state.update);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token_id");
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, [])
  
  const loadPosts = async () => {
    let data = await getPosts();
    setPosts(data);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
  }

  const handlePrevPage = async () => {
    if (prevPageUrl) {
      let data = await getPosts(prevPageUrl);
      setPosts(data);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    }
  };

  const handleNextPage = async () => {
    if (nextPageUrl) {
      let data = await getPosts(nextPageUrl);
      setPosts(data);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    }
  };

  const handleInitialPage = async () => {{
      let data = await getPosts();
      setPosts(data);
      setNextPageUrl(data.next);
    }
  };

  function formateDate(dateString: string) {

    const date = parseISO(dateString);
    const now = new Date();
    const diffMin = Math.round((now.getTime() - date.getTime()) / 1000 / 60);
  
    if (diffMin < 1440) {
      return formatDistanceStrict(date, now, { addSuffix: true });
    } else {
      return format(date, 'MM-dd-yyyy');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token_id");
    dispatch( setName('') );
    navigate('/');
  }

  const handleCreateButton = () => {
    createPost(user.name, titlePost, contentPost);
    loadPosts();
  }
  
  const handleClickDelete = (id: string) => {
    deletePost(id);
    loadPosts();
  }

  const handleClickEdit = (id: string) => {
    updatePost(id, post.title, post.content);
    loadPosts();
  }

  return (
    <div className="bg-white max-w-[800px] flex flex-col mx-auto opacity-0 animate-enter">
      <div className="bg-[#7695EC] w-full py-[27px] px-[37px] flex items-center justify-between text-white">
        <h1 className="text-[22px] font-bold">CodeLeap Network</h1>
        {
          token &&
          <>
            <p className="text-[18px]">Hi, <span className="font-bold">{`${token}`} :)</span></p>
            <button
              className="bg-[#ff5151] px-4 py-1 rounded-lg duration-300 hover:scale-95 hover:bg-[#fc3a3a]"
              onClick={handleLogout}
            >
            Logout
          </button>
          </>
        }

      </div>

      <div className="border-[1px] border-[#999] rounded-2xl bg-white p-6 mx-6 mt-6 flex flex-col">
        <h2 className="text-[22px] font-bold">
          Whats on your mind?
        </h2>
        <p className="mt-6">Title</p>
        <input
          type="text"
          placeholder="Hello world"
          value={titlePost}
          onChange={(e) => setTitlePost(e.target.value)}
          className="mt-2 border-[1px] border-[#777] rounded-lg pl-[10px] py-1 text-sm w-full"
        />
        <p className="mt-6">Content</p>
        <textarea
          placeholder="Content here"
          value={contentPost}
          onChange={(e) => setContentPost(e.target.value)}
          className="mt-2 border-[1px] border-[#777] rounded-lg pl-[10px] py-1 text-sm w-full h-[80px]"
        />
        <button
          onClick={handleCreateButton}
          className="bg-[#7695EC] text-white font-bold self-end px-10 py-[6px] rounded-lg mt-4 disabled:opacity-60 hover:scale-105 hover:bg-[#4874eb] duration-300"
        >Create
        </button>
      </div>
      <div className="flex justify-end gap-4 px-8 mt-6 font-bold text-white">
        {
          prevPageUrl && 
          <button onClick={handlePrevPage} className="bg-[#7695EC] hover:bg-[#4874eb] hover:scale-95 duration-300 py-2 px-4 rounded-lg">PREVIOUS PAGE</button>
        }
        <button onClick={handleNextPage} className="bg-[#7695EC] hover:bg-[#4874eb] hover:scale-95 duration-300 py-2 px-4 rounded-lg">NEXT PAGE</button>
      </div>
      {posts?.results.map((post) => (
        <PostItem
          key={post.id}
          title={post.title}
          author={post.username}
          createdAt={formateDate(post.created_datetime)}
          content={post.content}
          id={post.id.toString()}
          onClickDelete={() => handleClickDelete(post.id.toString())}
          onClickEdit={() => handleClickEdit(post.id.toString())}
        />
      ))}
    </div>
  );
}