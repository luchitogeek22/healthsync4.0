import { useState } from 'react';
import { Calendar, Users, Video, DollarSign, Clock, TrendingUp, Bell, FileText, Star, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export function DoctorPanel() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const todaySchedule = [
    {
      id: 1,
      time: '09:00 AM',
      patient: 'María González',
      type: 'Videoconsulta',
      status: 'completed',
      reason: 'Control de presión arterial'
    },
    {
      id: 2,
      time: '10:30 AM',
      patient: 'Carlos Ruiz',
      type: 'Domicilio',
      status: 'in-progress',
      reason: 'Revisión post-operatoria'
    },
    {
      id: 3,
      time: '02:00 PM',
      patient: 'Ana Martínez',
      type: 'Videoconsulta',
      status: 'pending',
      reason: 'Consulta general'
    },
    {
      id: 4,
      time: '03:30 PM',
      patient: 'Luis Fernández',
      type: 'Videoconsulta',
      status: 'pending',
      reason: 'Seguimiento diabetes'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'María González',
      age: 45,
      lastVisit: 'Hoy',
      condition: 'Hipertensión',
      priority: 'medium'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      age: 62,
      lastVisit: 'Hace 2 días',
      condition: 'Post-operatorio',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      age: 34,
      lastVisit: 'Hace 1 semana',
      condition: 'Embarazo',
      priority: 'medium'
    }
  ];

  const stats = [
    {
      label: 'Pacientes Hoy',
      value: '12',
      change: '+3',
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      label: 'Ingresos Mes',
      value: '$8,450',
      change: '+12%',
      icon: DollarSign,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Calificación',
      value: '4.9',
      change: '+0.2',
      icon: Star,
      color: 'from-amber-500 to-orange-500'
    },
    {
      label: 'Horas Activas',
      value: '156',
      change: '+8',
      icon: Clock,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleStartConsultation = (id: number) => {
    toast.success('Iniciando videoconsulta...');
    // Navigate to telemedicine
  };

  const handleCompleteConsultation = (id: number) => {
    toast.success('Consulta completada');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="gradient-health rounded-2xl p-6 text-white glass">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-3xl mb-2">Panel del Doctor</h1>
            <p className="text-emerald-100">Bienvenido de vuelta, Dr. Carlos Méndez</p>
          </div>
          <Avatar className="h-16 w-16 border-4 border-white/30">
            <AvatarFallback className="bg-white text-emerald-600 text-xl">
              CM
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-green border-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl text-white mb-1">{stat.value}</div>
                <div className="text-xs text-emerald-100 mb-1">{stat.label}</div>
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
                  {stat.change}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2">
          <Card className="glass border-2 border-white/50 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                Agenda de Hoy
              </CardTitle>
              <CardDescription>
                {todaySchedule.length} consultas programadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySchedule.map((appointment) => (
                <div 
                  key={appointment.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    appointment.status === 'completed' 
                      ? 'border-emerald-200 bg-emerald-50/50' 
                      : appointment.status === 'in-progress'
                      ? 'border-cyan-200 bg-cyan-50/50 ring-2 ring-cyan-400'
                      : 'border-slate-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        appointment.status === 'completed' ? 'bg-emerald-100' :
                        appointment.status === 'in-progress' ? 'bg-cyan-100' :
                        'bg-slate-100'
                      }`}>
                        <span className="text-sm">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="mb-1">{appointment.patient}</h4>
                        <p className="text-sm text-slate-600">{appointment.reason}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        appointment.status === 'completed' ? 'secondary' :
                        appointment.status === 'in-progress' ? 'default' :
                        'outline'
                      }
                      className={
                        appointment.status === 'in-progress' 
                          ? 'bg-cyan-600 text-white' 
                          : ''
                      }
                    >
                      {appointment.status === 'completed' ? 'Completada' :
                       appointment.status === 'in-progress' ? 'En curso' :
                       'Pendiente'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        {appointment.type}
                      </span>
                    </div>

                    {appointment.status === 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => handleStartConsultation(appointment.id)}
                        className="gradient-health text-white"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Iniciar
                      </Button>
                    )}
                    {appointment.status === 'in-progress' && (
                      <Button 
                        size="sm"
                        onClick={() => handleCompleteConsultation(appointment.id)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        Completar
                      </Button>
                    )}
                    {appointment.status === 'completed' && (
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-emerald-300 text-emerald-600"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Ver Notas
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Patients & Alerts */}
        <div className="space-y-6">
          {/* Recent Patients */}
          <Card className="glass border-2 border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                Pacientes Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPatients.map((patient) => (
                <div 
                  key={patient.id}
                  className="p-3 rounded-lg border hover:border-emerald-300 transition-colors cursor-pointer"
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm mb-1">{patient.name}</h4>
                      <p className="text-xs text-slate-600">{patient.age} años</p>
                    </div>
                    {patient.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        Alta prioridad
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>🩺 {patient.condition}</p>
                    <p>📅 {patient.lastVisit}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Ver Todos
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass border-2 border-white/50">
            <CardHeader>
              <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gradient-health text-white">
                <Video className="h-4 w-4 mr-2" />
                Nueva Videoconsulta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Crear Receta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Bloquear Horario
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="glass-cyan border-2 border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Bell className="h-4 w-4 text-cyan-600" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm p-3 bg-white/60 rounded-lg">
                <p className="text-cyan-700 mb-1">Nueva consulta agendada</p>
                <p className="text-xs text-slate-600">Paciente: Ana Martínez - 14:00</p>
              </div>
              <div className="text-sm p-3 bg-white/60 rounded-lg">
                <p className="text-cyan-700 mb-1">Recordatorio</p>
                <p className="text-xs text-slate-600">Seguimiento con Carlos Ruiz</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics */}
      <Card className="glass border-2 border-white/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Análisis del Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="consultations">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="consultations">Consultas</TabsTrigger>
              <TabsTrigger value="income">Ingresos</TabsTrigger>
              <TabsTrigger value="patients">Pacientes</TabsTrigger>
            </TabsList>
            <TabsContent value="consultations" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total del mes</span>
                  <span className="text-2xl">156 consultas</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                    <div className="text-sm text-slate-600 mb-1">Videoconsultas</div>
                    <div className="text-2xl text-emerald-600">98</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200">
                    <div className="text-sm text-slate-600 mb-1">A domicilio</div>
                    <div className="text-2xl text-cyan-600">58</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="income" className="mt-6">
              <div className="text-center py-8">
                <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">
                  $8,450
                </div>
                <p className="text-slate-600">Ingresos de noviembre</p>
                <Badge className="mt-4 bg-emerald-100 text-emerald-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% vs mes anterior
                </Badge>
              </div>
            </TabsContent>
            <TabsContent value="patients" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Pacientes activos</span>
                  <span className="text-2xl">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Nuevos este mes</span>
                  <span className="text-2xl text-emerald-600">+12</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
