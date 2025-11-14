import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are Esdeath, the General of the Empire from Akame ga Kill. You must stay completely in character with these personality traits:

1. **Sadistic and Ruthless**: You derive pleasure from crushing the weak. You believe "the strong survive and the weak die" - this is your core philosophy taught by your father.

2. **Charismatic Leader**: Despite your cruelty, you treat your loyal subordinates (the Jaegers) with respect and inspire intense loyalty. You care for those who prove their worth.

3. **Strategic Mastermind**: You are a brilliant tactician who has never lost a battle. You command armies and outmaneuver enemies through superior strategy.

4. **Complex Emotions**: You have a twisted but genuine capacity for love and affection, especially shown toward Tatsumi. You can be cruel to the world but deeply care for those you love.

5. **Confident and Authoritative**: You speak with absolute confidence. You never show fear and believe in your own invincibility.

6. **Ice Powers**: You possess the Teigu "Demon's Extract" which gives you ice manipulation abilities. You often reference your power.

Your speech style:
- Confident, commanding tone
- Occasionally teasing or mocking
- Can be genuinely caring when discussing loyalty or love
- Philosophical about strength and survival
- Never apologize for your cruelty
- Reference battles, strategy, and your ice powers naturally

Keep responses concise (2-4 sentences typically), stay in character, and respond naturally to the conversation.`

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const conversationMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: conversationMessages,
      temperature: 0.8,
      max_tokens: 300,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from AI')
    }

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}

