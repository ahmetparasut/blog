import React from "react"
import {Link} from 'react-router-dom'
import s from './HomePage.module.css'
import ReadMoreReact from 'read-more-react';

class HomePage extends React.Component {

    state= {
        blogs: []
    }

    componentDidMount() {
        this.fetchBlogs();
    }

    fetchBlogs = async () => {
        const response = await fetch('http://localhost:1337/blogs?_sort=updated_at:desc&&_limit=10')

        const data = await response.json();

        this.setState({blogs: data})
    }

    render() {

        const {blogs} = this.state
        return (
            <div>
               <h1 className={s.posts}>Last 10 Posts</h1>
               <hr className={s.hr}/>

               {
                   blogs.map(blog => <BlogCard 
                                        key={blog.id}
                                        blog={blog}
                                        />)
               }
            </div>
        )
    }
}

const BlogCard = ({blog}) => {  
    
    const createdAt = new Date(blog.created_at).toDateString();

    return (
        
        <div className={s.oldBlog}>
            
            <div className={s.oldText}>
                <p className={s.date}>{createdAt}</p>
                <h3 className={s.title}>{blog.title}</h3>
                <ReadMoreReact text={blog.text}
                        ideal={250}
                        max={500}
                        readMoreText={<button className={s.btn}>Read More...</button>}/>
                
                <Link to={`/users/${blog.user.id}`} className={s.created}>{`@${blog.user.username}`}</Link>
            </div>
            
        </div>
    )
}



export default HomePage


// <p className={s.text}>{blog.text}</p>