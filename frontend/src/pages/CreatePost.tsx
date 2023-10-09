import 'react-quill/dist/quill.snow.css';
import { useContext, useState } from 'react';
import Editor from '../components/Editor';
import { Box, Button, Input, useToast } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterNames } from '../router';
import { Context } from '..';
import PostService from '../services/PostService';

const CreatePost = () => {
  const navigate = useNavigate();
  const { authStore } = useContext(Context);
  const user = authStore.user;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | null>();
  const toast = useToast();
  async function createNewPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('userId', user.id);
    if (files) {
      data.append('image', files[0]);
    }
    let image = files ? files[0] : '';
    try {
      const response = await PostService.createPost(data);
      if (response.status === 201) {
        toast({
          title: 'Post Created.',
          description: 'You have successfully created a post',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        navigate(RouterNames.BLOG);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box margin={'0 auto'} marginTop={'10'} w={{ base: '95%', md: '80%', lg: '70%' }}>
      <form onSubmit={createNewPost}>
        <Input
          marginBottom="5"
          type="title"
          placeholder={'Title'}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <Input
          marginBottom="5"
          type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <Input marginBottom="5" type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor value={content} onChange={setContent} />
        <Button type="submit" w="100%" style={{ marginTop: '5px' }}>
          Create post
        </Button>
      </form>
    </Box>
  );
};
export default CreatePost;
