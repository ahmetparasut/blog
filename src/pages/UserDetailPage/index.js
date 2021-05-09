import React from 'react'
import {withRouter} from 'react-router-dom'
import ReadMoreReact from 'read-more-react';
import s from './UserDetail.module.css'


class UserDetails extends React.Component {

    state = {
        blogs: []
    }

    componentDidMount(){
        this.fetchBlogs();
    }

    fetchBlogs = async () => {
        const id = this.props.match.params.id
        const response = await fetch(`http://localhost:1337/blogs?_sort=updated_at:desc&&user=${id}`)
        const data = await response.json();

        this.setState({blogs: data})
    }


    render() {
        const {blogs} = this.state
        return(
            <div>
                <h1 className={s.posts}>User's All Posts</h1>
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
                        readMoreText={<button className={s.btn}>Read More ...</button>}/>
                
                <h4 className={s.created}>{`@${blog.user.username}`}</h4>
                
                
            </div>
            
        </div>
    )
}

export default withRouter(UserDetails)