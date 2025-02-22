import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Mock AI response generator
function generateMockPlan(projectDescription: string) {
  return {
    title: "Project Plan",
    description: projectDescription,
    tools: [
      {
        name: "GitHub Student Developer Pack",
        description: "Essential development tools and services",
        url: "/search/github"
      },
      {
        name: "AWS Educate",
        description: "Cloud infrastructure and services",
        url: "/search/aws"
      },
      {
        name: "Visual Studio Code",
        description: "Powerful code editor with extensions",
        url: "/search/development"
      }
    ],
    steps: [
      "Set up development environment",
      "Design system architecture",
      "Implement core features",
      "Add authentication and security",
      "Deploy and monitor"
    ]
  };
}

export async function POST(request: Request) {
  try {
    const { projectDescription } = await request.json();

    // Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Generate plan
    const plan = generateMockPlan(projectDescription);

    // Store chat history
    const { error: chatError } = await supabase
      .from('chat_history')
      .insert({
        user_id: session.user.id,
        message: projectDescription,
        response: plan,
      });

    if (chatError) {
      console.error('Error storing chat history:', chatError);
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}