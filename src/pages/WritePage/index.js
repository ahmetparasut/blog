import React from "react";
import {connect} from 'react-redux'
import s from './WritePage.module.css'


class WritePage extends React.Component {

    state = {
        blogs: [],
        title:'',
        text:'',
        
    }

    

    componentDidMount() {
        this.fetchBlogs();
    }
    fetchBlogs = async () => {
        
        const response = await fetch(`http://localhost:1337/blogs?user=${this.props.user.id}`)
        const data = await response.json();
        console.log(data)
        this.setState({blogs: data});
        
    }

    postBlog = async(newBlog) => {
        const response = await fetch('http://localhost:1337/blogs', {
            body: JSON.stringify(newBlog),
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.jwt}`
            }
        })

        const data = await response.json();

        
        return data;
    }

    

    addBlog = async (event) => {
        event.preventDefault();

        const newBlog = {
            title: this.state.title,
            text: this.state.text,
            user: this.props.user.id
            
        }

        await this.postBlog(newBlog);

        await this.fetchBlogs();

        this.setState({
            title: '',
            text:'',
            
        })
    }

    deleteBlog = async (blogId) => {
        await fetch(`http://localhost:1337/blogs/${blogId}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${this.props.jwt}`
            }
        })

        await this.fetchBlogs();
    }

    setBlogTitle= (event) => {
        this.setState({title: event.target.value})
    }

    setBlogText=(event) => {
        this.setState({text: event.target.value})
        
    }

    render () {
        const {title,text} = this.state
        

        return (
            <div className={s.pageWrapper}>
                <h1 className={s.blogTitle}>yaz bi blog</h1>

                <div className={s.blogFormWrapper}>
                    <div className={s.blogCard}>
                        <form onSubmit={this.addBlog}>
                            <div className={s.formGroup}>
                                <label >Blog Title</label>
                                <input 
                                    className={s.titleInputs} 
                                    placeholder='Title...' 
                                    value={title}
                                    onChange={this.setBlogTitle}/>
                                
                            </div>
                            <div className={s.formGroup}>
                                <label>yaz bi blog</label>
                                    <textarea 
                                        className={s.textArea}
                                        name='writeblog' 
                                        rows='10' 
                                        cols='77' 
                                        value={text}
                                        placeholder='Write your story...'
                                        onChange={this.setBlogText}/>
                                </div>
                            <div className={s.formGroup}>
                                <button type='submit' className={s.btn}>
                                    Add Blog
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
                
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.user,
    jwt: state.jwt
})
export default connect(mapStateToProps)(WritePage);