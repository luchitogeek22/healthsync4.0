import { useState } from 'react';
import { ArrowRight, Play, Check, Star, Heart, Shield, Zap, Users, Video, Brain, Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/1af4e7848ffa6724c23ac598b3188021718672d3.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'Asistente IA Empático',
      description: 'Chat inteligente que entiende tus síntomas y te guía con calidez humana',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Video,
      title: 'Videoconsultas HD',
      description: 'Conecta con especialistas certificados desde cualquier lugar',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Calendar,
      title: 'Agenda Inteligente',
      description: 'Programa citas y servicios a domicilio en segundos',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Heart,
      title: 'Monitoreo Preventivo',
      description: 'Alertas y recordatorios personalizados para tu salud',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Datos Seguros',
      description: 'Encriptación de nivel médico para tu privacidad',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Zap,
      title: 'Respuesta Rápida',
      description: 'Atención inmediata cuando más lo necesitas',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Paciente',
      image: 'https://images.unsplash.com/photo-1564732005956-20420ebdab60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcGF0aWVudCUyMGNhcmV8ZW58MXx8fHwxNzYyOTYyMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'HealthSync cambió mi vida. El asistente IA es como tener un médico personal disponible 24/7.'
    },
    {
      name: 'Dr. Carlos Ruiz',
      role: 'Cardiólogo',
      image: 'https://images.unsplash.com/photo-1758691462860-b1b9532c7394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzYyOTYyMzk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'Como médico, valoro la calidad de la plataforma. Facilita enormemente mis consultas remotas.'
    },
    {
      name: 'Ana Martínez',
      role: 'Madre de familia',
      image: 'https://images.unsplash.com/photo-1762190102324-116a615896da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzYyODcyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      text: 'Perfecto para mi familia. Todos tenemos acceso a atención médica de calidad desde casa.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Pacientes Activos' },
    { value: '1K+', label: 'Médicos Certificados' },
    { value: '98%', label: 'Satisfacción' },
    { value: '24/7', label: 'Disponibilidad' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 animate-fade-in">
              <img src={logo} alt="HealthSync 4.0" className="h-14 w-14 animate-pulse-soft" />
              <div>
                <h1 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  HealthSync 4.0
                </h1>
                <p className="text-xs text-slate-600">by AsteciabGroup</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-700 hover:text-emerald-600 transition-colors">
                Características
              </a>
              <a href="#testimonials" className="text-slate-700 hover:text-emerald-600 transition-colors">
                Testimonios
              </a>
              <a href="#pricing" className="text-slate-700 hover:text-emerald-600 transition-colors">
                Precios
              </a>
              <Button 
                onClick={onGetStarted}
                className="gradient-health hover-glow text-white"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-green border-t border-emerald-200 animate-slide-up">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-slate-700">Características</a>
              <a href="#testimonials" className="block py-2 text-slate-700">Testimonios</a>
              <a href="#pricing" className="block py-2 text-slate-700">Precios</a>
              <Button 
                onClick={onGetStarted}
                className="w-full gradient-health text-white"
              >
                Comenzar Ahora
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <Badge className="glass-green border-emerald-300 text-emerald-700">
                <Zap className="h-3 w-3 mr-1" />
                Tecnología de Salud del Futuro
              </Badge>
              
              <h1 className="text-4xl md:text-6xl text-slate-900">
                Tu salud, en casa.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  Atención humana con IA.
                </span>
              </h1>

              <p className="text-xl text-slate-600">
                Conectamos tecnología de vanguardia con el toque humano que necesitas. 
                Videoconsultas, diagnóstico inteligente y atención preventiva, todo en un solo lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="gradient-health hover-lift text-white text-lg px-8 py-6"
                >
                  Probar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-200 hover:bg-emerald-50 text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl text-emerald-600">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl blur-3xl opacity-30"></div>
              <Card className="relative overflow-hidden border-2 border-white/50 shadow-2xl hover-lift">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjI5NjIzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="HealthSync Platform"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <ChevronDown className="h-8 w-8 text-emerald-600" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 glass-cyan">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="glass-green border-emerald-300 text-emerald-700 mb-4">
              Características
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-4">
              Todo lo que necesitas para
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                cuidar tu salud
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tecnología de punta diseñada para hacer tu experiencia de salud más humana y accesible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="glass hover-lift border-2 border-white/50 overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 relative">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">Comienza en 3 pasos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Crea tu cuenta', description: 'Registro rápido y seguro en menos de 2 minutos' },
              { step: '2', title: 'Completa tu perfil', description: 'Añade tu información médica de forma privada' },
              { step: '3', title: 'Comienza a usar', description: 'Accede a todas las funciones inmediatamente' }
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-health text-white text-2xl mb-4 animate-pulse-soft">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="glass-cyan border-cyan-300 text-cyan-700 mb-4">
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-4">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass hover-lift border-2 border-white/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"></div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="gradient-health text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl mb-4 text-white">
                ¿Listo para transformar tu salud?
              </h2>
              <p className="text-xl mb-8 text-emerald-50">
                Únete a miles de personas que ya confían en HealthSync 4.0
              </p>
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6 hover-lift"
              >
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm mt-4 text-emerald-100">
                No se requiere tarjeta de crédito • Cancelación en cualquier momento
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-green border-t border-emerald-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="HealthSync" className="h-10 w-10" />
                <span className="text-lg text-emerald-700">HealthSync 4.0</span>
              </div>
              <p className="text-sm text-slate-600">
                Llevando atención médica de calidad a tu hogar con tecnología y humanidad.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-slate-900">Producto</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">Características</a></li>
                <li><a href="#" className="hover:text-emerald-600">Precios</a></li>
                <li><a href="#" className="hover:text-emerald-600">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-slate-900">Empresa</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-emerald-600">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600">Carreras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-slate-900">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-emerald-600">Privacidad</a></li>
                <li><a href="#" className="hover:text-emerald-600">Términos</a></li>
                <li><a href="#" className="hover:text-emerald-600">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2025 HealthSync 4.0 by AsteciabGroup. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
