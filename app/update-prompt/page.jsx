"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

export const dynamic = "force-dynamic"; // 👈 Forces dynamic rendering

const EditPromptContent = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) throw new Error("Failed to fetch prompt details");

        const data = await response.json();
        setPost({
          prompt: data.prompt || "",
          tag: data.tag || "",
        });
      } catch (error) {
        console.error("Error fetching prompt:", error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert("Prompt ID not found");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to update prompt");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
  );
};

// Wrapping inside Suspense to avoid pre-render errors
const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPromptContent />
    </Suspense>
  );
};

export default EditPrompt;
