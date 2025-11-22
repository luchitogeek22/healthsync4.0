import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de salud con inteligencia artificial. Puedo ayudarte con análisis de síntomas, recordatorios de medicamentos, información sobre tus citas y educación en salud. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    'Analizar síntomas',
    'Próximas citas',
    'Recordar medicamentos',
    'Consejos de salud',
    'Iniciar diagnóstico IA',
    'Telemedicina'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('síntoma') || lowerMessage.includes('dolor') || lowerMessage.includes('malestar')) {
      return 'Entiendo que tienes algunos síntomas. Para poder ayudarte mejor, ¿podrías describirme qué molestias tienes específicamente? Por ejemplo: ¿dónde sientes el dolor? ¿Desde cuándo? ¿Qué intensidad tiene del 1 al 10?\n\nRecuerda que esta información es orientativa y no reemplaza una consulta médica profesional. Si los síntomas son graves, te recomiendo agendar una cita urgente.';
    }
    
    if (lowerMessage.includes('cita') || lowerMessage.includes('agendar')) {
      return 'Tienes una consulta general programada para el 15 de noviembre a las 10:00 AM con la Dr. María González (servicio a domicilio).\n\n¿Te gustaría:\n1. Ver detalles de esta cita\n2. Agendar una nueva cita\n3. Modificar una cita existente';
    }
    
    if (lowerMessage.includes('medicamento') || lowerMessage.includes('medicina')) {
      return 'Según tu historial, actualmente estás tomando:\n\n💊 Losartán 50mg - 1 vez al día (mañana)\n\n¿Necesitas que te recuerde cuándo tomar tus medicamentos? Puedo configurar recordatorios personalizados para ti.';
    }
    
    if (lowerMessage.includes('presión') || lowerMessage.includes('hipertensión')) {
      return 'Tu última medición de presión arterial fue de 120/80 mmHg (11 de noviembre), que está dentro del rango normal.\n\nTu próximo control está programado para el 13 de noviembre. ¿Te gustaría algunos consejos para mantener tu presión arterial saludable?';
    }
    
    if (lowerMessage.includes('consejos') || lowerMessage.includes('recomendaciones')) {
      return 'Basándome en tu perfil de salud, aquí hay algunas recomendaciones personalizadas:\n\n🥗 Nutrición: Mantén una dieta baja en sodio\n🏃 Ejercicio: 30 minutos de actividad moderada 5 veces por semana\n💤 Descanso: 7-8 horas de sueño diario\n💊 Medicación: Toma tu Losartán en ayunas\n\n¿Te gustaría más detalles sobre alguno de estos temas?';
    }
    
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('ayuda')) {
      return '¡Hola! Estoy aquí para ayudarte. Puedo asistirte con:\n\n✨ Análisis preliminar de síntomas\n📅 Gestión de citas médicas\n💊 Recordatorios de medicamentos\n📊 Información de tu historial médico\n📚 Educación en salud personalizada\n\n¿En qué te puedo ayudar hoy?';
    }

    return 'Entiendo tu consulta. Como asistente de IA, puedo ayudarte con información general sobre tu salud, gestión de citas y recordatorios. Para diagnósticos específicos o tratamientos, te recomiendo agendar una videoconsulta con uno de nuestros profesionales. ¿Te gustaría que te ayude a programar una?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <Card className="fixed bottom-20 md:bottom-8 right-8 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-white">Asistente IA</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-purple-100">En línea</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                message.sender === 'user'
                  ? 'bg-[#0000FF]'
                  : 'bg-gradient-to-br from-purple-500 to-blue-500'
              }`}
            >
              {message.sender === 'user' ? (
                <User className="h-4 w-4 text-white" />
              ) : (
                <Bot className="h-4 w-4 text-white" />
              )}
            </div>
            <div
              className={`flex-1 max-w-[80%] ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              } flex flex-col gap-1`}
            >
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-[#0000FF] text-white rounded-br-sm'
                    : 'bg-slate-100 text-slate-900 rounded-bl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
              <span className="text-xs text-slate-400 px-2">
                {message.timestamp.toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <div className="flex-shrink-0 border-t p-4 space-y-3">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Badge
                key={action}
                variant="secondary"
                className="cursor-pointer hover:bg-slate-200 transition-colors"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#0000FF] hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-center text-slate-500">
          La IA proporciona información general. Consulta a un profesional para diagnósticos.
        </p>
      </div>
    </Card>
  );
}