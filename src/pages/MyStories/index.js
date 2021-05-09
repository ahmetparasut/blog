import React from "react"
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import s from './MyStories.module.css'


class MyStories extends React.Component {
    state = {
        blogs: [],
        
        
    }

    componentDidMount() {
        this.fetchBlogs();
    }


    fetchBlogs = async () => {
        const id = this.props.match.params.id
        const response = await fetch(`http://localhost:1337/blogs?_sort=updated_at:desc&&user=${id}`)

        const data = await response.json();

        this.setState({blogs: data})
        
    }

    deleteBlog = async (blogId) => {
        await fetch(`http://localhost:1337/blogs/${blogId}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${this.props.jwt}`
            }
        })

        console.log(blogId)

        await this.fetchBlogs();
    }

    editBlog = () => {
        console.log('hello')
    }

    


    render() {

        const {blogs} = this.state
        return (
            <div className={s.pageWrapper}>
                <div className={s.blogGrid}>
                  <h1 className={s.oldTitle}>Old Stories</h1>
                  
                    {
                        
                        blogs.map(blog =>  <BlogCard 
                                                key={blog.id}
                                                blog={blog}
                                                onDelete={this.deleteBlog}
                                                onEdit={this.editBlog}/>)
                    }
                </div>
            </div>
        )
    }
}

const BlogCard = ({blog, onDelete, onEdit}) => {  
    const createdAt = new Date(blog.created_at).toDateString();  
    return (
        
        <div className={s.oldBlog}>
            
            <div className={s.oldText}>
                <p className={s.date}>{createdAt}</p>
                <h3 className={s.title}>{blog.title}</h3>
                <p className={s.text}>{blog.text}</p>
            </div>
            
            <div className={s.oldBtn}>
                <Link className={s.btn} to={`/edit/${blog.id}`} >Edit</Link>
                <button className={s.btn} onClick={
                    async () => {await onDelete(blog.id)}
                }>Delete</button>
                
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    jwt: state.jwt
})

export default connect(mapStateToProps)(withRouter(MyStories))