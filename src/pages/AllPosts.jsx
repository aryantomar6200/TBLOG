import React, {useState, useEffect} from 'react'
import { AllPostsCard, Container, PostCard } from '../components'
import databaseService from '../appwrite/databaseService'

function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(() => {

        databaseService.getPosts([])
        .then((posts) => {
          console.log("posts:", posts.rows[0]);
            if (posts) {
                setPosts(posts.rows)
            }
            
            
    }) 
    }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap gap-8 justify-center'>
            {posts.map((post) => (
                <div key={post.$id} className='py-2 w-1/3 '>
                    <AllPostsCard {...post} />
                </div>

            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
