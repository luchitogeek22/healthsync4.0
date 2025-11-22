import { useState } from 'react';
import { Search, Star, MapPin, Calendar, MessageCircle, Video, Phone, Award, CheckCircle, Heart, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

export function Professionals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const professionals = [
    {
      id: 1,
      name: 'Dr. María González',
      specialty: 'Medicina General',
      rating: 4.9,
      reviews: 156,
      experience: '15 años',
      languages: ['Español', 'Inglés'],
      availability: 'Disponible hoy',
      services: ['Consulta a domicilio', 'Videoconsulta'],
      certifications: ['Certificado por UNAM', 'Especialista en Medicina Familiar'],
      about: 'Especialista en medicina preventiva y atención integral del paciente.',
      nextAvailable: '2025-11-12 10:00 AM',
      price: '$800',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Carlos Ruiz',
      specialty: 'Cardiología',
      rating: 4.8,
      reviews: 203,
      experience: '20 años',
      languages: ['Español'],
      availability: 'Disponible mañana',
      services: ['Consulta a domicilio', 'Videoconsulta', 'Electrocardiograma'],
      certifications: ['Certificado por el Consejo Mexicano de Cardiología'],
      about: 'Experto en prevención y tratamiento de enfermedades cardiovasculares.',
      nextAvailable: '2025-11-13 3:00 PM',
      price: '$1,200',
      verified: true
    },
    {
      id: 3,
      name: 'Enf. Ana Torres',
      specialty: 'Enfermería',
      rating: 5.0,
      reviews: 89,
      experience: '8 años',
      languages: ['Español'],
      availability: 'Disponible hoy',
      services: ['Toma de muestras', 'Curaciones', 'Aplicación de medicamentos'],
      certifications: ['Certificada en Atención Domiciliaria'],
      about: 'Enfermera profesional especializada en cuidados a domicilio.',
      nextAvailable: '2025-11-12 2:00 PM',
      price: '$400',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. Patricia Hernández',
      specialty: 'Nutrición',
      rating: 4.9,
      reviews: 124,
      experience: '12 años',
      languages: ['Español', 'Inglés'],
      availability: 'Disponible hoy',
      services: ['Consulta a domicilio', 'Videoconsulta', 'Planes personalizados'],
      certifications: ['Certificada por el Colegio Mexicano de Nutriólogos'],
      about: 'Nutrióloga especializada en salud cardiovascular y enfermedades crónicas.',
      nextAvailable: '2025-11-12 4:00 PM',
      price: '$600',
      verified: true
    },
    {
      id: 5,
      name: 'Psic. Roberto Méndez',
      specialty: 'Psicología',
      rating: 4.7,
      reviews: 98,
      experience: '10 años',
      languages: ['Español'],
      availability: 'Disponible mañana',
      services: ['Videoconsulta', 'Terapia individual'],
      certifications: ['Certificado en Terapia Cognitivo-Conductual'],
      about: 'Psicólogo clínico especializado en manejo de estrés y ansiedad.',
      nextAvailable: '2025-11-13 11:00 AM',
      price: '$700',
      verified: true
    }
  ];

  const specialties = [
    'Todas las especialidades',
    'Medicina General',
    'Cardiología',
    'Enfermería',
    'Nutrición',
    'Psicología',
    'Pediatría'
  ];

  const supportTeam = {
    phone: '+52 55 1234 5678',
    email: 'soporte@healthsync40.com',
    hours: '24/7'
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast.success('Profesional eliminado de favoritos');
    } else {
      setFavorites([...favorites, id]);
      toast.success('Profesional agregado a favoritos');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h2>Red de Profesionales</h2>
        <p className="text-slate-600">Conecta con especialistas verificados de confianza</p>
      </div>

      {/* Support Banner */}
      <Card className="bg-gradient-to-r from-[#0000FF] to-blue-600 text-white border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3>¿Necesitas ayuda inmediata?</h3>
              <p className="text-blue-100 mt-2">
                Nuestro equipo de soporte está disponible {supportTeam.hours} para asistirte
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="secondary" className="bg-white text-[#0000FF] hover:bg-blue-50">
                  <Phone className="h-4 w-4 mr-2" />
                  {supportTeam.phone}
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat en vivo
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0 h-20 w-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por nombre o especialidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty.toLowerCase()}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Disponibilidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="tomorrow">Mañana</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Professionals List */}
      <div className="space-y-4">
        {professionals.map((professional) => (
          <Card key={professional.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Section */}
                <div className="flex gap-4 flex-1">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-gradient-to-br from-[#0000FF] to-blue-600 text-white text-xl">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="text-xl">{professional.name}</h3>
                      {professional.verified && (
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-slate-600">{professional.specialty}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{professional.rating}</span>
                        <span className="text-slate-500">({professional.reviews} reseñas)</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Award className="h-4 w-4" />
                        <span>{professional.experience} de experiencia</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                      {professional.about}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {professional.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="mt-3 space-y-1">
                      {professional.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="lg:w-64 flex flex-col justify-between gap-4 lg:border-l lg:pl-6">
                  <div>
                    <Badge className="bg-green-100 text-green-800 mb-3">
                      {professional.availability}
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>Próxima cita: {professional.nextAvailable}</span>
                      </div>
                      <div className="text-2xl text-[#0000FF]">{professional.price}</div>
                      <p className="text-xs text-slate-500">Por consulta</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-[#0000FF] hover:bg-blue-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Todos Verificados</CardTitle>
            <CardDescription>Profesionales de confianza</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Todos nuestros profesionales están certificados y verificados. 
              Revisamos cuidadosamente sus credenciales y experiencia.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Garantía de Calidad</CardTitle>
            <CardDescription>Tu satisfacción es importante</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Si no estás satisfecho con tu consulta, te ayudaremos a encontrar 
              otro profesional o te reembolsaremos el 100% de tu pago.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}