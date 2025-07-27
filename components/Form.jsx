'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [enhanceInstruction, setEnhanceInstruction] = useState('')
  const [enhancing, setEnhancing] = useState(false)
  const [tagError, setTagError] = useState('')

  // Validate tag
  const isValidTag = tag => /^#[\w]+(,\s*#[\w]+)*$/.test(tag.trim())

  useEffect(() => {
    if (!post.tag.trim()) {
      setTagError('Tag is required.')
    } else if (!isValidTag(post.tag)) {
      setTagError('Invalid tag format. Use #tag, #tag2')
    } else {
      setTagError('')
    }
  }, [post.tag])

  const handleEnhance = async () => {
    if (!enhanceInstruction.trim()) return
    setEnhancing(true)

    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          instruction: enhanceInstruction
        })
      })

      const data = await response.json()

      if (response.ok && data?.enhancedPrompt) {
        setPost({
          prompt: data.enhancedPrompt,
          tag: data.tags || post.tag // fallback to old tag if none returned
        })
        setEnhanceInstruction('')
      } else {
        console.error('Enhance failed', data)
      }
    } catch (err) {
      console.error('Error during enhancement:', err)
    } finally {
      setEnhancing(false)
    }
  }

  const isCreateDisabled =
    submitting ||
    enhancing ||
    !post.prompt.trim() ||
    !post.tag.trim() ||
    !!tagError

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7'
      >
        {/* Prompt Field */}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt{' '}
            <span className='text-gray-500 text-sm'>
              ({post.prompt.length}/500)
            </span>
          </span>
          <textarea
            value={post.prompt}
            onChange={e =>
              e.target.value.length <= 500 &&
              setPost({ ...post, prompt: e.target.value })
            }
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          />
        </label>

        {/* Tag Field */}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag{' '}
            <span className='text-gray-500 text-sm'>
              ({post.tag.length}/50)
            </span>
            <span className='ml-1 text-sm text-gray-400'>
              {' '}
              (e.g. #idea, #webdev, #life)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={e =>
              e.target.value.length <= 50 &&
              setPost({ ...post, tag: e.target.value })
            }
            placeholder='#tag'
            required
            className='form_input'
          />
          {tagError && <p className='text-red-500 text-sm mt-1'>{tagError}</p>}
        </label>

        {/* Enhance Instruction Field */}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Enhance Your Post (Optional)
          </span>
          <input
            value={enhanceInstruction}
            onChange={e => setEnhanceInstruction(e.target.value)}
            placeholder='e.g., Make it more exciting, shorter, etc...'
            className='form_input'
            disabled={enhancing}
          />
        </label>

        {/* Action Buttons */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='button'
            onClick={handleEnhance}
            disabled={enhancing || !enhanceInstruction.trim()}
            className='px-4 py-1.5 text-sm bg-green-600 rounded-full text-white disabled:opacity-50'
          >
            {enhancing ? 'Enhancing...' : 'Enhance'}
          </button>

          <button
            type='submit'
            disabled={isCreateDisabled}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white disabled:opacity-50'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
