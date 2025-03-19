"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use next/navigation for App Router
import { useSession } from 'next-auth/react';
import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();  // Initialize router from next/navigation
  
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.log("User is not authenticated");
      return; // Exit early if the user is not logged in
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error("Failed to create prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
