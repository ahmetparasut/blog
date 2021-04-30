import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import s from './EditPage.module.css'



class EditPage extends React.Component {

    state = {
        blogs:[],
        title:'',
        text:'',
        id: this.props.match.params.id,
        edited: false
    }

    componentDidMount() {
        this.fetchBlogs();
    }

    fetchBlogs = async () => {
        
        const response = await fetch(`http://localhost:1337/blogs/${this.state.id}`)

        const data = await response.json();
        
        this.setState({blogs: data})
        
    }

    editBlog = async (event) => {
        event.preventDefault();
        const updateBlog = {
            title: this.state.title,
            text: this.state.text
        }

        await fetch(`http://localhost:1337/blogs/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateBlog),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.jwt}`
            }
        })
        
        this.setState({
            title:'',
            text:''
        })
        
        
        await this.fetchBlogs();

        this.setState({edited: true})
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
                <h1 className={s.blogTitle}>{this.state.edited ? 'Changes Saved' : 'Edit Stories'}</h1>

                <div className={s.blogFormWrapper}>
                    <div className={s.blogCard}>
                        <form onSubmit={this.editBlog}>
                            <div className={s.formGroup}>
                                <label >Blog Title</label>
                                <input 
                                    className={s.titleInputs} 
                                    placeholder='Title...' 
                                    value={title}
                                    onChange={this.setBlogTitle}/>
                                
                            </div>
                            <div className={s.formGroup}>
                                <label>Edit Blog</label>
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
                                
                                <button 
                                    type='submit' 
                                    className={s.btn}
                                    onClick={this.editBlog}>
                                    Save Blog
                                </button>
                                <button type='button' className={s.btn}>
                                    Close
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

export default connect(mapStateToProps)(withRouter(EditPage))