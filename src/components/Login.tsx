import { useState } from 'react';
import { Mail, Lock, User, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from 'figma:asset/1af4e7848ffa6724c23ac598b3188021718672d3.png';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (role: 'patient' | 'doctor') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    if (!selectedRole) {
      toast.error('Por favor selecciona un rol');
      return;
    }
    toast.success(`¡Bienvenido ${selectedRole === 'doctor' ? 'Dr./Dra.' : ''}!`);
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen gradient-health-soft flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 animate-slide-up">
          <div className="flex items-center gap-3">
            <img src={logo} alt="HealthSync 4.0" className="h-20 w-20 animate-pulse-soft" />
            <div>
              <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                HealthSync 4.0
              </h1>
              <p className="text-slate-600 text-lg">Tu salud, sincronizada en casa</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl mb-4">Atención médica de calidad en la comodidad de tu hogar</h2>
              <p className="text-lg text-slate-600">
                Conecta con profesionales de la salud, gestiona tu historial médico y recibe 
                atención personalizada cuando y donde lo necesites.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564732005956-20420ebdab60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcGF0aWVudCUyMGNhcmV8ZW58MXx8fHwxNzYyOTYyMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Atención médica"
                className="w-full h-[350px] object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 glass rounded-xl hover-lift">
                <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">500+</div>
                <p className="text-sm text-slate-600">Profesionales</p>
              </div>
              <div className="text-center p-4 glass rounded-xl hover-lift">
                <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">10K+</div>
                <p className="text-sm text-slate-600">Pacientes</p>
              </div>
              <div className="text-center p-4 glass rounded-xl hover-lift">
                <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">4.9★</div>
                <p className="text-sm text-slate-600">Calificación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="animate-slide-in-right">
          <Card className="glass border-2 border-white/50 shadow-2xl">
            <CardHeader className="text-center lg:text-left">
              <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
                <img src={logo} alt="HealthSync 4.0" className="h-12 w-12" />
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  HealthSync 4.0
                </CardTitle>
              </div>
              <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
              <CardDescription>Inicia sesión para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label>Selecciona tu perfil</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('patient')}
                      className={`p-6 rounded-xl border-2 transition-all hover-lift ${
                        selectedRole === 'patient'
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-cyan-50 ring-2 ring-emerald-300'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <User className={`h-10 w-10 mx-auto mb-3 ${
                        selectedRole === 'patient' ? 'text-emerald-600' : 'text-slate-400'
                      }`} />
                      <div className={`text-sm ${
                        selectedRole === 'patient' ? 'text-emerald-900' : 'text-slate-600'
                      }`}>
                        Soy Paciente
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('doctor')}
                      className={`p-6 rounded-xl border-2 transition-all hover-lift ${
                        selectedRole === 'doctor'
                          ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 ring-2 ring-cyan-300'
                          : 'border-slate-200 hover:border-cyan-300'
                      }`}
                    >
                      <Stethoscope className={`h-10 w-10 mx-auto mb-3 ${
                        selectedRole === 'doctor' ? 'text-cyan-600' : 'text-slate-400'
                      }`} />
                      <div className={`text-sm ${
                        selectedRole === 'doctor' ? 'text-cyan-900' : 'text-slate-600'
                      }`}>
                        Soy Doctor
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 bg-white/80"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-white/80"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-slate-600">Recordarme</span>
                  </label>
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-health hover-glow text-white text-lg py-6"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="text-center text-sm text-slate-600">
                  ¿No tienes cuenta?{' '}
                  <button type="button" className="text-emerald-600 hover:text-emerald-700 hover:underline">
                    Regístrate gratis
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
