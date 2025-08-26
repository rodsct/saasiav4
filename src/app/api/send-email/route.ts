import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { sendEmail } from '@/lib/resend'
import { prisma } from '@/lib/prisma'
import { render } from '@react-email/render'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { templateId, to, variables } = await req.json()
    
    if (!templateId || !to) {
      return NextResponse.json(
        { error: 'Template ID and recipient are required' },
        { status: 400 }
      )
    }

    const template = await prisma.emailTemplate.findUnique({
      where: { 
        id: templateId,
        userId: session.user.id,
        isActive: true
      },
    })

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    let htmlContent = template.htmlContent
    let textContent = template.textContent
    let subject = template.subject

    if (variables && typeof variables === 'object') {
      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value as string)
        textContent = textContent?.replace(new RegExp(placeholder, 'g'), value as string)
        subject = subject.replace(new RegExp(placeholder, 'g'), value as string)
      })
    }

    const result = await sendEmail({
      to: Array.isArray(to) ? to : [to],
      subject,
      html: htmlContent,
      text: textContent || undefined,
    })

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.data?.id })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in send-email API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}