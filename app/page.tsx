'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'esdeath'
  content: string
  emotion?: string
}

type Emotion = 'neutral' | 'angry' | 'happy' | 'sad' | 'caring'

const EMOTION_IMAGES: Record<Emotion, string> = {
  neutral: '/esdeath_emotions/esdeath_neautral.webp',
  angry: '/esdeath_emotions/esdeath_angry.png',
  happy: '/esdeath_emotions/esdeath_happy.webp',
  sad: '/esdeath_emotions/esdeath_sad.webp',
  caring: '/esdeath_emotions/esdeath_blush.jpg',
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'esdeath',
      content: "So, you've come to speak with me. I hope you're strong enough to hold my interest. The weak have no place in my presence."
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral')
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const userName = "Anthony Soy Boy"
  const userAvatar = "/user_pfp.jpeg"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const savedCurrentEmotion = localStorage.getItem('currentEmotion') as Emotion
    if (savedCurrentEmotion && EMOTION_IMAGES[savedCurrentEmotion]) {
      setCurrentEmotion(savedCurrentEmotion)
    }
    
    const savedVolume = localStorage.getItem('bgMusicVolume')
    if (savedVolume) {
      const vol = parseFloat(savedVolume)
      setVolume(vol)
      if (audioRef.current) {
        audioRef.current.volume = vol
      }
    }
    
    const savedPlaying = localStorage.getItem('bgMusicPlaying') === 'true'
    if (savedPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      localStorage.setItem('bgMusicVolume', volume.toString())
    }
  }, [volume])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        localStorage.setItem('bgMusicPlaying', 'false')
      } else {
        audioRef.current.play().catch(() => {
          setIsPlaying(false)
        })
        setIsPlaying(true)
        localStorage.setItem('bgMusicPlaying', 'true')
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const detectEmotion = (text: string): Emotion => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.match(/\b(angry|furious|rage|disgust|hate|despise|kill|destroy|crush)\b/)) {
      return 'angry'
    }
    if (lowerText.match(/\b(happy|pleased|delight|joy|smile|glad|wonderful|excellent|amazing|incredible|victory|triumph)\b/)) {
      return 'happy'
    }
    if (lowerText.match(/\b(love|care|affection|dear|beloved|treasure|protect|blush|fond)\b/)) {
      return 'caring'
    }
    if (lowerText.match(/\b(sad|lonely|hurt|pain|sorrow|regret|miss)\b/)) {
      return 'sad'
    }
    
    return 'neutral'
  }

  const getCurrentEsdeathAvatar = (): string => {
    return EMOTION_IMAGES[currentEmotion] || EMOTION_IMAGES.neutral
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const emotion = detectEmotion(data.response)
      setCurrentEmotion(emotion)
      localStorage.setItem('currentEmotion', emotion)
      setMessages(prev => [...prev, { role: 'esdeath', content: data.response, emotion }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'esdeath',
        content: "Hmph. Something went wrong. Try again, if you're strong enough to handle it."
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="snowflakes">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
      </div>
      <div className="container">
        <div className="chat-header">
          <div className="character-info">
            <div className="avatar">
              <img src={getCurrentEsdeathAvatar()} alt="Esdeath" className="avatar-image" />
            </div>
            <div className="character-details">
              <h1>Esdeath</h1>
              <p className="status">General of the Empire • Online</p>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                <img src={userAvatar} alt={userName} className="avatar-image" />
              </div>
              <div className="user-details">
                <h2>{userName}</h2>
              </div>
            </div>
            <div className="music-controls">
              <button 
                className="music-toggle-button"
                onClick={toggleMusic}
                title={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <div className="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  title="Volume"
                />
              </div>
            </div>
          </div>
          <audio
            ref={audioRef}
            loop
            preload="auto"
            id="background-music"
          >
            <source src="/background-music.mp3" type="audio/mpeg" />
            <source src="/background-music.ogg" type="audio/ogg" />
            <source src="/background-music.wav" type="audio/wav" />
          </audio>
        </div>


        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'user' ? 'user-message' : 'esdeath-message'}`}
            >
              <div className="message-avatar">
                {message.role === 'user' ? (
                  <img src={userAvatar} alt={userName} className="message-avatar-image" />
                ) : (
                  <img 
                    src={EMOTION_IMAGES[(message.emotion as Emotion) || currentEmotion] || EMOTION_IMAGES.neutral} 
                    alt="Esdeath" 
                    className="message-avatar-image" 
                  />
                )}
              </div>
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message esdeath-message">
              <div className="message-avatar">
                <img src={getCurrentEsdeathAvatar()} alt="Esdeath" className="message-avatar-image" />
              </div>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
              placeholder="Type your message..."
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading || !input.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

