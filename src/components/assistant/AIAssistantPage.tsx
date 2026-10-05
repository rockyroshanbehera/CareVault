import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareHeart,
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  Clock,
  HelpCircle,
  CheckCircle2,
  Building2,
  RefreshCw,
  Info
} from 'lucide-react';
import { useCareVault } from '../../context/CareVaultContext';
import { AIService } from '../../services/aiService';
import { AIChatMessage } from '../../types';
import { Badge } from '../common/Badge';
import { SafetyNotice } from '../common/SafetyNotice';

const INITIAL_SUGGESTIONS = [
  "Show Dad's latest prescription",
  "Summarize Mom's recent report",
  "When was the last blood test?",
  "Prepare a summary for my doctor",
  "Show our upcoming appointments",
  "Find hospitals for cardiology near me"
];

export const AIAssistantPage: React.FC = () => {
  const { documents, familyMembers, setSelectedDocForSummary, setActiveTab } = useCareVault();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "Hello Roshan! I'm your CareVault AI Assistant. I have indexed your family's lifelong medical records, prescriptions, and lab reports. How can I help you manage your family's health today?",
      timestamp: 'Just now',
      suggestedQuestions: INITIAL_SUGGESTIONS
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await AIService.answerHealthVaultQuestion(queryText, documents, familyMembers);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I experienced a temporary issue reading the vault. Please check the Health Vault tab directly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOpenSourceDoc = (docId?: string) => {
    if (!docId) return;
    const found = documents.find((d) => d.id === docId);
    if (found) {
      setSelectedDocForSummary(found);
      setActiveTab('vault');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                CareVault Assistant
              </h1>
              <p className="text-xs text-slate-500">
                &ldquo;Ask questions about your family&apos;s health records.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal">AI Service Online</Badge>
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            title="Clear Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      <SafetyNotice className="shrink-0" />

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-5 p-4 rounded-3xl bg-slate-50/70 border border-slate-200/80 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-soft ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Sources Badge if any */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Cited Health Records:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOpenSourceDoc(src.documentId)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-[11px] font-medium transition-colors"
                        >
                          <FileText className="w-3 h-3 text-brand-600" />
                          <span>{src.documentTitle}</span>
                          {src.date && <span className="text-brand-500">({src.date})</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested follow-up prompt chips */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Suggested Actions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-left text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 text-slate-700 border border-slate-200 transition-all shadow-2xs"
                        >
                          💡 {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <span
                  className={`block text-[10px] mt-2 text-right ${
                    isUser ? 'text-brand-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 ml-1">Searching family records...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputQuery);
        }}
        className="shrink-0 flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-card"
      >
        <input
          type="text"
          placeholder="Ask anything (e.g. 'What was Dad\'s latest prescription?', 'Summarize Mom\'s report')..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isTyping}
          className="p-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl shadow-md shadow-brand-600/20 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};