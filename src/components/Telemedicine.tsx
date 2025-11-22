import { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Share2, Settings, Users, Clock, FileText, Upload, Maximize2, Minimize2, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

type CallStatus = 'waiting' | 'connecting' | 'active' | 'ended';

interface Message {
  id: number;
  sender: 'patient' | 'doctor';
  text: string;
  timestamp: Date;
}

export function Telemedicine() {
  const [callStatus, setCallStatus] = useState<CallStatus>('waiting');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const doctor = {
    name: 'Dr. María González',
    specialty: 'Medicina General',
    avatar: 'MG',
    status: 'En línea'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const startCall = () => {
    setCallStatus('connecting');
    setTimeout(() => {
      setCallStatus('active');
      addSystemMessage('Llamada conectada. La consulta ha comenzado.');
    }, 2000);
  };

  const endCall = () => {
    setCallStatus('ended');
    addSystemMessage('Llamada finalizada. Gracias por usar HealthSync.');
  };

  const addSystemMessage = (text: string) => {
    const systemMessage: Message = {
      id: messages.length + 1,
      sender: 'doctor',
      text,
      timestamp: new Date()
    };
    setMessages([...messages, systemMessage]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      sender: 'patient',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate doctor response
    setTimeout(() => {
      const responses = [
        'Entiendo, déjame revisar eso.',
        'Gracias por la información.',
        'Te enviaré la receta por este medio.',
        'Voy a enviarte algunas recomendaciones.'
      ];
      const doctorMessage: Message = {
        id: messages.length + 2,
        sender: 'doctor',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, doctorMessage]);
    }, 1500);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Telemedicina</h1>
            <p className="text-purple-100">Consulta médica por videollamada</p>
          </div>
          {callStatus === 'active' && (
            <Badge className="bg-white/20 text-white backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(callDuration)}
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className={isFullscreen ? 'fixed inset-4 z-50' : ''}>
            <CardContent className="p-0">
              <div className="relative bg-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {/* Doctor Video */}
                {callStatus === 'active' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1666886573452-9dc8ce8f5cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjI4Nzg2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Doctor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <p className="text-white text-sm">{doctor.name}</p>
                      <p className="text-slate-300 text-xs">{doctor.specialty}</p>
                    </div>
                  </div>
                )}

                {/* Waiting State */}
                {callStatus === 'waiting' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                      <Video className="h-12 w-12" />
                    </div>
                    <h3 className="text-white mb-2">Lista para iniciar</h3>
                    <p className="text-slate-300 text-sm mb-6">
                      {doctor.name} está disponible
                    </p>
                    <Button 
                      onClick={startCall}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Iniciar Videollamada
                    </Button>
                  </div>
                )}

                {/* Connecting State */}
                {callStatus === 'connecting' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Video className="h-12 w-12" />
                    </div>
                    <h3 className="text-white mb-2">Conectando...</h3>
                    <p className="text-slate-300 text-sm">
                      Estableciendo conexión segura
                    </p>
                  </div>
                )}

                {/* Ended State */}
                {callStatus === 'ended' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="h-24 w-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                      <Phone className="h-12 w-12" />
                    </div>
                    <h3 className="text-white mb-2">Llamada Finalizada</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Duración: {formatDuration(callDuration)}
                    </p>
                    <Button 
                      onClick={() => {
                        setCallStatus('waiting');
                        setCallDuration(0);
                      }}
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Nueva Consulta
                    </Button>
                  </div>
                )}

                {/* Patient Video (PiP) */}
                {callStatus === 'active' && (
                  <div className="absolute top-4 right-4 w-48 aspect-video bg-slate-800 rounded-lg border-2 border-white/20 overflow-hidden">
                    {isVideoOff ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="h-12 w-12 bg-[#0000FF] rounded-full flex items-center justify-center">
                          <span className="text-white">Tú</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-white/50" />
                      </div>
                    )}
                  </div>
                )}

                {/* Controls */}
                {(callStatus === 'active' || callStatus === 'connecting') && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        size="lg"
                        variant={isMuted ? 'destructive' : 'secondary'}
                        onClick={() => setIsMuted(!isMuted)}
                        className="rounded-full h-14 w-14"
                      >
                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>

                      <Button
                        size="lg"
                        variant={isVideoOff ? 'destructive' : 'secondary'}
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className="rounded-full h-14 w-14"
                      >
                        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                      </Button>

                      <Button
                        size="lg"
                        variant="destructive"
                        onClick={endCall}
                        className="rounded-full h-14 px-8"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Finalizar
                      </Button>

                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => setShowChat(!showChat)}
                        className="rounded-full h-14 w-14"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </Button>

                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="rounded-full h-14 w-14"
                      >
                        {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {callStatus === 'active' && (
            <div className="grid grid-cols-3 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowNotes(!showNotes)}
              >
                <CardContent className="p-4 text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2 text-[#0000FF]" />
                  <p className="text-sm">Notas</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-[#0000FF]" />
                  <p className="text-sm">Compartir</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Settings className="h-6 w-6 mx-auto mb-2 text-[#0000FF]" />
                  <p className="text-sm">Ajustes</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Doctor Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Doctor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-[#0000FF] text-white text-xl">
                    {doctor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3>{doctor.name}</h3>
                  <p className="text-sm text-slate-600">{doctor.specialty}</p>
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                    {doctor.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Experiencia:</span>
                  <span>15 años</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Calificación:</span>
                  <span>⭐ 4.9 (245 opiniones)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cédula:</span>
                  <span>7890123</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          {showChat && callStatus === 'active' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto space-y-3 p-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                            msg.sender === 'patient'
                              ? 'bg-[#0000FF] text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString('es-MX', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} size="sm">
                      Enviar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {showNotes && callStatus === 'active' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notas de la Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Escribe tus notas aquí..."
                  rows={6}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button className="w-full mt-3" variant="outline">
                  Guardar Notas
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Session Info */}
          {callStatus === 'active' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Tipo de consulta:</span>
                    <Badge>General</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Conexión:</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Excelente
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Cifrado:</span>
                    <Badge variant="outline">E2E Seguro</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Post-Call Summary */}
      {callStatus === 'ended' && (
        <Card className="border-2 border-[#0000FF]">
          <CardHeader>
            <CardTitle>Resumen de la Consulta</CardTitle>
            <CardDescription>
              Consulta finalizada el {new Date().toLocaleString('es-MX')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Duración</p>
                <p className="text-2xl">{formatDuration(callDuration)}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Mensajes</p>
                <p className="text-2xl">{messages.length}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Calidad</p>
                <p className="text-2xl">⭐ HD</p>
              </div>
            </div>

            {notes && (
              <div>
                <h4 className="mb-2">Notas de la consulta</h4>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm">{notes}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button className="flex-1 bg-[#0000FF] hover:bg-blue-700">
                Descargar Resumen
              </Button>
              <Button variant="outline" className="flex-1">
                Enviar por Email
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
