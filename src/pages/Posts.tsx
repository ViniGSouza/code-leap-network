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
import { Loading } from '../components/Loading/Loading';

export const Posts = () => {
  const [posts, setPosts] = useState<Post>();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    loadPosts();
    setLoading(false);
  }, [])
  
  const loadPosts = async () => {
    setLoading(true);
    let data = await getPosts();
    setPosts(data);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
    setLoading(false);
  }

  const handlePrevPage = async () => {
    if (prevPageUrl) {
      setLoading(true);
      let data = await getPosts(prevPageUrl);
      setPosts(data);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setLoading(false);
    }
  };

  const handleNextPage = async () => {
    if (nextPageUrl) {
      setLoading(true);
      let data = await getPosts(nextPageUrl);
      setPosts(data);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token_id");
    dispatch( setName('') );
    navigate('/');
  }

  const handleCreateButton = async () => {
    setLoading(true);
    await createPost(user.name, titlePost, contentPost);
    loadPosts();
    setLoading(false);
  }
  
  const handleClickDelete = async (id: string) => {
    setLoading(true);
    await deletePost(id);
    loadPosts();
    setLoading(false);
  }

  const handleClickEdit = async (id: string) => {
    setLoading(true);
    await updatePost(id, post.title, post.content);
    loadPosts();
    setLoading(false);
  }

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

  return (
    <div className="bg-white max-w-[800px] flex flex-col mx-auto opacity-0 animate-enter">
      <div className="bg-[#7695EC] w-full py-[27px] px-[37px] flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between text-white">
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
          disabled={titlePost && contentPost  ? false : true}
          className="bg-[#7695EC] text-white font-bold self-end px-10 py-[6px] rounded-lg mt-4 disabled:opacity-60  hover:scale-105 hover:bg-[#4874eb] duration-300"
        >Create
        </button>
      </div>
      <div className="relative flex justify-end gap-4 px-8 mt-6 font-bold text-white">
        {
          prevPageUrl && 
          <button onClick={handlePrevPage} className="bg-[#7695EC] hover:bg-[#4874eb] hover:scale-95 duration-300 py-2 px-4 rounded-lg">PREVIOUS PAGE</button>
        }
        <button onClick={handleNextPage} className="bg-[#7695EC] hover:bg-[#4874eb] hover:scale-95 duration-300 py-2 px-4 rounded-lg">NEXT PAGE</button>
      </div>
      {loading
        ?
        <Loading />
       : 
       posts?.results.map((post) => (
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