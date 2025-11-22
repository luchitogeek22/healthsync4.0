import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Home, MapPin, Plus, Video, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

export function Appointments() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: 'Consulta General',
      doctor: 'Dr. María González',
      date: '2025-11-15',
      time: '10:00 AM',
      location: 'A domicilio',
      status: 'confirmed',
      isHome: true
    },
    {
      id: 2,
      type: 'Control Preventivo',
      doctor: 'Dr. Carlos Ruiz',
      date: '2025-11-20',
      time: '3:00 PM',
      location: 'A domicilio',
      status: 'confirmed',
      isHome: true
    }
  ]);

  const handleBookAppointment = () => {
    if (!selectedService || !selectedTime || !selectedDate) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      type: selectedService,
      doctor: 'Por asignar',
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      location: selectedService.includes('Videoconsulta') ? 'Videollamada' : 'A domicilio',
      status: 'pending',
      isHome: !selectedService.includes('Videoconsulta')
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    toast.success('¡Cita agendada exitosamente!');
    
    // Reset form
    setSelectedService('');
    setSelectedTime('');
    setSelectedSpecialty('');
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.filter(app => app.id !== id));
    toast.success('Cita cancelada');
  };

  const handleReschedule = (id: number) => {
    toast.info('Función de reprogramación disponible próximamente');
  };

  const availableServices = [
    { id: 1, name: 'Consulta General', icon: Home, color: 'blue' },
    { id: 2, name: 'Videoconsulta', icon: Video, color: 'purple' },
    { id: 3, name: 'Enfermería a Domicilio', icon: Home, color: 'green' },
    { id: 4, name: 'Toma de Muestras', icon: Home, color: 'red' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Agenda de Citas</h2>
          <p className="text-slate-600">Gestiona tus servicios de salud a domicilio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0000FF] hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agendar Nueva Cita</DialogTitle>
              <DialogDescription>
                Selecciona el tipo de servicio y programa tu cita
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label>Tipo de servicio</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        className="p-4 border-2 border-slate-200 rounded-lg hover:border-[#0000FF] hover:bg-blue-50 transition-all text-left"
                        onClick={() => setSelectedService(service.name)}
                      >
                        <Icon className="h-6 w-6 text-[#0000FF] mb-2" />
                        <p className="text-sm">{service.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specialty Selection */}
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad</Label>
                <Select>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Medicina General</SelectItem>
                    <SelectItem value="cardio">Cardiología</SelectItem>
                    <SelectItem value="pediatrics">Pediatría</SelectItem>
                    <SelectItem value="nursing">Enfermería</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Horarios disponibles</Label>
                    <div className="space-y-2">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                        <button
                          key={time}
                          className="w-full p-3 border border-slate-200 rounded-lg hover:border-[#0000FF] hover:bg-blue-50 transition-colors text-left"
                          onClick={() => setSelectedTime(time)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{time}</span>
                            <Badge variant="secondary" className="text-xs">Disponible</Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address for home services */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección para servicio a domicilio</Label>
                <Input
                  id="address"
                  placeholder="Calle, número, colonia..."
                  defaultValue="Calle Principal 123, Col. Centro, CDMX"
                />
              </div>

              {/* Additional notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Motivo de la consulta (opcional)</Label>
                <textarea
                  id="notes"
                  className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0000FF]"
                  placeholder="Describe brevemente el motivo de tu consulta..."
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1 bg-[#0000FF] hover:bg-blue-700" onClick={handleBookAppointment}>
                  Confirmar Cita
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {availableServices.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className={`h-12 w-12 bg-${service.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 text-${service.color}-600`} />
                </div>
                <p>{service.name}</p>
                <p className="text-sm text-slate-600 mt-1">Disponible</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Próximas ({appointments.filter(app => app.status === 'pending' || app.status === 'confirmed').length})</TabsTrigger>
          <TabsTrigger value="past">Historial ({appointments.filter(app => app.status === 'completed').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {appointments.filter(app => app.status === 'pending' || app.status === 'confirmed').map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 bg-gradient-to-br from-[#0000FF] to-blue-600 rounded-xl flex flex-col items-center justify-center text-white">
                      <span className="text-2xl">{new Date(appointment.date).getDate()}</span>
                      <span className="text-xs">
                        {new Date(appointment.date).toLocaleDateString('es-MX', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3>{appointment.type}</h3>
                          {appointment.status === 'confirmed' ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmada
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Pendiente
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600">{appointment.doctor}</p>
                        <p className="text-sm text-slate-500">{selectedSpecialty}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        {appointment.isHome ? (
                          <>
                            <Home className="h-4 w-4" />
                            <span>A domicilio</span>
                          </>
                        ) : (
                          <>
                            <Video className="h-4 w-4" />
                            <span>Videoconsulta</span>
                          </>
                        )}
                      </div>
                      {appointment.location && (
                        <div className="flex items-center gap-2 text-slate-600 sm:col-span-1">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{appointment.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleReschedule(appointment.id)}>
                        Reagendar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleCancelAppointment(appointment.id)}>
                        Cancelar
                      </Button>
                      {appointment.isHome && (
                        <Button size="sm" className="bg-[#0000FF] hover:bg-blue-700 ml-auto">
                          <Video className="h-4 w-4 mr-2" />
                          Unirse
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {appointments.filter(app => app.status === 'completed').map((appointment) => (
            <Card key={appointment.id} className="opacity-75">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 bg-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-600">
                      <span className="text-2xl">{new Date(appointment.date).getDate()}</span>
                      <span className="text-xs">
                        {new Date(appointment.date).toLocaleDateString('es-MX', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3>{appointment.type}</h3>
                        <p className="text-slate-600">{appointment.doctor}</p>
                        <p className="text-sm text-slate-500">{selectedSpecialty}</p>
                      </div>
                      <Badge className="bg-slate-100 text-slate-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completada
                      </Badge>
                    </div>

                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}