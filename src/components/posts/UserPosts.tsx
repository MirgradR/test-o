import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '../icons/PlusIcon';
import HightlightBtn from './HightlightBtn';
import { CountIcon } from '../icons/CountIcon';
import PostCardUserWrapper from './cards/PostCardUserWrapper';
import { getUserPosts } from '../../utils/storage/createdPostsAPI';

const user = {
  name: 'Anton Nazarov',
  address: 'SPB'
}

const UserPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(() => getUserPosts())
  const [hightlightPosts, setHightlightPosts] = useState(false);
  const [showPostsCount, setShowPostsCount] = useState(false);

  const isEmpty = !posts.length;

  const toggleHighlight = useCallback(() => setHightlightPosts(p => !p), [])

  const onPostDelete = useCallback((removedPostId: number) => {
    setPosts(prev => prev.filter(p => p.id !== removedPostId))
  }, [])

  return (
    <section>
      <h2>
        {showPostsCount && `${posts.length} - `}
        Мои посты
      </h2>

      <div className='posts-interactive'>
        <button
          onClick={() => navigate(`/submit`)}
        >
          <PlusIcon />
        </button>

        <HightlightBtn
          onClick={toggleHighlight}
          paintIcon={hightlightPosts}
        />

        <button onClick={() => setShowPostsCount(p => !p)}>
          <CountIcon color={showPostsCount ? 'lightgreen' : 'white'} />
        </button>
      </div>

      <div>
        {isEmpty ? (
          <p style={{ marginTop: "1rem", color: "#888" }}>
            <button onClick={() => navigate('/submit')}>
              CREATE POST
            </button>
          </p>
        ) : (
          <div className='posts'>
            {posts.map((post, idx) => {
              const isOddPost = idx % 2 === 0;

              return (
                <PostCardUserWrapper
                  key={post.id}
                  onDelete={onPostDelete}
                  post={post}
                  userName={user.name}
                  userAddress={user.address}
                  highlight={isOddPost && hightlightPosts}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default UserPosts;
