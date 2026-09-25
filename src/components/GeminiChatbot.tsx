import React, { useState, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

interface ChatbotRole {
  id: string;
  name: string;
  badge: string;
  description: string;
  systemInstruction: string;
  recommendedModel: 'complex' | 'general' | 'fast';
}

const CHATBOT_ROLES: ChatbotRole[] = [
  {
    id: 'hr_advisor',
    name: 'HR & People Advisor',
    badge: 'People Ops',
    description: 'Workplace policies, employee onboarding, PTO, and team culture',
    systemInstruction:
      'You are Gusto’s Senior People Advisor. You provide supportive, clear, actionable, and empathetic guidance on HR best practices, employee relations, onboarding checklists, leave policies, and company culture for growing small businesses. Format your responses with structured headings and bullet points.',
    recommendedModel: 'general',
  },
  {
    id: 'payroll_compliance',
    name: 'Payroll & Tax Strategist',
    badge: 'Taxes & Legal',
    description: 'Federal/state withholding, tax credits, 1099 vs W-2, and overtime laws',
    systemInstruction:
      'You are Gusto’s Principal Compliance & Tax Strategist. You provide authoritative, thorough, and highly accurate analysis of federal, state, and local payroll taxes (FICA, FUTA, SUTA), employee classification compliance, and R&D/WOTC tax credit opportunities.',
    recommendedModel: 'complex',
  },
  {
    id: 'fast_calculator',
    name: 'Rapid Math & Compensation',
    badge: 'Instant Math',
    description: 'Quick take-home estimates, overtime rates, and wage adjustments',
    systemInstruction:
      'You are Gusto’s Instant Payroll Calculator. Provide rapid, concise computations of gross-to-net pay, overtime rates (1.5x/2x), bonus withholding, and hourly-to-salary conversions. Keep commentary brief and numbers prominent.',
    recommendedModel: 'fast',
  },
  {
    id: 'benefits_coach',
    name: 'Benefits & Perks Specialist',
    badge: 'Benefits',
    description: 'Health insurance, 401(k) retirement matching, HSAs, and wellness perks',
    systemInstruction:
      'You are Gusto’s Employee Benefits Specialist. Assist employers in choosing competitive health insurance tiers, setting up 401(k) safe-harbor matches, commuter benefits, and cost-effective perks that attract top talent.',
    recommendedModel: 'general',
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage> = {
  hr_advisor: {
    id: 'init-1',
    role: 'model',
    text: "Hello! I'm your Gusto People Advisor. How can I help you support your team today? Ask me about hiring workflows, PTO policies, or workplace guidelines.",
    timestamp: 'Just now',
    modelUsed: 'gemini-3.5-flash',
  },
  payroll_compliance: {
    id: 'init-2',
    role: 'model',
    text: "Welcome to Gusto Compliance & Tax Strategy. Ask me anything about multi-state payroll, employee vs contractor classification, or tax withholding regulations.",
    timestamp: 'Just now',
    modelUsed: 'gemini-3.1-pro-preview',
  },
  fast_calculator: {
    id: 'init-3',
    role: 'model',
    text: "Gusto Fast Math ready! Give me an hourly rate, bonus amount, or salary figure and I'll calculate the breakdown instantly.",
    timestamp: 'Just now',
    modelUsed: 'gemini-3.1-flash-lite',
  },
  benefits_coach: {
    id: 'init-4',
    role: 'model',
    text: "Hi there! Looking to roll out health plans, 401(k) matching, or pre-tax commuter benefits? Let's design a package your employees will love.",
    timestamp: 'Just now',
    modelUsed: 'gemini-3.5-flash',
  },
};

const SUGGESTED_PROMPTS = [
  'Estimate take-home pay for an $85,000 salary in California',
  'What is the difference between 1099 contractor and W-2 employee?',
  'How do 401(k) employer matching tax deductions work?',
  'Draft a welcoming offer letter paragraph for our new engineer',
];

interface GeminiChatbotProps {
  embedded?: boolean;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ embedded = false }) => {
  const [selectedRole, setSelectedRole] = useState<ChatbotRole>(CHATBOT_ROLES[0]);
  const [modelType, setModelType] = useState<'complex' | 'general' | 'fast'>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGES.hr_advisor]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle role change
  const handleRoleChange = (role: ChatbotRole) => {
    setSelectedRole(role);
    setModelType(role.recommendedModel);
    setMessages([INITIAL_MESSAGES[role.id] || INITIAL_MESSAGES.hr_advisor]);
  };

  const handleSendMessage = async (userTextToSend?: string) => {
    const text = (userTextToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history with system instruction to server
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          modelType,
          roleSystemInstruction: selectedRole.systemInstruction,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'I analyzed your request. Please let me know if you need more details.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.model,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚠️ Error generating response: ${err.message || 'Server error'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGES[selectedRole.id] || INITIAL_MESSAGES.hr_advisor]);
  };

  return (
    <div
      className={`flex flex-col bg-white ${
        embedded ? 'h-[620px]' : 'h-full min-h-[500px]'
      } rounded-2xl border border-gray-200 overflow-hidden shadow-sm`}
    >
      {/* Top Header & Role Selector */}
      <div className="bg-[#FAF9F7] border-b border-gray-200 p-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F25238] to-[#FF8166] flex items-center justify-center text-white shadow-md text-lg">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-base">Gusto Copilot</h3>
                <span className="text-[11px] bg-red-100 text-[#F25238] font-bold px-2 py-0.5 rounded-full">
                  Multi-Turn AI
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Small business payroll, HR policies, and compensation advisor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="text-xs text-gray-500 hover:text-gray-800 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              title="Reset conversation"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-3.5 pt-3 border-t border-gray-200/70 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">
              Role:
            </span>
            {CHATBOT_ROLES.map((role) => {
              const isSelected = selectedRole.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleChange(role)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A3B34] text-white shadow-xs'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {role.name}
                </button>
              );
            })}
          </div>

          {/* Model Engine Selector */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 self-start md:self-auto">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Engine:
            </span>
            <div className="inline-flex rounded-lg bg-gray-100 p-0.5 border border-gray-200">
              <button
                onClick={() => setModelType('complex')}
                title="gemini-3.1-pro-preview (Complex Tasks)"
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  modelType === 'complex'
                    ? 'bg-white text-[#F25238] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pro 3.1
              </button>
              <button
                onClick={() => setModelType('general')}
                title="gemini-3.5-flash (General Tasks)"
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  modelType === 'general'
                    ? 'bg-white text-[#0A3B34] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Flash 3.5
              </button>
              <button
                onClick={() => setModelType('fast')}
                title="gemini-3.1-flash-lite (Fast Math)"
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  modelType === 'fast'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lite (Fast)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Thread (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-[#FDFCFB]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#0A3B34] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  G
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#F25238] text-white rounded-tr-xs shadow-sm'
                    : 'bg-white text-gray-800 border border-gray-200/90 rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`mt-2 flex items-center gap-2 text-[10px] ${
                    isUser ? 'text-white/80 justify-end' : 'text-gray-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.modelUsed && (
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                      {msg.modelUsed}
                    </span>
                  )}
                </div>
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-orange-100 text-[#F25238] border border-orange-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  You
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-[#0A3B34] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              G
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-[#F25238] animate-ping" />
              <span>Gusto Copilot is analyzing using {modelType === 'complex' ? 'gemini-3.1-pro-preview' : modelType === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'}...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Starters */}
      {messages.length <= 2 && (
        <div className="px-4 sm:px-6 py-2 bg-[#FAF9F7] border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">Suggested:</span>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs bg-white text-gray-700 hover:text-[#F25238] hover:border-[#F25238] border border-gray-200 rounded-full px-3 py-1 whitespace-nowrap transition cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${selectedRole.name} about salaries, tax withholdings, HR laws...`}
            className="flex-1 bg-[#FAF9F7] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F25238] focus:bg-white transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-[#F25238] hover:bg-[#d84229] disabled:opacity-40 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Send</span>
            <span>➔</span>
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400 px-1">
          <span>Active Role: <strong className="text-gray-600">{selectedRole.name}</strong></span>
          <span>Powered by Google Gemini</span>
        </div>
      </div>
    </div>
  );
};
