'use client'

import HeroBanner from '@/components/HeroBanner'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendMessagesToApi = async (data: FormData) => {
    const {
      name: Name,
      email: Email,
      subject: Subject,
      message: Message,
    } = data
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/contacts`,
        {
          data: { Name, Email, Subject, Message },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200 || response.status === 201) {
        setStatus('success')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessagesToApi(formData)
  }

  return (
    <main className="wrapper-flex-1 overflow-x-hidden relative max-lg:mt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-full">
        <div className="hidden lg:block">
          <HeroBanner
            imageUrl="/images/contact-page.jpg"
            title="Contact"
            height="h-full"
          />
        </div>

        <section className="w-[80%] mx-auto p-5 flex justify-center items-center max-lg:flex-col">
          <h2 className="max-lg:block hidden text-3xl font-bold text-center mb-6">
            Get in Touch
          </h2>

          {status === 'success' ? (
            <div className="text-center">
              <p className="text-lg text-black mb-8">
                Message sent successfully! Our team will get back to you as soon
                as possible.
              </p>
              <Link
                href="/"
                className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
              >
                Go back to the homepage
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 w-full"
            >
              {status === 'error' && (
                <p className="text-red-600 text-sm text-center">
                  {errorMessage || 'An error occurred. Please try again later.'}
                </p>
              )}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-black py-1 px-4 border border-transparent rounded-2xl transition-effect hover:bg-white hover:text-black hover:border-black"
              >
                Send Message
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
