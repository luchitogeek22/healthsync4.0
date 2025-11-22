import { useState } from 'react';
import { Calendar, Activity, Heart, AlertCircle, Clock, Home, Brain, Video, FileText, GraduationCap, Users, Sparkles, DollarSign, TrendingUp, Pill, Apple } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'profile' | 'appointments' | 'history' | 'education' | 'professionals' | 'ai' | 'pricing' | 'symptom-checker' | 'telemedicine') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Consulta General',
      doctor: 'Dr. María González',
      date: '2025-11-15',
      time: '10:00 AM',
      location: 'A domicilio',
      isHome: true
    },
    {
      id: 2,
      type: 'Control Preventivo',
      doctor: 'Dr. Carlos Ruiz',
      date: '2025-11-20',
      time: '3:00 PM',
      location: 'A domicilio',
      isHome: true
    }
  ];

  const healthAlerts = [
    {
      id: 1,
      type: 'Recordatorio',
      message: 'Próximo control de presión arterial',
      priority: 'medium',
      date: '2025-11-13'
    },
    {
      id: 2,
      type: 'Preventivo',
      message: 'Vacuna anual recomendada',
      priority: 'low',
      date: '2025-11-25'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'Consulta completada', date: '2025-11-08', icon: Activity },
    { id: 2, action: 'Resultados de laboratorio disponibles', date: '2025-11-05', icon: FileText },
    { id: 3, action: 'Nueva cápsula educativa', date: '2025-11-03', icon: GraduationCap }
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0000FF] to-blue-600 rounded-2xl p-6 text-white">
        <h2>Bienvenido a HealthSync 4.0</h2>
        <p className="mt-2 text-blue-100">Tu centro de salud personal, disponible cuando lo necesites</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Calendar className="h-6 w-6 mb-2" />
            <div className="text-2xl">{upcomingAppointments.length}</div>
            <div className="text-sm text-blue-100">Citas próximas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Heart className="h-6 w-6 mb-2" />
            <div className="text-2xl">95%</div>
            <div className="text-sm text-blue-100">Salud general</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Activity className="h-6 w-6 mb-2" />
            <div className="text-2xl">{healthAlerts.length}</div>
            <div className="text-sm text-blue-100">Alertas activas</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Citas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Próximas Citas</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('appointments')}
              >
                Ver todas
              </Button>
            </div>
            <CardDescription>Servicios programados a domicilio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => onNavigate('appointments')}
              >
                <div className="flex-shrink-0 h-12 w-12 bg-[#0000FF] rounded-lg flex items-center justify-center">
                  {appointment.isHome ? (
                    <Home className="h-6 w-6 text-white" />
                  ) : (
                    <Calendar className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p>{appointment.type}</p>
                    {appointment.isHome && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Domicilio
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{appointment.doctor}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              className="w-full bg-[#0000FF] hover:bg-blue-700"
              onClick={() => onNavigate('appointments')}
            >
              Agendar Nueva Cita
            </Button>
          </CardContent>
        </Card>

        {/* Alertas y Seguimiento */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas y Seguimiento</CardTitle>
            <CardDescription>Recordatorios preventivos personalizados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg"
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                  alert.priority === 'high' ? 'bg-red-100' :
                  alert.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertCircle className={`h-5 w-5 ${
                    alert.priority === 'high' ? 'text-red-600' :
                    alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{alert.type}</p>
                    <Badge variant="outline" className="text-xs">
                      {alert.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onNavigate('history')}
            >
              Ver Historial Completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso Rápido</CardTitle>
          <CardDescription>Explora todas las funcionalidades de HealthSync</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button 
              onClick={() => onNavigate('education')}
              className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <GraduationCap className="h-8 w-8 text-purple-600 mb-2" />
              <p className="text-sm">Educación</p>
            </button>
            <button 
              onClick={() => onNavigate('professionals')}
              className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <p className="text-sm">Profesionales</p>
            </button>
            <button 
              onClick={() => onNavigate('history')}
              className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-sm">Historial</p>
            </button>
            <button 
              onClick={() => onNavigate('appointments')}
              className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <Calendar className="h-8 w-8 text-orange-600 mb-2" />
              <p className="text-sm">Agendar</p>
            </button>
            <button 
              onClick={() => onNavigate('ai')}
              className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <Sparkles className="h-8 w-8 text-pink-600 mb-2" />
              <p className="text-sm">IA</p>
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <DollarSign className="h-8 w-8 text-gray-600 mb-2" />
              <p className="text-sm">Precios</p>
            </button>
            <button 
              onClick={() => onNavigate('symptom-checker')}
              className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <Brain className="h-8 w-8 text-red-600 mb-2" />
              <p className="text-sm">Verificador de Síntomas</p>
            </button>
            <button 
              onClick={() => onNavigate('telemedicine')}
              className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl hover:shadow-md transition-shadow"
            >
              <Video className="h-8 w-8 text-cyan-600 mb-2" />
              <p className="text-sm">Telemedicina</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}